# Video Setup Instructions

## Quick Solution (Recommended)

### Step 1: Compress Your Video
Your 11:30 video is likely too large. Compress it first:

**Using HandBrake (Easiest):**
1. Download HandBrake: https://handbrake.fr/
2. Open your video
3. Preset: "Fast 1080p30" or "Fast 720p30"
4. Click "Start Encode"
5. Target size: 20-50 MB

**Using Online Tool:**
- Go to https://cloudconvert.com/mp4-compressor
- Upload your video
- Download compressed version

### Step 2: Choose Storage Method

#### Option A: Store on Server (Easiest, No Cost)
1. Create folder: `Inspectors/backend/uploads/videos/`
2. Place your compressed video there (e.g., `hero-video.mp4`)
3. Update `Services.tsx`:
   ```tsx
   videoUrls={[
     '/uploads/videos/hero-video.mp4'
   ]}
   ```

#### Option B: Use Cloud Storage (Better for Production)

**AWS S3:**
1. Create S3 bucket
2. Upload video
3. Make public
4. Use URL: `https://your-bucket.s3.amazonaws.com/video.mp4`

**Google Cloud Storage:**
1. Create bucket
2. Upload video
3. Make public
4. Use URL: `https://storage.googleapis.com/your-bucket/video.mp4`

**Cloudflare R2 (Cheaper Alternative):**
1. Sign up for Cloudflare
2. Create R2 bucket
3. Upload video
4. Use public URL

### Step 3: Update Services.tsx

Replace the video URL in:
```
Inspectors/frontend/src/pages/Services.tsx
```

Line ~104, change:
```tsx
videoUrls={[
  '/uploads/videos/your-video.mp4'  // Replace with your actual path
]}
```

## File Size Recommendations

- **Target**: 20-50 MB for 11:30 video
- **Resolution**: 1920x1080 or 1280x720
- **Bitrate**: 2-4 Mbps
- **Format**: MP4 (H.264)

## Testing

After uploading:
1. Start your backend server
2. Visit: `http://localhost:8000/uploads/videos/your-video.mp4`
3. Video should play in browser
4. Check Services page - video should auto-play

## Troubleshooting

**Video not playing?**
- Check file path is correct
- Ensure backend server is running
- Check browser console for errors
- Verify video format is MP4

**Video too large?**
- Compress more aggressively
- Reduce resolution to 720p
- Lower bitrate

**Need help?**
- Check video-upload-guide.md for detailed options
- See compress-video-guide.md for compression tips


## Quick Solution (Recommended)

### Step 1: Compress Your Video
Your 11:30 video is likely too large. Compress it first:

**Using HandBrake (Easiest):**
1. Download HandBrake: https://handbrake.fr/
2. Open your video
3. Preset: "Fast 1080p30" or "Fast 720p30"
4. Click "Start Encode"
5. Target size: 20-50 MB

**Using Online Tool:**
- Go to https://cloudconvert.com/mp4-compressor
- Upload your video
- Download compressed version

### Step 2: Choose Storage Method

#### Option A: Store on Server (Easiest, No Cost)
1. Create folder: `Inspectors/backend/uploads/videos/`
2. Place your compressed video there (e.g., `hero-video.mp4`)
3. Update `Services.tsx`:
   ```tsx
   videoUrls={[
     '/uploads/videos/hero-video.mp4'
   ]}
   ```

#### Option B: Use Cloud Storage (Better for Production)

**AWS S3:**
1. Create S3 bucket
2. Upload video
3. Make public
4. Use URL: `https://your-bucket.s3.amazonaws.com/video.mp4`

**Google Cloud Storage:**
1. Create bucket
2. Upload video
3. Make public
4. Use URL: `https://storage.googleapis.com/your-bucket/video.mp4`

**Cloudflare R2 (Cheaper Alternative):**
1. Sign up for Cloudflare
2. Create R2 bucket
3. Upload video
4. Use public URL

### Step 3: Update Services.tsx

Replace the video URL in:
```
Inspectors/frontend/src/pages/Services.tsx
```

Line ~104, change:
```tsx
videoUrls={[
  '/uploads/videos/your-video.mp4'  // Replace with your actual path
]}
```

## File Size Recommendations

- **Target**: 20-50 MB for 11:30 video
- **Resolution**: 1920x1080 or 1280x720
- **Bitrate**: 2-4 Mbps
- **Format**: MP4 (H.264)

## Testing

After uploading:
1. Start your backend server
2. Visit: `http://localhost:8000/uploads/videos/your-video.mp4`
3. Video should play in browser
4. Check Services page - video should auto-play

## Troubleshooting

**Video not playing?**
- Check file path is correct
- Ensure backend server is running
- Check browser console for errors
- Verify video format is MP4

**Video too large?**
- Compress more aggressively
- Reduce resolution to 720p
- Lower bitrate

**Need help?**
- Check video-upload-guide.md for detailed options
- See compress-video-guide.md for compression tips

