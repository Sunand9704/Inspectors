# Video Upload Guide

## Option 1: Store Locally on Server (Recommended for Large Files)

### Steps:
1. **Compress your video** (see compress-video-guide.md)
2. **Upload to server**:
   - Place video in: `Inspectors/backend/uploads/videos/`
   - Or use FTP/SFTP to upload directly to server

3. **Update Services.tsx**:
   ```tsx
   videoUrls={[
     '/uploads/videos/inspectors-hero.mp4'
   ]}
   ```

### Advantages:
- No file size limits
- No cloud storage costs
- Full control
- Fast loading (if server has good bandwidth)

### Disadvantages:
- Uses server storage space
- Server bandwidth usage

---

## Option 2: Use AWS S3 (Best for Production)

### Setup:
1. Create AWS S3 bucket
2. Upload video to S3
3. Make bucket public or use signed URLs
4. Update Services.tsx with S3 URL

### Cost: ~$0.023 per GB storage + bandwidth

---

## Option 3: Use Google Cloud Storage

### Setup:
1. Create GCS bucket
2. Upload video
3. Make public
4. Use public URL

### Cost: Similar to S3

---

## Option 4: Use Vimeo/YouTube (Free Hosting)

### Vimeo:
1. Upload to Vimeo (free account: 500MB/week)
2. Get embed URL
3. Use iframe or video player

### YouTube:
1. Upload as unlisted/private
2. Get video ID
3. Use YouTube embed

### Note: May show YouTube/Vimeo branding

---

## Option 5: Use Cloudflare Stream (CDN + Video)

### Setup:
1. Sign up for Cloudflare
2. Upload video via API
3. Get streaming URL
4. Automatic CDN + compression

### Cost: $1 per 1000 minutes stored + $1 per 1000 minutes delivered

---

## Recommended Approach:

1. **First**: Compress video to 20-50MB
2. **Then**: 
   - If < 50MB: Use Cloudinary (upgrade plan if needed)
   - If > 50MB: Store locally or use S3/GCS
   - For production: Use Cloudflare Stream or AWS MediaConvert


## Option 1: Store Locally on Server (Recommended for Large Files)

### Steps:
1. **Compress your video** (see compress-video-guide.md)
2. **Upload to server**:
   - Place video in: `Inspectors/backend/uploads/videos/`
   - Or use FTP/SFTP to upload directly to server

3. **Update Services.tsx**:
   ```tsx
   videoUrls={[
     '/uploads/videos/inspectors-hero.mp4'
   ]}
   ```

### Advantages:
- No file size limits
- No cloud storage costs
- Full control
- Fast loading (if server has good bandwidth)

### Disadvantages:
- Uses server storage space
- Server bandwidth usage

---

## Option 2: Use AWS S3 (Best for Production)

### Setup:
1. Create AWS S3 bucket
2. Upload video to S3
3. Make bucket public or use signed URLs
4. Update Services.tsx with S3 URL

### Cost: ~$0.023 per GB storage + bandwidth

---

## Option 3: Use Google Cloud Storage

### Setup:
1. Create GCS bucket
2. Upload video
3. Make public
4. Use public URL

### Cost: Similar to S3

---

## Option 4: Use Vimeo/YouTube (Free Hosting)

### Vimeo:
1. Upload to Vimeo (free account: 500MB/week)
2. Get embed URL
3. Use iframe or video player

### YouTube:
1. Upload as unlisted/private
2. Get video ID
3. Use YouTube embed

### Note: May show YouTube/Vimeo branding

---

## Option 5: Use Cloudflare Stream (CDN + Video)

### Setup:
1. Sign up for Cloudflare
2. Upload video via API
3. Get streaming URL
4. Automatic CDN + compression

### Cost: $1 per 1000 minutes stored + $1 per 1000 minutes delivered

---

## Recommended Approach:

1. **First**: Compress video to 20-50MB
2. **Then**: 
   - If < 50MB: Use Cloudinary (upgrade plan if needed)
   - If > 50MB: Store locally or use S3/GCS
   - For production: Use Cloudflare Stream or AWS MediaConvert

