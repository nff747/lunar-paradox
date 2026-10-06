import subprocess
import math

# We read temp.ppm which is the raw 1376x768 image
with open('/home/n1khy/.gemini/antigravity/scratch/lunar-paradox/public/temp.ppm', 'rb') as f:
    header = b""
    while True:
        line = f.readline()
        header += line
        tokens = [t for t in header.split() if not t.startswith(b'#')]
        if len(tokens) >= 4:
            break
    width = int(tokens[1])
    height = int(tokens[2])
    raw_data = bytearray(f.read())

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

# Let's inspect the Moon center and radius:
# Moon center is approx (688, 320), radius ~160, with glow extending to radius ~220
# We want to preserve the Moon and galaxy in the center (x: 430..950, y: 100..550)
# Outside this, on the far left (x < 450) and far right (x > 930):
# Replace cards with natural starry cosmic gradient.

# Pseudo random stars
import random
random.seed(42)

for y in range(height):
    for x in range(width):
        dist_to_moon = math.sqrt((x - 688)**2 + (y - 320)**2)
        
        # 1. Clean Top Header & Nav (y < 125, away from moon)
        if y < 125:
            # Check if this pixel is inside the moon halo
            if dist_to_moon > 240:
                r, g, b = get_pixel(x, y)
                lum = (r * 299 + g * 587 + b * 114) / 1000
                if lum > 45: # remove text
                    # dark deep space
                    set_pixel(x, y, 4 + random.randint(0, 4), 2 + random.randint(0, 3), 12 + random.randint(0, 6))

        # 2. Clean Left Side Cards (x: 40..460, y: 300..630)
        if 40 <= x <= 460 and 300 <= y <= 630:
            # Interpolate deep space and nebula
            # Distance from center moon
            factor = min(1.0, max(0.0, (x - 40) / 420.0))
            # Base dark cosmic space
            base_r = 4 + int(factor * 18)
            base_g = 2 + int(factor * 12)
            base_b = 10 + int(factor * 35)
            
            # Chance of star
            if random.random() < 0.003:
                s = random.randint(180, 245)
                set_pixel(x, y, s, s, s)
            else:
                set_pixel(x, y, base_r, base_g, base_b)

        # 3. Clean Right Side Cards (x: 910..1335, y: 300..630)
        if 910 <= x <= 1335 and 300 <= y <= 630:
            factor = min(1.0, max(0.0, (1335 - x) / 425.0))
            base_r = 4 + int(factor * 16)
            base_g = 2 + int(factor * 10)
            base_b = 10 + int(factor * 30)

            # Draw subtle perspective grid lines at the bottom right
            is_grid = False
            if y > 530 and (x % 38 == 0 or (y + int(x*0.2)) % 25 == 0):
                is_grid = True
            
            if is_grid:
                set_pixel(x, y, base_r + 25, base_g + 20, base_b + 45)
            elif random.random() < 0.003:
                s = random.randint(180, 245)
                set_pixel(x, y, s, s, s)
            else:
                set_pixel(x, y, base_r, base_g, base_b)

        # 4. Clean Bottom Center (x: 470..910, y: 440..660) where "DIMENSIONAL CREATION" and button were
        if 470 <= x <= 910 and 440 <= y <= 660:
            if dist_to_moon > 165: # outside moon disc
                factor = max(0.0, 1.0 - (dist_to_moon - 165) / 140.0)
                # Soft purple moon halo
                halo_r = int(14 + factor * 75)
                halo_g = int(10 + factor * 55)
                halo_b = int(28 + factor * 140)
                set_pixel(x, y, halo_r, halo_g, halo_b)

        # 5. Clean Footer (y > 690)
        if y > 690:
            r, g, b = get_pixel(x, y)
            lum = (r * 299 + g * 587 + b * 114) / 1000
            if lum > 40:
                set_pixel(x, y, 4, 2, 10)

with open('/home/n1khy/.gemini/antigravity/scratch/lunar-paradox/public/pure_plate.ppm', 'wb') as f:
    f.write(f"P6\n{width} {height}\n255\n".encode('ascii'))
    f.write(raw_data)

print("pure_plate.ppm written")
