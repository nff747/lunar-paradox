import re

# Read PPM binary format
with open('/home/n1khy/.gemini/antigravity/scratch/lunar-paradox/public/temp.ppm', 'rb') as f:
    header = b""
    while True:
        line = f.readline()
        header += line
        # PPM header ends after 3 non-comment tokens: P6, width height, maxval
        tokens = [t for t in header.split() if not t.startswith(b'#')]
        if len(tokens) >= 4:
            break
    
    width = int(tokens[1])
    height = int(tokens[2])
    maxval = int(tokens[3])
    raw_data = bytearray(f.read())

print(f"Loaded PPM: {width}x{height}, bytes: {len(raw_data)}")

def get_pixel(x, y):
    if 0 <= x < width and 0 <= y < height:
        idx = (y * width + x) * 3
        return raw_data[idx], raw_data[idx+1], raw_data[idx+2]
    return 0, 0, 0

def set_pixel(x, y, r, g, b):
    if 0 <= x < width and 0 <= y < height:
        idx = (y * width + x) * 3
        raw_data[idx] = max(0, min(255, int(r)))
        raw_data[idx+1] = max(0, min(255, int(g)))
        raw_data[idx+2] = max(0, min(255, int(b)))

# 1. Clean Header Area (x: 20..1350, y: 30..115)
# In the header, background is dark cosmic starry space.
# We can sample background from y: 120..150 or smooth interpolation
for y in range(25, 118):
    for x in range(20, 1355):
        r, g, b = get_pixel(x, y)
        # Text pixels are bright (lum > 70)
        lum = (r * 299 + g * 587 + b * 114) / 1000
        if lum > 65:
            # Sample from clean sky below or above
            sample_y = min(height - 1, y + 45)
            sr, sg, sb = get_pixel(x, sample_y)
            # Add small dark noise
            set_pixel(x, y, sr * 0.8, sg * 0.8, sb * 0.85)

# 2. Clean Footer Area (y: 690..760)
for y in range(695, 765):
    for x in range(20, 1355):
        r, g, b = get_pixel(x, y)
        lum = (r * 299 + g * 587 + b * 114) / 1000
        if lum > 55:
            sample_y = max(0, y - 35)
            sr, sg, sb = get_pixel(x, sample_y)
            set_pixel(x, y, sr * 0.7, sg * 0.7, sb * 0.75)

# 3. Clean Text inside Card 1 (Eclipse Protocol) (x: 60..330, y: 340..480)
for y in range(330, 485):
    for x in range(55, 335):
        r, g, b = get_pixel(x, y)
        lum = (r * 299 + g * 587 + b * 114) / 1000
        if lum > 60:
            # Inside card, sample card background from below or neighboring x
            sr, sg, sb = get_pixel(min(330, x + 40), y)
            if (sr*299 + sg*587 + sb*114)/1000 > 60:
                sr, sg, sb = 14, 11, 28
            set_pixel(x, y, sr, sg, sb)

# 4. Clean Text inside Card 2 (1.4M+) (x: 60..260, y: 520..610)
for y in range(520, 615):
    for x in range(55, 260):
        r, g, b = get_pixel(x, y)
        lum = (r * 299 + g * 587 + b * 114) / 1000
        if lum > 60:
            set_pixel(x, y, 14, 11, 28)

# 5. Clean Text inside Card 3 (Dimensional Creation) (x: 480..760, y: 440..525)
for y in range(435, 530):
    for x in range(480, 765):
        r, g, b = get_pixel(x, y)
        lum = (r * 299 + g * 587 + b * 114) / 1000
        if lum > 60:
            set_pixel(x, y, 20, 16, 38)

# 6. Clean Text inside Card 4 (Gen-Z Paradox) (x: 930..1200, y: 340..485)
for y in range(330, 485):
    for x in range(925, 1205):
        r, g, b = get_pixel(x, y)
        lum = (r * 299 + g * 587 + b * 114) / 1000
        if lum > 60:
            sr, sg, sb = get_pixel(max(925, x - 40), y)
            if (sr*299 + sg*587 + sb*114)/1000 > 60:
                sr, sg, sb = 14, 11, 28
            set_pixel(x, y, sr, sg, sb)

# 7. Clean Text inside Card 5 (98%) (x: 980..1160, y: 520..615)
for y in range(520, 615):
    for x in range(980, 1165):
        r, g, b = get_pixel(x, y)
        lum = (r * 299 + g * 587 + b * 114) / 1000
        if lum > 60:
            set_pixel(x, y, 14, 11, 28)

# 8. Clean Button Text "ENTER THE PARADOX" (x: 550..810, y: 600..655)
for y in range(600, 655):
    for x in range(550, 815):
        r, g, b = get_pixel(x, y)
        # Button is metallic gradient. Dark text inside metallic button
        lum = (r * 299 + g * 587 + b * 114) / 1000
        if lum < 140: # text inside bright button
            set_pixel(x, y, 185, 175, 215)

# Save cleaned PPM
with open('/home/n1khy/.gemini/antigravity/scratch/lunar-paradox/public/clean.ppm', 'wb') as f:
    f.write(f"P6\n{width} {height}\n255\n".encode('ascii'))
    f.write(raw_data)

print("Saved clean.ppm")
