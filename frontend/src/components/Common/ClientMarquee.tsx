import { useEffect, useState } from 'react';
import { apiClient } from '@/utils/api';

type ClientImage = {
  _id: string;
  url: string;
  fileName?: string;
  width?: number;
  height?: number;
  format?: string;
};

export function ClientMarquee() {
  const [images, setImages] = useState<ClientImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const { data } = await apiClient.get('/api/clients/images');
        if (!mounted) return;
        setImages(data?.data || []);
        setError(null);
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message || 'Failed to load client images');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  if (loading) {
    return (
      <section className="section bg-gray-50">
        <div className="container-responsive">
          <div className="text-center text-muted-foreground">Loading client images...</div>
        </div>
      </section>
    );
  }

  if (error || images.length === 0) {
    return null; // Don't render anything if there's an error or no images
  }

  return (
    <section className="section bg-gray-50">
      <div className="container-responsive">
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold mb-2">Trusted by Industry Leaders</h2>
          <p className="text-muted-foreground">Our clients across various industries</p>
        </div>
      </div>
      
      {/* Full width marquee container */}
      <div className="relative overflow-hidden w-full">
        {/* Gradient overlays for smooth fade effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent z-10" />
        
        {/* Marquee container */}
        <div className="flex animate-marquee">
          {/* First set of images */}
          <div className="flex items-center space-x-12 flex-shrink-0">
            {images.map((img) => (
              <div
                key={img._id}
                className="flex-shrink-0 bg-white rounded-lg p-6 shadow-sm border flex items-center justify-center"
                style={{ minWidth: '180px', height: '120px' }}
              >
                <img
                  src={img.url}
                  alt={img.fileName || 'Client'}
                  className="max-h-20 max-w-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
          
          {/* Duplicate set for seamless loop */}
          <div className="flex items-center space-x-12 flex-shrink-0 ml-12">
            {images.map((img) => (
              <div
                key={`duplicate-${img._id}`}
                className="flex-shrink-0 bg-white rounded-lg p-6 shadow-sm border flex items-center justify-center"
                style={{ minWidth: '180px', height: '120px' }}
              >
                <img
                  src={img.url}
                  alt={img.fileName || 'Client'}
                  className="max-h-20 max-w-full object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
