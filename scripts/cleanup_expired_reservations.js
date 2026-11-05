const { createClient } = require('@supabase/supabase-js');

async function cleanup() {
    const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
        console.error('❌ Missing Supabase environment variables.');
        process.exit(1);
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { data, error } = await supabase.rpc('expire_reservations');

    if (error) {
        console.error('❌ Error al procesar reservas expiradas.');
        process.exit(1);
    }

    const result = data?.[0] ?? { expired_orders: 0, held_orders: 0 };
    console.log(`✅ Reservas liberadas: ${result.expired_orders}. En retención para conciliación: ${result.held_orders}.`);
}

cleanup().catch(err => {
    console.error('💥 Fatal error during cleanup:', err);
    process.exit(1);
});
