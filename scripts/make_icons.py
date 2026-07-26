"""Generate IterSelf app icons (icon.png 512px and multi-size icon.ico)."""
from PIL import Image, ImageDraw
import pathlib

OUT_DIR = pathlib.Path(__file__).resolve().parent.parent / "build"
OUT_DIR.mkdir(parents=True, exist_ok=True)


def draw_icon(size: int) -> Image.Image:
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    m = size // 16
    # rounded square background, deep green
    d.rounded_rectangle([m, m, size - m, size - m], radius=size // 5, fill=(31, 61, 53, 255))
    # ascending bars = iteration progress, cream color
    cream = (254, 247, 226, 255)
    bar_w = size // 8
    base_y = size - size // 4
    heights = [size // 5, size // 3, size // 2]
    start_x = size // 5
    gap = size // 24
    for i, h in enumerate(heights):
        x0 = start_x + i * (bar_w + gap * 2)
        d.rounded_rectangle([x0, base_y - h, x0 + bar_w, base_y], radius=max(2, bar_w // 3), fill=cream)
    # loop dot top-right suggesting a cycle
    r = size // 12
    cx, cy = size - size // 4, size // 4 + r // 2
    d.ellipse([cx - r, cy - r, cx + r, cy + r], outline=cream, width=max(2, size // 32))
    d.ellipse(
        [cx + r * 0.2 - r / 3, cy - r - r / 3, cx + r * 0.2 + r / 3, cy - r + r / 3],
        fill=cream,
    )
    return img


def main() -> None:
    sizes = [16, 24, 32, 48, 64, 128, 256]
    largest = draw_icon(256)
    draw_icon(512).save(OUT_DIR / "icon.png")
    largest.save(OUT_DIR / "icon.ico", format="ICO", sizes=[(s, s) for s in sizes])
    print(f"icons written to {OUT_DIR}")


if __name__ == "__main__":
    main()
