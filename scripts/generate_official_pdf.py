import json
import os
import sys
from PIL import Image, ImageDraw, ImageFont

print("Iniciando generación del PDF oficial para los 200 boletos...")

# 1. Cargar manifiesto oficial
with open('public/tickets-manifest.json', 'r', encoding='utf-8') as f:
    manifest = json.load(f)
tickets = manifest['tickets']
assert len(tickets) == 200, f"Se esperaban 200 boletos, encontrados {len(tickets)}"

# Función para obtener el folio alfanumérico oficial
def get_letter_folio(num: int) -> str:
    series = '1' if num <= 100 else '2'
    offset = (num - 1) % 100
    first = offset // 26
    second = offset % 26
    return f"{series}A{chr(65 + first)}{chr(65 + second)}"

# Tipografías oficiales
font_black = '/System/Library/Fonts/Supplemental/Arial Black.ttf'
font_bold = '/System/Library/Fonts/Supplemental/Arial Bold.ttf'
font_reg = '/System/Library/Fonts/Supplemental/Arial.ttf'

f_date = ImageFont.truetype(font_black, 30)
f_folio_main = ImageFont.truetype(font_black, 36)
f_folio_stub = ImageFont.truetype(font_black, 28)
f_lbl = ImageFont.truetype(font_black, 23)
f_num_body = ImageFont.truetype(font_black, 52)
f_num_stub = ImageFont.truetype(font_black, 32)
f_rules_b = ImageFont.truetype(font_bold, 24)
f_rules_r = ImageFont.truetype(font_reg, 24)

# Dimensiones base A4 a 300 DPI
TICKET_HEIGHT = 827.5
TICKET_START_Y = 112
TICKET_START_X = 66

body_boxes_rel = [
    (996, 420, 1118, 536),
    (1126, 420, 1248, 536),
    (1256, 420, 1378, 536),
    (1386, 420, 1508, 536),
    (1516, 420, 1638, 536),
]

stub_boxes_rel = [
    (71, 715, 147, 787),
    (170, 715, 246, 787),
    (269, 715, 345, 787),
    (369, 715, 445, 787),
    (467, 715, 543, 787),
]

# Reglas oficiales completas y actualizadas para el reverso
rules = [
    ("Premio: ", "Motocicleta Bajaj Pulsar N250, modelo 2026, color amarillo, seminueva con poco más de 3,000 km."),
    ("Participación: ", "Cada boleto cuenta con 5 combinaciones numéricas de 3 dígitos (del 000 al 999)."),
    ("Sorteo: ", "Se utilizará el resultado del sorteo de la Lotería Nacional del 12 de diciembre de 2026."),
    ("Ganador: ", "Será el poseedor del boleto que coincida con cualquiera de sus 5 números con las últimas 3 cifras del 1er. premio del sorteo."),
    ("Pago: ", "El boleto debe estar liquidado a más tardar el 11 de diciembre de 2026 (24 horas antes del sorteo)."),
    ("Venta total: ", "La rifa se realizará únicamente si se venden los 200 boletos. En caso contrario, se aplazará hasta completar la venta a la siguiente fecha oficial de la Lotería Nacional."),
    ("Entrega: ", "En Querétaro / León, Gto., en lugar y fecha a acordar. Se entrega factura con endoso."),
    ("Gastos: ", "El cambio de propietario corre por cuenta del ganador."),
    ("Contacto: ", "Para informes y confirmación de pago: WhatsApp oficial 442 194 1930.")
]

# Preparar plantilla estática del Reverso (es idéntica para todas las hojas de reverso)
print("Construyendo plantilla maestra de reverso...")
p2_master = Image.open('public/a4_page-2.png').convert('RGB')
draw_back = ImageDraw.Draw(p2_master)

for i in range(4):
    y_off = int(TICKET_START_Y + i * TICKET_HEIGHT)
    x_off = TICKET_START_X
    
    # Cubrir bases anteriores con blanco limpio
    draw_back.rectangle([x_off + 880, y_off + 115, x_off + 2220, y_off + 720], fill='#ffffff')
    
    y = y_off + 125
    bullet_r = 7
    bullet_color = '#fac802'
    
    for title, desc in rules:
        draw_back.ellipse([x_off + 885, y + 8, x_off + 885 + bullet_r * 2, y + 8 + bullet_r * 2], fill=bullet_color)
        bbox_t = f_rules_b.getbbox(title)
        w_t = bbox_t[2] - bbox_t[0]
        draw_back.text((x_off + 915, y), title, font=f_rules_b, fill='#000000')
        
        words = desc.split(' ')
        line_words = []
        line_x = x_off + 915 + w_t
        is_first_line = True
        
        for word in words:
            test_words = line_words + [word]
            test_str = " ".join(test_words)
            bbox = f_rules_r.getbbox(test_str)
            w = bbox[2] - bbox[0]
            max_w = (x_off + 2220 - line_x) if is_first_line else (2220 - 915)
            
            if w > max_w:
                draw_back.text((line_x if is_first_line else x_off + 915, y), " ".join(line_words), font=f_rules_r, fill='#1a1a1a')
                y += 34
                line_words = [word]
                is_first_line = False
                line_x = x_off + 915
            else:
                line_words = test_words
                
        if line_words:
            draw_back.text((line_x if is_first_line else x_off + 915, y), " ".join(line_words), font=f_rules_r, fill='#1a1a1a')
            y += 42
        else:
            y += 42

# Cargar plantilla base de frente
p1_base = Image.open('public/a4_page-1.png').convert('RGB')

all_pages = []
total_sheets = 50 # 200 boletos / 4 boletos por hoja = 50 hojas (100 páginas frente/reverso)

print("Generando 50 hojas (100 páginas: Frente y Reverso)...")
for sheet in range(total_sheets):
    # Generar Frente
    p1 = p1_base.copy()
    draw_front = ImageDraw.Draw(p1)
    
    for slot in range(4):
        ticket_idx = sheet * 4 + slot
        t = tickets[ticket_idx]
        folio_num = int(t['folio'])
        code = get_letter_folio(folio_num)
        folio_full = f"{code} ({t['folio']})"
        nums = t['numbers']
        
        y_off = int(TICKET_START_Y + slot * TICKET_HEIGHT)
        x_off = TICKET_START_X
        
        # 1. FECHA
        draw_front.rectangle([x_off + 765, y_off + 680, x_off + 1310, y_off + 725], fill='#ffffff')
        draw_front.text((x_off + 770, y_off + 685), "12 de diciembre de 2026", font=f_date, fill='#000000')
        
        # 2. FOLIO CUERPO DERECHO
        draw_front.rectangle([x_off + 1970, y_off + 710, x_off + 2360, y_off + 775], fill='#fac802')
        draw_front.text((x_off + 1980, y_off + 720), f"Folio {folio_full}", font=f_folio_main, fill='#000000')
        
        # 3. FOLIO EN TALÓN
        draw_front.rectangle([x_off + 80, y_off + 335, x_off + 500, y_off + 400], fill='#fac802')
        draw_front.polygon([(x_off + 300, y_off + 335), (x_off + 490, y_off + 335), 
                            (x_off + 465, y_off + 400), (x_off + 275, y_off + 400)], fill='#0b0e12')
        draw_front.text((x_off + 120, y_off + 345), "Folio", font=ImageFont.truetype(font_black, 34), fill='#000000')
        draw_front.text((x_off + 295, y_off + 350), folio_full, font=f_folio_stub, fill='#ffffff')
        
        # 4. RENGLONES DE NOMBRE EN TALÓN (Doble línea ampliada)
        draw_front.rectangle([x_off + 30, y_off + 410, x_off + 540, y_off + 680], fill='#ffffff')
        draw_front.text((x_off + 35, y_off + 415), "Nombre(s) y Apellidos:", font=f_lbl, fill='#000000')
        draw_front.line([(x_off + 35, y_off + 490), (x_off + 530, y_off + 490)], fill='#888888', width=2)
        draw_front.line([(x_off + 35, y_off + 545), (x_off + 530, y_off + 545)], fill='#888888', width=2)
        
        draw_front.text((x_off + 35, y_off + 575), "WhatsApp / Celular:", font=f_lbl, fill='#000000')
        draw_front.line([(x_off + 35, y_off + 650), (x_off + 530, y_off + 650)], fill='#888888', width=2)
        
        # 5. NÚMEROS EN CUERPO (5 casillas con márgenes perfectos)
        for box, num in zip(body_boxes_rel, nums):
            draw_front.rectangle([x_off + box[0] + 5, y_off + box[1] + 5, x_off + box[2] - 5, y_off + box[3] - 5], fill='#ffffff')
            bbox = f_num_body.getbbox(num)
            nw = bbox[2] - bbox[0]
            nh = bbox[3] - bbox[1]
            tx = x_off + box[0] + (box[2] - box[0] - nw) // 2
            ty = y_off + box[1] + (box[3] - box[1] - nh) // 2 - 4
            draw_front.text((tx, ty), num, font=f_num_body, fill='#000000')
            
        # 6. NÚMEROS EN TALÓN (5 casillas talón)
        for box, num in zip(stub_boxes_rel, nums):
            draw_front.rectangle([x_off + box[0] + 4, y_off + box[1] + 4, x_off + box[2] - 4, y_off + box[3] - 4], fill='#ffffff')
            bbox = f_num_stub.getbbox(num)
            nw = bbox[2] - bbox[0]
            nh = bbox[3] - bbox[1]
            tx = x_off + box[0] + (box[2] - box[0] - nw) // 2
            ty = y_off + box[1] + (box[3] - box[1] - nh) // 2 - 3
            draw_front.text((tx, ty), num, font=f_num_stub, fill='#000000')

    # Añadir frente
    all_pages.append(p1)
    # Añadir reverso correspondiente
    all_pages.append(p2_master.copy())
    
    if (sheet + 1) % 10 == 0 or sheet == total_sheets - 1:
        print(f"Hojas procesadas: {sheet + 1}/{total_sheets} (Páginas: {len(all_pages)})")

output_pdf = 'public/boletos-oficiales-200.pdf'
print(f"Guardando PDF final de alta resolución ({len(all_pages)} páginas) en {output_pdf}...")
# Guardar PDF a 300 DPI con compresión optimizada
all_pages[0].save(
    output_pdf,
    save_all=True,
    append_images=all_pages[1:],
    resolution=300.0,
    quality=90
)

file_size_mb = os.path.getsize(output_pdf) / (1024 * 1024)
print(f"PDF generado con éxito. Tamaño: {file_size_mb:.2f} MB")
