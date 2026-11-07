"""Auth/HTTP E2E sobre un proyecto Supabase NUEVO, nunca el stack existente."""
import json
import os
from pathlib import Path
import re
import secrets
import shutil
import socket
import subprocess
import tempfile
import urllib.request
import uuid

ROOT = Path(__file__).resolve().parent.parent
RUN = uuid.uuid4().hex
PROJECT = "rifa-auth-test-" + RUN[:12]
NETWORK = PROJECT + "-net"
LABEL = "io.rifa.auth-test"
OUT = ROOT / "artifacts/auth-tests" / RUN
OUT.mkdir(parents=True, mode=0o700)
os.chmod(OUT.parent, 0o700)
temp_parent = Path(os.environ.get("TMPDIR", tempfile.gettempdir())) / "opencode"
WORK = Path(tempfile.mkdtemp(prefix=PROJECT + "-", dir=temp_parent if temp_parent.is_dir() else None))
os.chmod(WORK, 0o700)
SECRET_VALUES = []
ENV = {k: v for k, v in os.environ.items()
       if not k.startswith(("SUPABASE_", "NEXT_PUBLIC_SUPABASE_", "RIFA_AUTH_"))}
REPORT = {"run": RUN, "project": PROJECT, "status": "failed"}
network_created = False
start_attempted = False


def redact(text):
    for value in SECRET_VALUES:
        text = text.replace(value, "[REDACTED]")
    return re.sub(r"eyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+", "[JWT REDACTED]", text)


def private_write(path, data):
    fd = os.open(path, os.O_CREAT | os.O_EXCL | os.O_WRONLY, 0o600)
    with os.fdopen(fd, "w") as handle:
        handle.write(data)


def run(args, *, cwd=ROOT, input=None, check=True, timeout=180, env=ENV):
    result = subprocess.run(args, cwd=cwd, env=env, input=input, text=True,
                            capture_output=True, timeout=timeout)
    if check and result.returncode:
        raise RuntimeError(redact(f"{args[0]} {args[1]} failed: {result.stderr[-4000:]}"))
    return result


def port():
    with socket.socket() as sock:
        sock.bind(("127.0.0.1", 0))
        return sock.getsockname()[1]


try:
    if len(__import__("sys").argv) != 1:
        raise RuntimeError("No external project or target arguments accepted")
    if ENV.get("DOCKER_HOST", "unix://").startswith("unix://") is False:
        raise RuntimeError("Only local Unix Docker is allowed")
    context = json.loads(run(["docker", "context", "inspect"]).stdout)
    if not context[0]["Endpoints"]["docker"]["Host"].startswith("unix://"):
        raise RuntimeError("Only a local Unix Docker context is allowed")
    run(["supabase", "--version"])
    ports = set()
    while len(ports) < 4:
        ports.add(port())
    api_port, db_port, shadow_port, app_port = ports
    (WORK / "supabase/migrations").mkdir(parents=True)
    config = f'''project_id = "{PROJECT}"
[api]
enabled = true
port = {api_port}
schemas = ["public", "graphql_public"]
extra_search_path = ["public", "extensions"]
[db]
port = {db_port}
shadow_port = {shadow_port}
major_version = 17
[db.seed]
enabled = true
sql_paths = ["./seed.sql"]
[studio]
enabled = false
[local_smtp]
enabled = false
[auth]
enabled = true
site_url = "http://127.0.0.1:{app_port}"
enable_signup = false
minimum_password_length = 12
[auth.email]
enable_signup = false
enable_confirmations = false
[realtime]
enabled = false
[storage]
enabled = true
[analytics]
enabled = false
[edge_runtime]
enabled = false
'''
    (WORK / "supabase/config.toml").write_text(config)
    for source in (ROOT / "supabase/migrations").glob("*.sql"):
        shutil.copy2(source, WORK / "supabase/migrations" / source.name)
    shutil.copy2(ROOT / "supabase/seed.sql", WORK / "supabase/seed.sql")
    run(["docker", "network", "create", "--label", LABEL + "=" + RUN,
         "--opt", "com.docker.network.bridge.host_binding_ipv4=127.0.0.1", NETWORK])
    network_created = True
    print("Starting NEW Supabase test project; original stacks are not targets.", flush=True)
    start_attempted = True
    started = run(["supabase", "start", "--workdir", str(WORK), "--network-id", NETWORK,
                   "--exclude", "realtime,imgproxy,mailpit,postgres-meta,studio,edge-runtime,logflare,vector,supavisor"],
                  check=False, timeout=240)
    # CLI imprime claves: guardar solo en fichero privado, NUNCA en la consola.
    private_write(OUT / "private-start.log", started.stdout + started.stderr)
    if started.returncode:
        raise RuntimeError("Supabase test startup failed; inspect private-start.log locally (do not share)")
    status = json.loads(run(["supabase", "status", "--workdir", str(WORK), "--output", "json"]).stdout)
    anon = status["ANON_KEY"]
    service = status["SERVICE_ROLE_KEY"]
    SECRET_VALUES.extend([anon, service])
    api = f"http://127.0.0.1:{api_port}"
    if status["API_URL"].replace("localhost", "127.0.0.1") != api:
        raise RuntimeError("Unexpected test API target")
    containers = run(["docker", "ps", "-aq", "--filter", "network=" + NETWORK]).stdout.split()
    if not containers:
        raise RuntimeError("No test containers on owned network")
    for item in json.loads(run(["docker", "inspect", *containers]).stdout):
        if not item["Name"].endswith("_" + PROJECT):
            raise RuntimeError("Unexpected container attached to test network")
        for bindings in (item["NetworkSettings"]["Ports"] or {}).values():
            for binding in bindings or []:
                if binding["HostIp"] != "127.0.0.1":
                    raise RuntimeError("Supabase test port is not loopback-only")
    password = secrets.token_urlsafe(28)
    SECRET_VALUES.append(password)
    identities = {}
    for user in ["admin", "seller-a", "seller-b", "inactive", "no-profile"]:
        payload = json.dumps({"email": user + "@example.invalid", "password": password,
                              "email_confirm": True}).encode()
        req = urllib.request.Request(api + "/auth/v1/admin/users", data=payload, method="POST",
                                     headers={"Content-Type": "application/json", "apikey": service,
                                              "Authorization": "Bearer " + service})
        with urllib.request.urlopen(req, timeout=20) as response:
            identities[user] = str(uuid.UUID(json.load(response)["id"]))
    db_name = "supabase_db_" + PROJECT
    args = ["docker", "exec", "-i", db_name, "psql", "-X", "-v", "ON_ERROR_STOP=1",
            "-U", "postgres", "-d", "postgres"]
    for user, identity in identities.items():
        args.extend(["-v", user.replace("-", "_") + "=" + identity])
    run(args, input=(ROOT / "tests/auth-e2e/fixtures.sql").read_text())
    test_env = {**ENV, "CI": "1", "RIFA_AUTH_DISPOSABLE_RUN_ID": RUN,
                "RIFA_AUTH_TEST_URL": api, "RIFA_AUTH_TEST_ANON_KEY": anon,
                "RIFA_AUTH_TEST_SERVICE_KEY": service, "RIFA_AUTH_TEST_PASSWORD": password,
                "RIFA_AUTH_APP_PORT": str(app_port)}
    print("Auth users and fixtures created only in the new project; running real HTTP/browser tests.", flush=True)
    result = run(["pnpm", "exec", "playwright", "test", "--config", "playwright.auth.config.ts"],
                 check=False, env=test_env, timeout=240)
    print(redact(result.stdout + result.stderr), flush=True)
    if result.returncode:
        raise RuntimeError("Auth browser/HTTP suite failed")
    REPORT["status"] = "passed"
    REPORT["testSuite"] = "real Supabase Auth/PostgREST + browser session"
except Exception as error:
    REPORT["error"] = redact(str(error))
    print(REPORT["error"], flush=True)
finally:
    cleanup_errors = []
    if start_attempted:
        try:
            # NO --all. Solo el ID aleatorio generado por esta ejecución.
            run(["supabase", "stop", "--workdir", str(WORK), "--project-id", PROJECT, "--no-backup"], timeout=120)
        except Exception as error:
            cleanup_errors.append(redact(str(error)))
    if network_created:
        try:
            actual = run(["docker", "network", "inspect", NETWORK]).stdout
            if json.loads(actual)[0]["Labels"].get(LABEL) != RUN:
                raise RuntimeError("Refusing to remove an unowned test network")
            run(["docker", "network", "rm", NETWORK])
        except Exception as error:
            cleanup_errors.append(redact(str(error)))
    REPORT["cleanedUp"] = not cleanup_errors
    REPORT["privateWorkdir"] = str(WORK)
    if cleanup_errors:
        REPORT["cleanupErrors"] = cleanup_errors
        REPORT["status"] = "failed"
    private_write(OUT / "result.json", json.dumps(REPORT, indent=2))
    print("Auth test result: " + REPORT["status"] + "; owned stack/network removed: " + str(REPORT["cleanedUp"]), flush=True)
__import__("sys").exit(0 if REPORT["status"] == "passed" else 1)
