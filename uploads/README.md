Uploads workspace for service cover images

Structure:

- services/
  - testing/cover-images/
  - inspection/cover-images/
  - auditing/cover-images/
  - verification-certification/cover-images/
  - innovation-rd/cover-images/
  - cbm/cover-images/

Place JPG/PNG/WebP images into the desired `cover-images` folder. Then run the upload script:

```bash
node backend/scripts/upload-service-covers.js
```

The script uploads to Cloudinary under `cbm/services/<service>/cover-images` and prints a JSON mapping of services to uploaded image metadata. Use the `url` values to populate `sections[].images[0]` for each service item in your database so the frontend cards display the cover image.


