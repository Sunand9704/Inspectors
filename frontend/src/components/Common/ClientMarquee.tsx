import { useEffect, useState } from 'react';
import { apiClient } from '@/utils/api';
import { Loading } from './Loading';

type ClientImage = {
  _id: string;
  url: string;
  fileName?: string;
  width?: number;
  height?: number;
  format?: string;
};

type ClientMarqueeProps = {
  direction?: 'left' | 'right';
};

export function ClientMarquee({ direction = 'left' }: ClientMarqueeProps) {
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
        const clientImages = data?.data || [];
        console.log(`ClientMarquee: Loaded ${clientImages.length} client images (total: ${data?.total}, active: ${data?.active})`);
        setImages(clientImages);
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
          <Loading size="md" message="Loading client images..." />
        </div>
      </section>
    );
  }

  if (error || images.length === 0) {
    return null; // Don't render anything if there's an error or no images
  }

  // Calculate animation duration based on number of clients
  // Each client card is ~228px (180px + 48px spacing), so for 43 clients that's ~9,804px
  // We want a smooth scroll, so ~2-3 seconds per client = 86-129 seconds total
  // But we'll use a more reasonable 80-120 seconds range
  const animationDuration = Math.max(60, Math.min(120, images.length * 2));

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
        
        {/* Marquee container - multiple sets to ensure all clients scroll */}
        <div 
          className={`flex ${direction === 'right' ? 'animate-marquee-right' : 'animate-marquee'}`}
          style={{ 
            width: 'max-content',
            animationDuration: `${animationDuration}s`
          }}
        >
          {/* Render multiple sets to ensure seamless infinite scroll with all clients */}
          {[...Array(3)].map((_, setIndex) => (
            <div 
              key={setIndex} 
              className="flex items-center space-x-12 flex-shrink-0"
              style={setIndex > 0 ? { marginLeft: '3rem' } : {}}
            >
              {images.map((img) => (
                <div
                  key={`set-${setIndex}-${img._id}`}
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
          ))}
        </div>
      </div>
    </section>
  );
}
