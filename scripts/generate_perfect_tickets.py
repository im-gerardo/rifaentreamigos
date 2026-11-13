import json
import os
from PIL import Image, ImageDraw, ImageFont

# 1. Cargar el PDF convertido en alta resolución (A4 300 DPI: 2481x3508)
page1 = Image.open('public/a4_page-1.png').convert('RGB')
page2 = Image.open('public/a4_page-2.png').convert('RGB')
W, H = page1.size

# Dimensiones y posición de cada uno de los 4 boletos en la hoja A4
# Rango exacto detectado previamente: X de 66 a 2408 (ancho 2342), Y de 101 a 3411 (alto 3310)
BOX_X1 = 66
BOX_X2 = 2408
T_W = BOX_X2 - BOX_X1 # 2342
T_H = 827.5 # 3310 / 4

# Fuentes del sistema
font_path_bold = '/System/Library/Fonts/Supplemental/Arial Bold.ttf'
font_path_black = '/System/Library/Fonts/Supplemental/Arial Black.ttf'
font_path_narrow_bold = '/System/Library/Fonts/Supplemental/Arial Narrow Bold.ttf'

font_numbers_big = ImageFont.truetype(font_path_black, 72)
font_numbers_stub = ImageFont.truetype(font_path_bold, 34)
font_date = ImageFont.truetype(font_path_black, 38)
font_folio_main = ImageFont.truetype(font_path_black, 48)
font_folio_stub = ImageFont.truetype(font_path_black, 44)

# Función de folio oficial con letras
def get_letter_folio(folio_num):
    series = '1' if folio_num <= 100 else '2'
    offset = max(0, (folio_num - 1) % 100)
    first = offset // 26
    second = offset % 26
    return f"{series}A{chr(65 + first)}{chr(65 + second)}"

# Cargar manifiesto oficial
with open('public/tickets-manifest.json', 'r', encoding='utf8') as f:
    manifest = json.load(f)

# Coordenadas relativas dentro de cada boleto (2342 x 827)
# Casillas de números grandes en el centro (los 5 rectángulos blancos redondeados):
# Casilla 1: x:[850, 975], y:[410, 535]
# Casilla 2: x:[990, 1115], y:[410, 535]
# Casilla 3: x:[1130, 1255], y:[410, 535]
# Casilla 4: x:[1270, 1395], y:[410, 535]
# Casilla 5: x:[1410, 1535], y:[410, 535]
BIG_NUM_BOXES = [
    (855, 420, 985, 540),
    (995, 420, 1125, 540),
    (1135, 420, 1265, 540),
    (1275, 420, 1405, 540),
    (1415, 420, 1545, 540),
]

# Casillas de números en talón (abajo izquierda):
STUB_NUM_BOXES = [
    (38, 705, 125, 775),
    (130, 705, 218, 775),
    (222, 705, 310, 775),
    (314, 705, 402, 775),
    (406, 705, 495, 775),
]

print("Script de renderizado inicializado.")
