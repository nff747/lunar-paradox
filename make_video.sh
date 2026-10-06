#!/bin/bash
set -e

# Let's create an animated video and GIF of the background using ffmpeg
# We apply a subtle breathing pulse, slow zoom, and ethereal glow oscillation
# Duration: 4 seconds, 30 fps

# 1. Generate MP4 with high quality H.264
ffmpeg -y -loop 1 -i /home/n1khy/.gemini/antigravity/scratch/lunar-paradox/public/lunar-hero-bg.jpg \
  -filter_complex "
    [0:v]scale=1440:810,
    zoompan=z='min(zoom+0.0005,1.04)':d=120:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=1440x810,
    eq=brightness='0.02*sin(2*PI*t/4)':contrast='1.0+0.05*cos(2*PI*t/4)':saturation=1.1[v]
  " \
  -map "[v]" -t 4 -r 30 -pix_fmt yuv420p /home/n1khy/.gemini/antigravity/scratch/lunar-paradox/public/lunar_background.mp4

# 2. Generate high-quality WebM for modern browsers
ffmpeg -y -i /home/n1khy/.gemini/antigravity/scratch/lunar-paradox/public/lunar_background.mp4 \
  -c:v libvpx-vp9 -b:v 1M -crf 30 /home/n1khy/.gemini/antigravity/scratch/lunar-paradox/public/lunar_background.webm

# 3. Generate optimized GIF using palettegen/paletteuse
ffmpeg -y -i /home/n1khy/.gemini/antigravity/scratch/lunar-paradox/public/lunar_background.mp4 \
  -vf "fps=18,scale=960:-1:flags=lanczos,palettegen=stats_mode=diff" \
  /home/n1khy/.gemini/antigravity/scratch/lunar-paradox/public/palette.png

ffmpeg -y -i /home/n1khy/.gemini/antigravity/scratch/lunar-paradox/public/lunar_background.mp4 -i /home/n1khy/.gemini/antigravity/scratch/lunar-paradox/public/palette.png \
  -filter_complex "fps=18,scale=960:-1:flags=lanczos[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=3" \
  /home/n1khy/.gemini/antigravity/scratch/lunar-paradox/public/lunar_background.gif

echo "Generated MP4, WebM, and GIF successfully"
