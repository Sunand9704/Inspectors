const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  getAllBlogs,
  getBlogById,
  getFeaturedBlogs,
  getBlogsByTag,
  searchBlogs,
  getAllTags,
  createBlog,
  updateBlog,
  deleteBlog
} = require('../controllers/blog.controller');

// Create upload middleware for blog files using memory storage for Cloudinary
const upload = multer({
  storage: multer.memoryStorage(), // Store in memory for Cloudinary upload
  // No file size limit - removed as requested
  fileFilter: (req, file, cb) => {
    // Allow images for featuredImageFile
    if (file.fieldname === 'featuredImageFile') {
    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images are allowed for featured image.'), false);
      }
    }
    // Allow PDFs for pdfFile
    else if (file.fieldname === 'pdfFile') {
      const allowedMimes = ['application/pdf'];
      if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(new Error('Invalid file type. Only PDF files are allowed.'), false);
      }
    } else {
      cb(null, true);
    }
  }
});

// Public routes
router.get('/', getAllBlogs);
router.get('/featured', getFeaturedBlogs);
router.get('/tags', getAllTags);
router.get('/search', searchBlogs);
router.get('/tag/:tag', getBlogsByTag);
router.get('/:id', getBlogById);

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    console.error('Multer error:', err);
    return res.status(400).json({
      success: false,
      message: `Upload error: ${err.message}`,
      error: err.code
    });
  }
  if (err) {
    console.error('Upload error:', err);
    return res.status(400).json({
      success: false,
      message: err.message || 'File upload failed',
      error: err.message
    });
  }
  next();
};

// Admin routes (you can add authentication middleware here)
router.post('/', upload.fields([
  { name: 'featuredImageFile', maxCount: 1 },
  { name: 'pdfFile', maxCount: 1 }
]), handleMulterError, createBlog);
router.put('/:id', upload.fields([
  { name: 'featuredImageFile', maxCount: 1 },
  { name: 'pdfFile', maxCount: 1 }
]), handleMulterError, updateBlog);
router.delete('/:id', deleteBlog);

module.exports = router;
