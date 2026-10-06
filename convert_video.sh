#!/bin/bash
set -e

SRC="/home/n1khy/Videos/VIDEOS/gemini_generated_video_7a1c66c5.mp4"
PUB="/home/n1khy/.gemini/antigravity/scratch/lunar-paradox/public"

echo "1. Creating fast-start web MP4..."
# -movflags +faststart puts the moov atom at the front of the file for instant streaming
ffmpeg -y -i "$SRC" -an -c:v libx264 -profile:v high -level 4.0 -pix_fmt yuv420p -crf 22 -preset medium -movflags +faststart "$PUB/lunar_bg.mp4"

echo "2. Creating modern high-efficiency WebM (VP9)..."
ffmpeg -y -i "$SRC" -an -c:v libvpx-vp9 -crf 28 -b:v 0 -deadline good "$PUB/lunar_bg.webm"

echo "3. Creating optimized 2-pass palette GIF..."
# We scale slightly to 960px width to keep GIF size light while preserving crispness
ffmpeg -y -i "$SRC" -vf "fps=18,scale=960:-1:flags=lanczos,palettegen=stats_mode=diff" "$PUB/palette.png"
ffmpeg -y -i "$SRC" -i "$PUB/palette.png" -filter_complex "fps=18,scale=960:-1:flags=lanczos[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=3" "$PUB/lunar_bg.gif"

echo "File sizes:"
ls -lh "$PUB/lunar_bg.mp4" "$PUB/lunar_bg.webm" "$PUB/lunar_bg.gif"
