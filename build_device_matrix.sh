#!/bin/bash
set -e

SRC="/home/n1khy/Videos/VIDEOS/gemini_generated_video_6b4f3d04.mp4"
PUB="/home/n1khy/.gemini/antigravity/scratch/lunar-paradox/public"

echo "=== 1. DESKTOP 8K EXTREME (Upscaled to 7680x4320 with Lanczos & Unsharp) ==="
# H.264 8K (CRF 14 for massive bitrate)
ffmpeg -y -i "$SRC" -an \
  -vf "scale=7680:4320:flags=lanczos,unsharp=3:3:1.0:3:3:0.0" \
  -c:v libx264 -crf 14 -preset medium -pix_fmt yuv420p -movflags +faststart \
  "$PUB/lunar_bg_desktop_ultra.mp4"

# We'll skip 8K WebM for now as it will take an eternity to encode, but we'll leave it 1080p for fallback.
ffmpeg -y -i "$SRC" -an \
  -vf "scale=1920:1080:flags=lanczos,unsharp=3:3:0.5:3:3:0.0" \
  -c:v libvpx-vp9 -crf 22 -b:v 0 -deadline good \
  "$PUB/lunar_bg_desktop_ultra.webm"

# High-Res Poster
ffmpeg -y -ss 00:00:02 -i "$PUB/lunar_bg_desktop_ultra.mp4" -vframes 1 -q:v 2 "$PUB/poster_desktop.jpg"

echo "=== 2. TABLET / STANDARD (Native 720p Optimized) ==="
ffmpeg -y -i "$SRC" -an \
  -c:v libx264 -crf 20 -preset medium -pix_fmt yuv420p -movflags +faststart \
  "$PUB/lunar_bg_tablet.mp4"

ffmpeg -y -i "$SRC" -an \
  -c:v libvpx-vp9 -crf 25 -b:v 0 -deadline good \
  "$PUB/lunar_bg_tablet.webm"

echo "=== 3. MOBILE PORTRAIT (9:16 Vertical Focused on Moon) ==="
ffmpeg -y -i "$SRC" -an \
  -vf "crop=ih*(9/16):ih:(iw-ih*(9/16))/2:0,scale=540:960:flags=lanczos,unsharp=3:3:0.5:3:3:0.0" \
  -c:v libx264 -crf 22 -preset medium -pix_fmt yuv420p -movflags +faststart \
  "$PUB/lunar_bg_mobile.mp4"

ffmpeg -y -i "$SRC" -an \
  -vf "crop=ih*(9/16):ih:(iw-ih*(9/16))/2:0,scale=540:960:flags=lanczos,unsharp=3:3:0.5:3:3:0.0" \
  -c:v libvpx-vp9 -crf 27 -b:v 0 -deadline good \
  "$PUB/lunar_bg_mobile.webm"

ffmpeg -y -ss 00:00:02 -i "$PUB/lunar_bg_mobile.mp4" -vframes 1 -q:v 2 "$PUB/poster_mobile.jpg"

echo "=== Complete Device Matrix Summary ==="
ls -lh "$PUB"/lunar_bg_*.mp4 "$PUB"/lunar_bg_*.webm "$PUB"/poster_*.jpg
