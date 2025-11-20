# Video URL Setup Guide

## Where to Place Your Cloud Video URL

### Option 1: Direct Update in Code (Quickest)

**File:** `Inspectors/frontend/src/pages/Services.tsx`

**Line:** ~104-107

**Current Code:**
```tsx
videoUrls={[
  'YOUR_CLOUD_VIDEO_URL_HERE' // Replace with your actual cloud URL
]}
```

**Replace with your cloud URL:**
```tsx
videoUrls={[
  'https://your-cloud-storage.com/path/to/video.mp4'
]}
```

### Examples:

**AWS S3:**
```tsx
videoUrls={[
  'https://your-bucket.s3.amazonaws.com/inspectors-hero.mp4'
]}
```

**Google Cloud Storage:**
```tsx
videoUrls={[
  'https://storage.googleapis.com/your-bucket/inspectors-hero.mp4'
]}
```

**Cloudflare R2:**
```tsx
videoUrls={[
  'https://your-account.r2.cloudflarestorage.com/bucket/video.mp4'
]}
```

**Any Cloud Storage:**
```tsx
videoUrls={[
  'https://your-cdn.com/videos/inspectors-hero.mp4'
]}
```

---

## Option 2: Store in Database (Better for Management)

If you want to manage the video URL from the admin panel or database:

### Step 1: Add videoUrl to Page Model
The video URL can be stored in the Page model for the 'services' page.

### Step 2: Update Services.tsx to read from database
```tsx
const [videoUrl, setVideoUrl] = useState<string>('');

useEffect(() => {
  // Fetch video URL from page data
  getPageWithSections('services')
    .then(page => {
      if (page.metadata?.videoUrl) {
        setVideoUrl(page.metadata.videoUrl);
      }
    });
}, []);

// Then use:
videoUrls={videoUrl ? [videoUrl] : ['fallback-url.mp4']}
```

---

## Quick Steps:

1. **Get your cloud video URL** (should be a direct link to the .mp4 file)
2. **Open:** `Inspectors/frontend/src/pages/Services.tsx`
3. **Find line 104-107** (the `videoUrls` array)
4. **Replace** `'YOUR_CLOUD_VIDEO_URL_HERE'` with your actual URL
5. **Save the file**
6. **Test** - The video should now play on the Services page

---

## Important Notes:

- ✅ URL must be a **direct link** to the .mp4 file
- ✅ URL must be **publicly accessible** (no authentication required)
- ✅ Use **HTTPS** for security
- ✅ Video should be **MP4 format** (H.264 codec recommended)
- ✅ Make sure CORS is enabled if using cloud storage

---

## Testing:

1. Copy your cloud video URL
2. Paste it directly in a browser - it should download/play the video
3. If it works in browser, it will work in the app
4. Update Services.tsx with that exact URL

