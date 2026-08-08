"""
Genera los assets profesionales para la app usuarioApi:
  - icon.png            (1024x1024)  Icono principal
  - adaptive-icon.png   (1024x1024)  Icono adaptativo Android (foreground)
  - splash-icon.png     (1024x1024)  Logo para Splash Screen
  - favicon.png         (48x48)      Favicon web
Diseño: fondo degradado azul oscuro, círculo blanco con un usuario y barra/etiqueta.
"""
import math
import os
from PIL import Image, ImageDraw, ImageFont

BASE = os.path.join(os.path.dirname(__file__), "..", "assets")
os.makedirs(BASE, exist_ok=True)

SIZE = 1024

# Paleta
PRIMARY = (30, 64, 130, 255)      # azul oscuro
PRIMARY_2 = (42, 110, 200, 255)   # azul más claro
ACCENT = (242, 200, 60, 255)      # dorado
WHITE = (255, 255, 255, 255)


def load_font(size):
    candidates = [
        "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/dejavu/DejaVuSans-Bold.ttf",
    ]
    for c in candidates:
        if os.path.exists(c):
            try:
                return ImageFont.truetype(c, size)
            except Exception:
                continue
    return ImageFont.load_default()


def vertical_gradient(size, top, bottom):
    img = Image.new("RGB", (size, size), top)
    d = ImageDraw.Draw(img)
    for y in range(size):
        t = y / (size - 1)
        r = int(top[0] + (bottom[0] - top[0]) * t)
        g = int(top[1] + (bottom[1] - top[1]) * t)
        b = int(top[2] + (bottom[2] - top[2]) * t)
        d.line([(0, y), (size, y)], fill=(r, g, b))
    return img


def draw_user_icon(draw, cx, cy, radius, color, outline=None):
    """Dibuja un pictograma de 'usuario' (cabeza + hombros) dentro del círculo."""
    # cabeza
    head_r = radius * 0.28
    head_cy = cy - radius * 0.18
    draw.ellipse(
        [cx - head_r, head_cy - head_r, cx + head_r, head_cy + head_r],
        fill=color,
        outline=outline,
    )
    # hombros (arco)
    shoulder_r = radius * 0.62
    bbox = [
        cx - shoulder_r, cy - radius * 0.05,
        cx + shoulder_r, cy + radius * 1.05,
    ]
    draw.pieslice(bbox, 180, 360, fill=color)


def make_icon():
    img = vertical_gradient(SIZE, PRIMARY, PRIMARY_2)
    d = ImageDraw.Draw(img)

    cx = cy = SIZE // 2
    # círculo blanco
    ring_r = SIZE * 0.40
    d.ellipse(
        [cx - ring_r, cy - ring_r, cx + ring_r, cy + ring_r],
        fill=WHITE,
    )
    # anillo dorado
    d.ellipse(
        [cx - ring_r, cy - ring_r, cx + ring_r, cy + ring_r],
        outline=ACCENT,
        width=16,
    )
    # usuario en azul
    draw_user_icon(d, cx, cy, ring_r * 0.92, PRIMARY)
    return img


def make_adaptive():
    # Foreground con área segura (círculo central más pequeño)
    img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    cx = cy = SIZE // 2
    ring_r = SIZE * 0.30  # dentro del área segura
    d.ellipse(
        [cx - ring_r, cy - ring_r, cx + ring_r, cy + ring_r],
        fill=WHITE,
    )
    d.ellipse(
        [cx - ring_r, cy - ring_r, cx + ring_r, cy + ring_r],
        outline=ACCENT,
        width=12,
    )
    draw_user_icon(d, cx, cy, ring_r * 0.90, PRIMARY)
    return img


def make_splash():
    # Logo limpio para el splash (círculo blanco sobre fondo transparente)
    img = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    cx = cy = SIZE // 2
    ring_r = SIZE * 0.45
    d.ellipse(
        [cx - ring_r, cy - ring_r, cx + ring_r, cy + ring_r],
        fill=WHITE,
    )
    d.ellipse(
        [cx - ring_r, cy - ring_r, cx + ring_r, cy + ring_r],
        outline=ACCENT,
        width=16,
    )
    draw_user_icon(d, cx, cy, ring_r * 0.92, PRIMARY)
    return img


def make_favicon():
    img = make_icon().resize((48, 48), Image.LANCZOS)
    return img.convert("RGBA")


icon = make_icon().convert("RGB")
icon.save(os.path.join(BASE, "icon.png"))
print("icon.png generado")

adaptive = make_adaptive()
adaptive.save(os.path.join(BASE, "adaptive-icon.png"))
print("adaptive-icon.png generado")

splash = make_splash()
splash.save(os.path.join(BASE, "splash-icon.png"))
print("splash-icon.png generado")

favicon = make_favicon()
favicon.save(os.path.join(BASE, "favicon.png"))
print("favicon.png generado")
