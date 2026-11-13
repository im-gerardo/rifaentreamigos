from PIL import Image, ImageDraw, ImageFont

# Abrir el boleto 1 original extraído del PDF oficial en 300 DPI
b1 = Image.open('public/b1_perfect.png').convert('RGB')
w, h = b1.size
print(f"Dimensiones de boleto original: {w}x{h}")

# Crear plantilla limpia del Frente borrando exactamente los campos dinámicos
# 1. Borrar Folio en el talón izquierdo: [caja negra inclinada sobre amarillo]
# 2. Borrar Folio en el cuerpo derecho: [caja amarilla inferior derecha]
# 3. Borrar los 5 números en el talón: [5 cajitas blancas abajo a la izquierda]
# 4. Borrar los 5 números en el cuerpo: [5 cajitas blancas grandes en el centro]
# 5. Borrar la fecha del sorteo: "20 de noviembre de 2026"
# 6. Ampliar el espacio de Nombre(s) y Apellidos en el talón

draw = ImageDraw.Draw(b1)

# Encontremos los bordes exactos rellenando con colores idénticos:
# A. Casillas blancas de 5 números en el centro:
# Están sobre fondo blanco con borde redondeado. Si rellenamos el interior con blanco puro (255,255,255):
# En b1 (2342x827), las 5 casillas de números:
