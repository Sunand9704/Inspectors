import { FormEvent, useEffect, useState } from 'react';
import { api } from '@/lib/api';

interface ClientImage {
  _id: string;
  fileName: string;
  url: string;
  public_id: string;
  width: number;
  height: number;
  format: string;
  size: number;
  isActive: boolean;
  createdAt: string;
}

export default function Clients() {
  const [images, setImages] = useState<ClientImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState('');

  const loadImages = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get('/api/clients/images');
      setImages(response.data.data || []);
    } catch (err: any) {
      setError(err?.response?.data?.message || err?.message || 'Failed to load client images');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadImages();
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Please select an image file');
      return;
    }

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append('fileName', fileName);

      const response = await api.post('/api/clients/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        setSelectedFile(null);
        setFileName('');
        // Reset file input
        const fileInput = document.getElementById('image-upload') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
        await loadImages();
      }
    } catch (err: any) {
      alert(err?.response?.data?.message || err?.message || 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (image: ClientImage) => {
    if (!confirm('Are you sure you want to delete this image?')) return;
    
    try {
      await api.delete(`/api/clients/images/${image._id}`);
      await loadImages();
    } catch (err: any) {
      alert(err?.response?.data?.message || err?.message || 'Delete failed');
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '700', margin: '0 0 8px 0', color: '#111827' }}>
          Clients
        </h1>
        <p style={{ color: '#6b7280', margin: 0 }}>
          Manage client images displayed in the marquee section.
        </p>
      </div>

      {/* Upload Form */}
      <div style={{ border: '1px solid #e5e7eb', borderRadius: 8, padding: 16, marginBottom: 24 }}>
        <h2 style={{ marginBottom: 12, fontWeight: 600 }}>Add Client Image</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: 12, alignItems: 'end' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}>Image File</label>
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              required
              style={{ width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 6 }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: 4, fontWeight: 500 }}>Display Name (Optional)</label>
            <input
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="Enter display name"
              style={{ width: '100%', padding: 8, border: '1px solid #d1d5db', borderRadius: 6 }}
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={uploading || !selectedFile}
              style={{
                padding: '8px 16px',
                borderRadius: 6,
                background: uploading ? '#9ca3af' : '#111827',
                color: 'white',
                border: 'none',
                cursor: uploading ? 'not-allowed' : 'pointer',
                fontWeight: 500
              }}
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </button>
          </div>
        </form>
        {selectedFile && (
          <div style={{ marginTop: 8, padding: 8, backgroundColor: '#f3f4f6', borderRadius: 4, fontSize: '14px' }}>
            <strong>Selected:</strong> {selectedFile.name} ({formatFileSize(selectedFile.size)})
          </div>
        )}
      </div>

      {/* Images List */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>Loading client images...</div>
      ) : error ? (
        <div style={{ color: '#dc2626', textAlign: 'center', padding: '40px' }}>{error}</div>
      ) : (
        <div style={{ border: '1px solid #e5e7eb', borderRadius: 8 }}>
          <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>
            <h3 style={{ margin: 0, fontWeight: 600 }}>Client Images ({images.length})</h3>
          </div>
          
          {images.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#6b7280' }}>
              No client images uploaded yet. Upload your first image above.
            </div>
          ) : (
            <div style={{ padding: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
                {images.map((image) => (
                  <div
                    key={image._id}
                    style={{
                      border: '1px solid #e5e7eb',
                      borderRadius: 8,
                      padding: '12px',
                      backgroundColor: 'white'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '12px' }}>
                      <img
                        src={image.url}
                        alt={image.fileName || 'Client'}
                        style={{
                          width: '60px',
                          height: '60px',
                          objectFit: 'contain',
                          backgroundColor: '#f9fafb',
                          borderRadius: 4,
                          marginRight: '12px',
                          border: '1px solid #e5e7eb'
                        }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 500, marginBottom: '4px' }}>
                          {image.fileName || 'Untitled'}
                        </div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>
                          {image.width} × {image.height} • {image.format.toUpperCase()} • {formatFileSize(image.size)}
                        </div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>
                          Added: {formatDate(image.createdAt)}
                        </div>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => window.open(image.url, '_blank')}
                        style={{
                          flex: 1,
                          padding: '6px 12px',
                          borderRadius: 4,
                          border: '1px solid #d1d5db',
                          backgroundColor: 'white',
                          cursor: 'pointer',
                          fontSize: '14px'
                        }}
                      >
                        View
                      </button>
                      <button
                        onClick={() => handleDelete(image)}
                        style={{
                          flex: 1,
                          padding: '6px 12px',
                          borderRadius: 4,
                          border: '1px solid #dc2626',
                          backgroundColor: '#dc2626',
                          color: 'white',
                          cursor: 'pointer',
                          fontSize: '14px'
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
