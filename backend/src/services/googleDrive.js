const { google } = require('googleapis');
const { logger } = require('../setup/logger');
const { Readable } = require('stream');
require('dotenv').config();

class GoogleDriveService {
  constructor() {
    this.oAuth2Client = null;
    this.drive = null;
    this.initializeAuth();
  }

  // Getter to expose oAuth2Client for use in controllers
  getOAuth2Client() {
    return this.oAuth2Client;
  }
  
  // Getter to expose drive instance
  getDrive() {
    return this.drive;
  }

  /**
   * Initialize Google OAuth2 client
   */
  initializeAuth() {
    try {
      const clientId = process.env.GOOGLE_CLIENT_ID;
      const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
      const redirectUri = process.env.GOOGLE_REDIRECT_URI;
      const refreshToken = process.env.GOOGLE_REFRESH_TOKEN;

      if (!clientId || !clientSecret || !refreshToken) {
        logger.warn('Google Drive credentials not fully configured. PDF uploads to Drive will fail.');
        return;
      }

      this.oAuth2Client = new google.auth.OAuth2(
        clientId,
        clientSecret,
        redirectUri
      );

      // Set the refresh token
      this.oAuth2Client.setCredentials({
        refresh_token: refreshToken
      });

      // Initialize Drive API
      this.drive = google.drive({ version: 'v3', auth: this.oAuth2Client });

      logger.info('Google Drive service initialized successfully');
    } catch (error) {
      logger.error(`Failed to initialize Google Drive service: ${error.message}`);
    }
  }

  /**
   * Get access token using refresh token
   */
  async getAccessToken() {
    try {
      if (!this.oAuth2Client) {
        throw new Error('OAuth2 client not initialized');
      }

      const { credentials } = await this.oAuth2Client.refreshAccessToken();
      this.oAuth2Client.setCredentials(credentials);
      return credentials.access_token;
    } catch (error) {
      logger.error(`Failed to get access token: ${error.message}`);
      throw new Error(`Failed to get access token: ${error.message}`);
    }
  }

  /**
   * Upload PDF file to Google Drive
   * @param {Buffer} fileBuffer - PDF file buffer
   * @param {string} fileName - Name for the file
   * @param {string} folderId - Optional folder ID (defaults to root)
   * @returns {Promise<Object>} Upload result with file ID and web view link
   */
  async uploadPdf(fileBuffer, fileName, folderId = null) {
    try {
      console.log('=== GOOGLE DRIVE SERVICE: Starting PDF upload ===');
      console.log('File name:', fileName);
      console.log('Buffer size:', fileBuffer ? fileBuffer.length : 0);
      console.log('Folder ID:', folderId || 'root');
      
      if (!this.drive) {
        const error = 'Google Drive service not initialized. Please check your credentials.';
        console.error('=== GOOGLE DRIVE ERROR ===');
        console.error(error);
        throw new Error(error);
      }

      console.log('=== Getting access token ===');
      // Ensure we have a valid access token
      await this.getAccessToken();
      console.log('Access token obtained successfully');

      // File metadata
      const fileMetadata = {
        name: fileName,
        mimeType: 'application/pdf'
      };

      // If folder ID is provided, set parent folder
      if (folderId) {
        fileMetadata.parents = [folderId];
      }

      console.log('File metadata:', fileMetadata);

      // Convert Buffer to Stream for Google Drive API
      console.log('=== Converting buffer to stream ===');
      const bufferStream = new Readable();
      bufferStream.push(fileBuffer);
      bufferStream.push(null); // End the stream
      console.log('Buffer converted to stream successfully');

      // Media upload options - Google Drive API expects a stream
      const media = {
        mimeType: 'application/pdf',
        body: bufferStream
      };

      console.log('=== Uploading file to Google Drive ===');
      // Upload file
      const response = await this.drive.files.create({
        requestBody: fileMetadata,
        media: media,
        fields: 'id, name, webViewLink, webContentLink, mimeType'
      });

      console.log('=== File uploaded, setting permissions ===');
      console.log('File ID:', response.data.id);
      console.log('File name:', response.data.name);

      // Make the file publicly viewable (for download)
      await this.drive.permissions.create({
        fileId: response.data.id,
        requestBody: {
          role: 'reader',
          type: 'anyone'
        }
      });
      console.log('Permissions set to public (anyone can read)');

      // Get the file details with download link
      const fileDetails = await this.drive.files.get({
        fileId: response.data.id,
        fields: 'id, name, webViewLink, webContentLink, mimeType'
      });

      console.log('File details retrieved:', {
        id: fileDetails.data.id,
        name: fileDetails.data.name,
        webViewLink: fileDetails.data.webViewLink,
        webContentLink: fileDetails.data.webContentLink
      });

      // Construct direct download URL for publicly accessible files
      // Format: https://drive.google.com/uc?export=download&id=FILE_ID
      // The 'confirm=t' parameter helps bypass virus scan warning for large files
      const directDownloadUrl = `https://drive.google.com/uc?export=download&id=${response.data.id}`;
      
      // Use direct download URL, fallback to webContentLink, then webViewLink
      const downloadUrl = directDownloadUrl || fileDetails.data.webContentLink || fileDetails.data.webViewLink;

      console.log('=== PDF uploaded to Google Drive successfully ===');
      console.log('Download URL:', downloadUrl);
      logger.info(`PDF uploaded to Google Drive successfully: ${response.data.id}`);

      return {
        success: true,
        fileId: response.data.id,
        fileName: response.data.name,
        downloadUrl: downloadUrl,
        viewUrl: fileDetails.data.webViewLink,
        mimeType: response.data.mimeType
      };
    } catch (error) {
      console.error('=== GOOGLE DRIVE UPLOAD ERROR ===');
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
      logger.error(`PDF upload to Google Drive failed: ${error.message}`);
      throw new Error(`PDF upload to Google Drive failed: ${error.message}`);
    }
  }

  /**
   * Delete file from Google Drive
   * @param {string} fileId - Google Drive file ID
   * @returns {Promise<Object>} Deletion result
   */
  async deleteFile(fileId) {
    try {
      if (!this.drive) {
        throw new Error('Google Drive service not initialized');
      }

      await this.getAccessToken();

      await this.drive.files.delete({
        fileId: fileId
      });

      logger.info(`File deleted from Google Drive: ${fileId}`);

      return {
        success: true,
        message: 'File deleted successfully'
      };
    } catch (error) {
      logger.error(`Failed to delete file from Google Drive: ${error.message}`);
      throw new Error(`Failed to delete file from Google Drive: ${error.message}`);
    }
  }

  /**
   * Get file download URL from Google Drive file ID
   * @param {string} fileId - Google Drive file ID
   * @returns {Promise<string>} Download URL
   */
  async getFileDownloadUrl(fileId) {
    try {
      if (!this.drive) {
        throw new Error('Google Drive service not initialized');
      }

      await this.getAccessToken();

      const file = await this.drive.files.get({
        fileId: fileId,
        fields: 'webContentLink, webViewLink'
      });

      return file.data.webContentLink || file.data.webViewLink;
    } catch (error) {
      logger.error(`Failed to get file download URL: ${error.message}`);
      throw new Error(`Failed to get file download URL: ${error.message}`);
    }
  }

  /**
   * Extract file ID from Google Drive URL
   * @param {string} url - Google Drive URL
   * @returns {string|null} File ID or null if not found
   */
  extractFileIdFromUrl(url) {
    if (!url) return null;

    // Handle different Google Drive URL formats
    // Format 1: https://drive.google.com/file/d/FILE_ID/view
    // Format 2: https://drive.google.com/uc?id=FILE_ID
    // Format 3: https://drive.google.com/open?id=FILE_ID

    const patterns = [
      /\/file\/d\/([a-zA-Z0-9_-]+)/,
      /[?&]id=([a-zA-Z0-9_-]+)/,
      /\/open\?id=([a-zA-Z0-9_-]+)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }

    return null;
  }
}

module.exports = new GoogleDriveService();

