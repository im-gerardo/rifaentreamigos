from PIL import Image, ImageDraw, ImageFont

# Dimensiones estándar de Open Graph
W, H = 1200, 630
og = Image.new('RGB', (W, H), '#0b0f14')
draw = ImageDraw.Draw(og)

# Fondos decorativos y acentos modernos
# Líneas de velocidad o degradado sutil
for i in range(H):
    # sutil gradiente vertical
    r = int(11 + (18 - 11) * (i / H))
    g = int(15 + (24 - 15) * (i / H))
    b = int(20 + (32 - 20) * (i / H))
    draw.line([(0, i), (W, i)], fill=(r, g, b))

# Cargar la imagen del boleto 1 completo o la foto de la moto
# En public/a4_page-1.png tenemos la moto y el arte en 300 DPI
p1 = Image.open('public/a4_page-1.png').convert('RGBA')
# Recortar la moto del primer boleto
# Boleto 1: Y=[112, 112+825], X=[66, 2408]
# En el boleto, la moto está a la derecha: X=[1550, 2400], Y=[112, 112+825]
moto_crop = p1.crop((1500, 112, 2380, 112 + 825))
# Redimensionar la moto para que ocupe la mitad derecha del canvas OG
aspect = moto_crop.width / moto_crop.height
target_h = 580
target_w = int(target_h * aspect)
moto_resized = moto_crop.resize((target_w, target_h), Image.Resampling.LANCZOS)

# Pegar la moto a la derecha
og.paste(moto_resized, (W - target_w + 40, (H - target_h) // 2 + 10))

# Franja diagonal decorativa amarilla
draw.polygon([(650, 0), (710, 0), (590, H), (530, H)], fill='#fac802')

# Fuentes del sistema
font_black = '/System/Library/Fonts/Supplemental/Arial Black.ttf'
font_bold = '/System/Library/Fonts/Supplemental/Arial Bold.ttf'
font_reg = '/System/Library/Fonts/Supplemental/Arial.ttf'

f_badge = ImageFont.truetype(font_black, 18)
f_brand = ImageFont.truetype(font_black, 48)
f_moto = ImageFont.truetype(font_black, 36)
f_detail = ImageFont.truetype(font_bold, 22)
f_price_badge = ImageFont.truetype(font_black, 28)

# 1. Badge superior
draw.rounded_rectangle([60, 45, 330, 82], radius=6, fill='#fac802')
draw.text((75, 52), "GRAN RIFA ENTRE AMIGOS", font=f_badge, fill='#000000')

# 2. Título Principal
draw.text((60, 105), "BAJAJ PULSAR N250", font=f_brand, fill='#ffffff')
draw.text((60, 165), "MODELO 2026", font=f_moto, fill='#fac802')

# 3. Datos clave en tarjetas/puntos
items = [
    "🏍️  Seminueva impecable (+3,000 km)",
    "📜  Factura original y papeles en regla",
    "🎟️  Solo 200 boletos (5 oportunidades c/u)",
    "🏛️  Sorteo con Lotería Nacional: 12 Dic 2026"
]

y_pos = 230
for item in items:
    draw.text((60, y_pos), item, font=f_detail, fill='#e1e7ec')
    y_pos += 42

# 4. Caja de Precio y Participación
draw.rounded_rectangle([60, 420, 500, 570], radius=12, fill='#141c24', outline='#2b3a4a', width=2)

draw.text((85, 438), "VALOR DEL BOLETO", font=ImageFont.truetype(font_bold, 14), fill='#fac802')
draw.text((85, 465), "$250 MXN", font=ImageFont.truetype(font_black, 42), fill='#ffffff')

draw.text((85, 525), "5 números de participación por boleto", font=ImageFont.truetype(font_reg, 15), fill='#8fa1b3')

# Guardar la imagen optimizada
og.save('public/og-image.jpg', quality=90)
print("public/og-image.jpg generada con éxito (1200x630).")
