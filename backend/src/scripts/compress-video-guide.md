# Video Compression Guide

## Recommended Tools:

### 1. HandBrake (Free, Easy)
- Download: https://handbrake.fr/
- Settings for web:
  - Format: MP4
  - Video Codec: H.264
  - Quality: RF 23-28 (lower = better quality, larger file)
  - Framerate: 30 fps (or match source)
  - Resolution: 1920x1080 or 1280x720
  - Audio: AAC, 128 kbps

### 2. FFmpeg (Command Line)
```bash
# Install FFmpeg first
# Windows: choco install ffmpeg
# Mac: brew install ffmpeg

# Compress video
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k output.mp4

# For smaller file (lower quality)
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow -vf scale=1280:720 -c:a aac -b:a 96k output.mp4
```

### 3. Online Tools
- CloudConvert: https://cloudconvert.com/
- FreeConvert: https://www.freeconvert.com/
- Clideo: https://clideo.com/compress-video

## Target Sizes:
- 11:30 video should be:
  - High Quality: 50-100 MB
  - Medium Quality: 20-50 MB
  - Low Quality: 10-20 MB


## Recommended Tools:

### 1. HandBrake (Free, Easy)
- Download: https://handbrake.fr/
- Settings for web:
  - Format: MP4
  - Video Codec: H.264
  - Quality: RF 23-28 (lower = better quality, larger file)
  - Framerate: 30 fps (or match source)
  - Resolution: 1920x1080 or 1280x720
  - Audio: AAC, 128 kbps

### 2. FFmpeg (Command Line)
```bash
# Install FFmpeg first
# Windows: choco install ffmpeg
# Mac: brew install ffmpeg

# Compress video
ffmpeg -i input.mp4 -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k output.mp4

# For smaller file (lower quality)
ffmpeg -i input.mp4 -c:v libx264 -crf 28 -preset slow -vf scale=1280:720 -c:a aac -b:a 96k output.mp4
```

### 3. Online Tools
- CloudConvert: https://cloudconvert.com/
- FreeConvert: https://www.freeconvert.com/
- Clideo: https://clideo.com/compress-video

## Target Sizes:
- 11:30 video should be:
  - High Quality: 50-100 MB
  - Medium Quality: 20-50 MB
  - Low Quality: 10-20 MB

