import json
import csv

# 1. Cargar manifiesto oficial
with open('public/tickets-manifest.json', 'r', encoding='utf-8') as f:
    manifest = json.load(f)

def get_letter_folio(num: int) -> str:
    series = '1' if num <= 100 else '2'
    offset = (num - 1) % 100
    first = offset // 26
    second = offset % 26
    return f"{series}A{chr(65 + first)}{chr(65 + second)}"

# Invertir el mapeo: número -> boleto
inverted_data = []

# Mapear cada uno de los 1,000 números
num_to_ticket = {}
for t in manifest['tickets']:
    num = int(t['folio'])
    code = get_letter_folio(num)
    ticket_info = {
        'folio': t['folio'],
        'numeroBoleto': num,
        'codigoAlfanumerico': code,
        'folioCompleto': f"{code} ({t['folio']})",
        'todasCombinaciones': t['numbers']
    }
    for n in t['numbers']:
        num_to_ticket[n] = ticket_info

# Ordenar de 000 a 999
for i in range(1000):
    num_str = f"{i:03d}"
    t_info = num_to_ticket[num_str]
    inverted_data.append({
        'numeroParticipante': num_str,
        'numeroBoleto': t_info['numeroBoleto'],
        'folio': t_info['folio'],
        'codigoAlfanumerico': t_info['codigoAlfanumerico'],
        'folioCompleto': t_info['folioCompleto'],
        'combinacionesBoleto': t_info['todasCombinaciones']
    })

# Guardar JSON invertido
with open('public/relacion_numeros_a_boletos.json', 'w', encoding='utf-8') as f:
    json.dump({
        'totalNumeros': len(inverted_data),
        'universo': '000 al 999',
        'sorteo': '12 de diciembre de 2026',
        'datos': inverted_data
    }, f, ensure_ascii=False, indent=2)

# Guardar CSV invertido
with open('public/relacion_numeros_a_boletos.csv', 'w', newline='', encoding='utf-8-sig') as f:
    writer = csv.writer(f)
    writer.writerow([
        'Número Participante',
        'Folio Alfanumérico',
        'No. Boleto Físico',
        'Folio Completo',
        'Todas las Combinaciones del Boleto'
    ])
    for row in inverted_data:
        writer.writerow([
            row['numeroParticipante'],
            row['codigoAlfanumerico'],
            row['folio'],
            row['folioCompleto'],
            ", ".join(row['combinacionesBoleto'])
        ])

print("Archivos invertidos generados con éxito: 1,000 números auditados y mapeados.")
