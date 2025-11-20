const Blog = require('../models/Blog');
const cloudinaryService = require('../services/cloudinary');
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
    console.log('Create blog request received:', {
      body: req.body,
      files: req.files ? Object.keys(req.files) : 'No files',
      fileCount: req.files ? Object.values(req.files).flat().length : 0,
      headers: req.headers
    });
    
    const blogData = req.body;
    
    // If we're uploading a new PDF file, remove any pdfUrl from form data
    // (it will be set after Cloudinary upload)
    if (req.files && req.files.pdfFile && req.files.pdfFile[0]) {
      delete blogData.pdfUrl;
      console.log('Removed pdfUrl from blogData (will be set after upload)');
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

    // Handle uploaded PDF file - Store locally to avoid Cloudinary size limits
    if (req.files && req.files.pdfFile && req.files.pdfFile[0]) {
      try {
        const file = req.files.pdfFile[0];
        console.log('PDF file received:', {
          originalname: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
          fieldname: file.fieldname
        });
        
        // Create blog/pdfs directory if it doesn't exist
        const blogPdfDir = path.join(uploadsDir, 'blog', 'pdfs');
        if (!fs.existsSync(blogPdfDir)) {
          fs.mkdirSync(blogPdfDir, { recursive: true });
        }
        
        // Generate unique filename
        const timestamp = Date.now();
        const sanitizedOriginalName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
        const extension = path.extname(sanitizedOriginalName) || '.pdf';
        const baseName = path.basename(sanitizedOriginalName, extension);
        const fileName = `${baseName}-${timestamp}${extension}`;
        const filePath = path.join(blogPdfDir, fileName);
        
        // Save file to disk
        fs.writeFileSync(filePath, file.buffer);
        console.log('PDF saved locally:', filePath);
        
        // Create URL path (relative to /uploads)
        const relativePath = path.relative(uploadsDir, filePath).replace(/\\/g, '/');
        const pdfUrl = `/uploads/${relativePath}`;
        
        console.log('PDF URL created:', pdfUrl);
        blogData.pdfUrl = pdfUrl;
      } catch (uploadError) {
        console.error('PDF save error:', uploadError);
        console.error('PDF save error details:', {
          message: uploadError.message,
          stack: uploadError.stack
        });
        // Don't fail the entire request if PDF save fails
        console.warn('PDF save failed, continuing without PDF');
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
    console.log('Update blog request received:', {
      id: req.params.id,
      body: req.body,
      files: req.files ? Object.keys(req.files) : 'No files',
      fileCount: req.files ? Object.values(req.files).flat().length : 0,
      headers: req.headers,
      contentType: req.headers['content-type']
    });
    
    const { id } = req.params;
    const updateData = req.body;
    
    // If we're uploading a new PDF file, remove any pdfUrl from form data
    // (it will be set after Cloudinary upload)
    if (req.files && req.files.pdfFile && req.files.pdfFile[0]) {
      delete updateData.pdfUrl;
      console.log('Removed pdfUrl from updateData (will be set after upload)');
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

    // Handle uploaded PDF file - Store locally to avoid Cloudinary size limits
    if (req.files && req.files.pdfFile && req.files.pdfFile[0]) {
      try {
        const file = req.files.pdfFile[0];
        console.log('PDF file received (update):', {
          originalname: file.originalname,
          mimetype: file.mimetype,
          size: file.size,
          fieldname: file.fieldname,
          bufferLength: file.buffer ? file.buffer.length : 'no buffer'
        });
        
        // Create blog/pdfs directory if it doesn't exist
        const blogPdfDir = path.join(uploadsDir, 'blog', 'pdfs');
        if (!fs.existsSync(blogPdfDir)) {
          fs.mkdirSync(blogPdfDir, { recursive: true });
        }
        
        // Generate unique filename
        const timestamp = Date.now();
        const sanitizedOriginalName = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
        const extension = path.extname(sanitizedOriginalName) || '.pdf';
        const baseName = path.basename(sanitizedOriginalName, extension);
        const fileName = `${baseName}-${timestamp}${extension}`;
        const filePath = path.join(blogPdfDir, fileName);
        
        // Save file to disk
        fs.writeFileSync(filePath, file.buffer);
        console.log('PDF saved locally:', filePath);
        
        // Create URL path (relative to /uploads)
        const relativePath = path.relative(uploadsDir, filePath).replace(/\\/g, '/');
        const pdfUrl = `/uploads/${relativePath}`;
        
        console.log('PDF URL created:', pdfUrl);
        updateData.pdfUrl = pdfUrl;
      } catch (uploadError) {
        console.error('PDF save error (update):', uploadError);
        console.error('PDF save error details:', {
          message: uploadError.message,
          stack: uploadError.stack,
          name: uploadError.name
        });
        // Don't fail the entire request if PDF save fails
        console.warn('PDF save failed, continuing without PDF');
      }
    } else {
      console.log('No PDF file in request:', {
        hasFiles: !!req.files,
        hasPdfFile: !!(req.files && req.files.pdfFile),
        hasPdfFileArray: !!(req.files && req.files.pdfFile && req.files.pdfFile[0])
      });
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
  deleteBlog
};