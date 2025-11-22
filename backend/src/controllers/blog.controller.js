const Blog = require('../models/Blog');
const cloudinaryService = require('../services/cloudinary');
const googleDriveService = require('../services/googleDrive');
const fs = require('fs');
const path = require('path');
const { uploadsDir } = require('../utils/paths');

// Get all published blogs with pagination and filtering
const getAllBlogs = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      featured,
      tag,
      search,
      sortBy = 'publishedAt',
      sortOrder = 'desc'
    } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build query
    let query = {};
    
    // Only filter by published status if not requesting all blogs (for admin)
    if (req.query.includeUnpublished !== 'true') {
      query.isPublished = true;
    }

    if (featured === 'true') {
      query.isFeatured = true;
    }

    if (tag) {
      query.tags = { $in: [new RegExp(tag, 'i')] };
    }

    if (search) {
      query.title = { $regex: search, $options: 'i' };
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Include content for admin requests (when includeUnpublished=true)
    const selectFields = req.query.includeUnpublished === 'true' ? '' : '-content';
    
    const blogs = await Blog.find(query)
      .select(selectFields)
      .sort(sort)
      .skip(skip)
      .limit(limitNum)
      .lean();

    const total = await Blog.countDocuments(query);
    const totalPages = Math.ceil(total / limitNum);

    res.json({
      success: true,
      data: {
        blogs,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalItems: total,
          hasNext: pageNum < totalPages,
          hasPrev: pageNum > 1
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs',
      error: error.message
    });
  }
};

// Get single blog by ID or slug
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if id is a valid ObjectId or slug
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
    
    let blog;
    if (isObjectId) {
      blog = await Blog.findById(id);
    } else {
      blog = await Blog.findOne({ slug: id });
    }

    if (!blog || !blog.isPublished) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Increment view count
    await blog.incrementViewCount();

    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blog post',
      error: error.message
    });
  }
};

// Get featured blogs
const getFeaturedBlogs = async (req, res) => {
  try {
    const { limit = 5 } = req.query;
    const limitNum = parseInt(limit);

    const blogs = await Blog.getFeatured()
      .select('-content')
      .limit(limitNum)
      .lean();

    res.json({
      success: true,
      data: blogs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching featured blogs',
      error: error.message
    });
  }
};

// Get blogs by tag
const getBlogsByTag = async (req, res) => {
  try {
    const { tag } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const blogs = await Blog.find({
      isPublished: true,
      tags: { $in: [new RegExp(tag, 'i')] }
    })
      .select('-content')
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(limitNum)
      .lean();

    const total = await Blog.countDocuments({
      isPublished: true,
      tags: { $in: [new RegExp(tag, 'i')] }
    });

    const totalPages = Math.ceil(total / limitNum);

    res.json({
      success: true,
      data: {
        blogs,
        tag,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalItems: total,
          hasNext: pageNum < totalPages,
          hasPrev: pageNum > 1
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching blogs by tag',
      error: error.message
    });
  }
};

// Search blogs
const searchBlogs = async (req, res) => {
  try {
    const { q: query, page = 1, limit = 10 } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const pageNum = parseInt(page);
    const limitNum = parseInt(limit);
    const skip = (pageNum - 1) * limitNum;

    const blogs = await Blog.search(query)
      .select('-content')
      .skip(skip)
      .limit(limitNum)
      .lean();

    const total = await Blog.countDocuments({
      isPublished: true,
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { excerpt: { $regex: query, $options: 'i' } },
        { content: { $regex: query, $options: 'i' } },
        { tags: { $in: [new RegExp(query, 'i')] } }
      ]
    });

    const totalPages = Math.ceil(total / limitNum);

    res.json({
      success: true,
      data: {
        blogs,
        query,
        pagination: {
          currentPage: pageNum,
          totalPages,
          totalItems: total,
          hasNext: pageNum < totalPages,
          hasPrev: pageNum > 1
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching blogs',
      error: error.message
    });
  }
};

// Get all unique tags
const getAllTags = async (req, res) => {
  try {
    const tags = await Blog.distinct('tags', { isPublished: true });
    
    res.json({
      success: true,
      data: tags.sort()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching tags',
      error: error.message
    });
  }
};

// Create new blog (Admin only)
const createBlog = async (req, res) => {
  try {
    console.log('=== BACKEND: Create blog request received ===');
    console.log('Content-Type:', req.headers['content-type']);
    console.log('Request body keys:', Object.keys(req.body));
    console.log('Request body:', {
      title: req.body.title,
      excerpt: req.body.excerpt,
      hasPdfUrl: !!req.body.pdfUrl,
      pdfUrl: req.body.pdfUrl
    });
    console.log('Files object:', req.files ? {
      keys: Object.keys(req.files),
      fileCount: Object.values(req.files).flat().length,
      files: Object.entries(req.files).map(([key, files]) => [
        key,
        files.map(f => ({
          fieldname: f.fieldname,
          originalname: f.originalname,
          mimetype: f.mimetype,
          size: f.size,
          bufferLength: f.buffer ? f.buffer.length : 0
        }))
      ])
    } : 'No files');
    
    const blogData = req.body;
    
    // If we're uploading a new PDF file, remove any pdfUrl from form data
    // (it will be set after Google Drive upload)
    if (req.files && req.files.pdfFile && req.files.pdfFile[0]) {
      delete blogData.pdfUrl;
      console.log('=== Removed pdfUrl from blogData (will be set after Google Drive upload) ===');
    }

    // Handle uploaded featured image
    if (req.files && req.files.featuredImageFile && req.files.featuredImageFile[0]) {
      try {
        const file = req.files.featuredImageFile[0];
        // Generate a unique public ID for the blog image
        const timestamp = Date.now();
        const publicId = `blog-${timestamp}`;
        
        const uploadResult = await cloudinaryService.uploadFromBuffer(file.buffer, {
          folder: 'cbm/blog/featured-images',
          public_id: publicId,
          transformation: [
            { width: 800, height: 600, crop: 'fit', quality: 'auto' }
          ],
          tags: ['blog', 'featured-image', 'cbm']
        });
        
        blogData.featuredImage = uploadResult.url;
      } catch (uploadError) {
        console.error('Image upload error:', uploadError);
        // If Cloudinary upload fails, keep the existing image URL or empty
        console.warn('Cloudinary upload failed, using provided image URL or empty');
      }
    }

    // Handle uploaded PDF file - Upload to Google Drive
    console.log('=== Checking for PDF file ===');
    console.log('req.files exists:', !!req.files);
    console.log('req.files.pdfFile exists:', !!(req.files && req.files.pdfFile));
    console.log('req.files.pdfFile[0] exists:', !!(req.files && req.files.pdfFile && req.files.pdfFile[0]));
    
    if (req.files && req.files.pdfFile && req.files.pdfFile[0]) {
      try {
        const file = req.files.pdfFile[0];
        console.log('=== PDF FILE FOUND - Starting upload process ===');
        console.log('PDF file details:', {
          fieldname: file.fieldname,
          originalname: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
          bufferExists: !!file.buffer,
          bufferLength: file.buffer ? file.buffer.length : 0
        });
        
        // Validate PDF file
        if (!file.buffer || file.buffer.length === 0) {
          throw new Error('PDF file buffer is empty');
        }
        
        if (file.mimetype !== 'application/pdf') {
          console.warn('Warning: File mimetype is not application/pdf:', file.mimetype);
        }
        
        // Generate unique filename
        const timestamp = Date.now();
        const sanitizedOriginalName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
        const extension = path.extname(sanitizedOriginalName) || '.pdf';
        const baseName = path.basename(sanitizedOriginalName, extension);
        const fileName = `blog-${baseName}-${timestamp}${extension}`;
        console.log('Generated filename for Google Drive:', fileName);
        
        // Upload to Google Drive
        console.log('=== Uploading PDF to Google Drive ===');
        const uploadResult = await googleDriveService.uploadPdf(file.buffer, fileName);
        
        console.log('=== PDF uploaded to Google Drive successfully ===');
        console.log('Upload result:', {
          success: uploadResult.success,
          fileId: uploadResult.fileId,
          fileName: uploadResult.fileName,
          downloadUrl: uploadResult.downloadUrl,
          viewUrl: uploadResult.viewUrl
        });
        
        blogData.pdfUrl = uploadResult.downloadUrl;
        console.log('PDF URL set in blogData:', blogData.pdfUrl);
      } catch (uploadError) {
        console.error('=== PDF UPLOAD TO GOOGLE DRIVE ERROR ===');
        console.error('Error message:', uploadError.message);
        console.error('Error stack:', uploadError.stack);
        console.error('Error name:', uploadError.name);
        // Don't fail the entire request if PDF upload fails
        console.warn('PDF upload to Google Drive failed, continuing without PDF');
      }
    } else {
      console.log('=== No PDF file in request ===');
      if (req.body.pdfUrl) {
        console.log('Existing pdfUrl in body:', req.body.pdfUrl);
      }
    }

    // Parse JSON fields if they exist
    if (blogData.tags && typeof blogData.tags === 'string') {
      blogData.tags = JSON.parse(blogData.tags);
    }
    if (blogData.images && typeof blogData.images === 'string') {
      blogData.images = JSON.parse(blogData.images);
    }

    // Generate slug if not provided
    if (!blogData.slug && blogData.title) {
      blogData.slug = blogData.title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-');
    }

    const blog = new Blog(blogData);
    await blog.save();

    res.status(201).json({
      success: true,
      data: blog,
      message: 'Blog post created successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating blog post',
      error: error.message
    });
  }
};

// Update blog (Admin only)
const updateBlog = async (req, res) => {
  try {
    console.log('=== BACKEND: Update blog request received ===');
    console.log('Blog ID:', req.params.id);
    console.log('Content-Type:', req.headers['content-type']);
    console.log('Request body keys:', Object.keys(req.body));
    console.log('Request body:', {
      title: req.body.title,
      excerpt: req.body.excerpt,
      hasPdfUrl: !!req.body.pdfUrl,
      pdfUrl: req.body.pdfUrl
    });
    console.log('Files object:', req.files ? {
      keys: Object.keys(req.files),
      fileCount: Object.values(req.files).flat().length,
      files: Object.entries(req.files).map(([key, files]) => [
        key,
        files.map(f => ({
          fieldname: f.fieldname,
          originalname: f.originalname,
          mimetype: f.mimetype,
          size: f.size,
          bufferLength: f.buffer ? f.buffer.length : 0
        }))
      ])
    } : 'No files');
    
    const { id } = req.params;
    const updateData = req.body;
    
    // If we're uploading a new PDF file, remove any pdfUrl from form data
    // (it will be set after Google Drive upload)
    if (req.files && req.files.pdfFile && req.files.pdfFile[0]) {
      delete updateData.pdfUrl;
      console.log('=== Removed pdfUrl from updateData (will be set after Google Drive upload) ===');
    }
    
    // Check if blog exists
    const existingBlog = await Blog.findById(id);
    if (!existingBlog) {
      console.log('Blog not found for ID:', id);
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    console.log('Existing blog found:', {
      id: existingBlog._id,
      title: existingBlog.title,
      featuredImage: existingBlog.featuredImage
    });

    // Handle uploaded featured image
    if (req.files && req.files.featuredImageFile && req.files.featuredImageFile[0]) {
      try {
        const file = req.files.featuredImageFile[0];
        // Generate a unique public ID for the blog image
        const timestamp = Date.now();
        const publicId = `blog-${timestamp}`;
        
        const uploadResult = await cloudinaryService.uploadFromBuffer(file.buffer, {
          folder: 'cbm/blog/featured-images',
          public_id: publicId,
          transformation: [
            { width: 800, height: 600, crop: 'fit', quality: 'auto' }
          ],
          tags: ['blog', 'featured-image', 'cbm']
        });
        
        updateData.featuredImage = uploadResult.url;
      } catch (uploadError) {
        console.error('Image upload error:', uploadError);
        // If Cloudinary upload fails, keep the existing image URL or empty
        console.warn('Cloudinary upload failed, using provided image URL or empty');
      }
    }

    // Handle uploaded PDF file - Upload to Google Drive
    console.log('=== Checking for PDF file (update) ===');
    console.log('req.files exists:', !!req.files);
    console.log('req.files.pdfFile exists:', !!(req.files && req.files.pdfFile));
    console.log('req.files.pdfFile[0] exists:', !!(req.files && req.files.pdfFile && req.files.pdfFile[0]));
    
    if (req.files && req.files.pdfFile && req.files.pdfFile[0]) {
      try {
        const file = req.files.pdfFile[0];
        console.log('=== PDF FILE FOUND (update) - Starting upload process ===');
        console.log('PDF file details:', {
          fieldname: file.fieldname,
          originalname: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
          bufferExists: !!file.buffer,
          bufferLength: file.buffer ? file.buffer.length : 0
        });
        
        // Validate PDF file
        if (!file.buffer || file.buffer.length === 0) {
          throw new Error('PDF file buffer is empty');
        }
        
        if (file.mimetype !== 'application/pdf') {
          console.warn('Warning: File mimetype is not application/pdf:', file.mimetype);
        }
        
        // Generate unique filename
        const timestamp = Date.now();
        const sanitizedOriginalName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
        const extension = path.extname(sanitizedOriginalName) || '.pdf';
        const baseName = path.basename(sanitizedOriginalName, extension);
        const fileName = `blog-${baseName}-${timestamp}${extension}`;
        console.log('Generated filename for Google Drive (update):', fileName);
        
        // Upload to Google Drive
        console.log('=== Uploading PDF to Google Drive (update) ===');
        const uploadResult = await googleDriveService.uploadPdf(file.buffer, fileName);
        
        console.log('=== PDF uploaded to Google Drive successfully (update) ===');
        console.log('Upload result:', {
          success: uploadResult.success,
          fileId: uploadResult.fileId,
          fileName: uploadResult.fileName,
          downloadUrl: uploadResult.downloadUrl,
          viewUrl: uploadResult.viewUrl
        });
        
        updateData.pdfUrl = uploadResult.downloadUrl;
        console.log('PDF URL set in updateData:', updateData.pdfUrl);
      } catch (uploadError) {
        console.error('=== PDF UPLOAD TO GOOGLE DRIVE ERROR (update) ===');
        console.error('Error message:', uploadError.message);
        console.error('Error stack:', uploadError.stack);
        console.error('Error name:', uploadError.name);
        // Don't fail the entire request if PDF upload fails
        console.warn('PDF upload to Google Drive failed, continuing without PDF');
      }
    } else {
      console.log('=== No PDF file in request (update) ===');
      if (req.body.pdfUrl) {
        console.log('Existing pdfUrl in body:', req.body.pdfUrl);
      }
    }

    // Parse JSON fields if they exist
    if (updateData.tags && typeof updateData.tags === 'string') {
      try {
        updateData.tags = JSON.parse(updateData.tags);
      } catch (e) {
        console.error('Error parsing tags:', e);
        updateData.tags = [];
      }
    }
    if (updateData.images && typeof updateData.images === 'string') {
      try {
        updateData.images = JSON.parse(updateData.images);
      } catch (e) {
        console.error('Error parsing images:', e);
        updateData.images = [];
      }
    }

    console.log('Updating blog with data:', {
      ...updateData,
      pdfUrl: updateData.pdfUrl || 'NOT SET'
    });
    console.log('PDF URL in updateData:', updateData.pdfUrl);
    
    const blog = await Blog.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    console.log('Blog after update:', {
      id: blog?._id,
      title: blog?.title,
      pdfUrl: blog?.pdfUrl || 'NOT SET IN DATABASE'
    });

    if (!blog) {
      console.log('Blog not found with ID:', id);
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    console.log('Blog updated successfully:', { id: blog._id, title: blog.title });
    
    res.json({
      success: true,
      data: blog,
      message: 'Blog post updated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating blog post',
      error: error.message
    });
  }
};

// Download PDF proxy endpoint
const downloadPdf = async (req, res) => {
  try {
    const { id } = req.params;
    
    console.log('=== PDF Download Request ===');
    console.log('Blog ID:', id);
    
    const blog = await Blog.findById(id);
    
    if (!blog) {
      console.log('Blog not found');
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }
    
    if (!blog.pdfUrl) {
      console.log('No PDF URL in blog');
      return res.status(404).json({
        success: false,
        message: 'PDF not available for this blog post'
      });
    }
    
    console.log('PDF URL:', blog.pdfUrl);
    
    // If it's a Google Drive URL, use Google Drive API to get the file
    if (blog.pdfUrl.includes('drive.google.com')) {
      console.log('Fetching PDF from Google Drive using API');
      
      // Extract file ID
      const fileIdMatch = blog.pdfUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) || 
                         blog.pdfUrl.match(/[?&]id=([a-zA-Z0-9_-]+)/) ||
                         blog.pdfUrl.match(/\/open\?id=([a-zA-Z0-9_-]+)/);
      
      if (fileIdMatch && fileIdMatch[1]) {
        const fileId = fileIdMatch[1];
        console.log('Extracted file ID:', fileId);
        
        try {
          // Use Google Drive API to get file content directly
          const googleDriveService = require('../services/googleDrive');
          
          // Ensure we have access token
          await googleDriveService.getAccessToken();
          const drive = googleDriveService.getDrive();
          
          if (!drive) {
            throw new Error('Google Drive service not initialized');
          }
          
          // Get file metadata first
          const fileMetadata = await drive.files.get({
            fileId: fileId,
            fields: 'id, name, mimeType'
          });
          
          console.log('File metadata:', fileMetadata.data);
          
          // Get file content as stream
          const fileStream = await drive.files.get(
            { fileId: fileId, alt: 'media' },
            { responseType: 'stream' }
          );
          
          console.log('File stream obtained, piping to response');
          
          // Set response headers
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', `attachment; filename="${blog.title.replace(/[^a-z0-9]/gi, '_')}.pdf"`);
          
          // Pipe the stream to response
          fileStream.data.pipe(res);
          return;
        } catch (driveError) {
          console.error('Google Drive API error:', driveError);
          console.error('Error details:', {
            message: driveError.message,
            stack: driveError.stack
          });
          // Fallback to direct URL
          console.log('Falling back to direct URL download');
        }
      }
    }
    
    // For other URLs (Cloudinary, local), redirect
    console.log('Redirecting to PDF URL');
    res.redirect(blog.pdfUrl);
    
  } catch (error) {
    console.error('PDF download error:', error);
    res.status(500).json({
      success: false,
      message: 'Error downloading PDF',
      error: error.message
    });
  }
};

// Delete blog (Admin only)
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    res.json({
      success: true,
      message: 'Blog post deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting blog post',
      error: error.message
    });
  }
};

module.exports = {
  getAllBlogs,
  getBlogById,
  getFeaturedBlogs,
  getBlogsByTag,
  searchBlogs,
  getAllTags,
  createBlog,
  updateBlog,
  deleteBlog,
  downloadPdf
};