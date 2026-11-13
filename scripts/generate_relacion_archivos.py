import json
import csv

# Cargar manifiesto oficial
with open('public/tickets-manifest.json', 'r', encoding='utf-8') as f:
    manifest = json.load(f)

tickets = manifest['tickets']

def get_letter_folio(num: int) -> str:
    series = '1' if num <= 100 else '2'
    offset = (num - 1) % 100
    first = offset // 26
    second = offset % 26
    return f"{series}A{chr(65 + first)}{chr(65 + second)}"

# 1. Generar CSV de relación
csv_path = 'public/relacion_folios_boletos.csv'
with open(csv_path, 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.writer(f)
    # Encabezados
    writer.writerow([
        'No. Boleto',
        'Folio Alfanumérico',
        'Folio Completo',
        'Número 1',
        'Número 2',
        'Número 3',
        'Número 4',
        'Número 5',
        'Combinaciones (Lista)'
    ])
    
    for t in tickets:
        num = int(t['folio'])
        code = get_letter_folio(num)
        folio_full = f"{code} ({t['folio']})"
        nums = t['numbers']
        writer.writerow([
            t['folio'],
            code,
            folio_full,
            nums[0],
            nums[1],
            nums[2],
            nums[3],
            nums[4],
            ", ".join(nums)
        ])

# 2. Generar JSON actualizado y enriquecido con folios alfanuméricos
json_path = 'public/relacion_folios_boletos.json'
relacion_data = {
    "rifa": "Rifa Entre Amigos - Bajaj Pulsar N250 Modelo 2026",
    "fechaSorteo": "12 de diciembre de 2026",
    "fechaLimitePago": "11 de diciembre de 2026 20:00 hrs",
    "loteria": "Lotería Nacional",
    "totalBoletos": len(tickets),
    "numerosPorBoleto": 5,
    "universoNumeros": "000 al 999 (1,000 combinaciones)",
    "boletos": []
}

for t in tickets:
    num = int(t['folio'])
    code = get_letter_folio(num)
    relacion_data["boletos"].append({
        "numero": num,
        "folio": t['folio'],
        "codigo": code,
        "folioCompleto": f"{code} ({t['folio']})",
        "numeros": t['numbers']
    })

with open(json_path, 'w', encoding='utf-8') as f:
    json.dump(relacion_data, f, ensure_ascii=False, indent=2)

print(f"Archivos generados exitosamente:\n- {csv_path}\n- {json_path}")
