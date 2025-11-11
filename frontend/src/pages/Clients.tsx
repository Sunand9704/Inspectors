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

export default function Clients() {
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
        console.log(`Clients page: Loaded ${clientImages.length} client images (total: ${data?.total}, active: ${data?.active})`);
        setImages(clientImages);
        setError(null);
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message || 'Failed to load clients');
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div>
      <section className="section pb-0">
        <div className="container-responsive">
          <h1 className="text-3xl font-bold">Clients</h1>
        </div>
      </section>
      <section className="section pt-6">
        <div className="container-responsive">
          {loading && <div className="text-center text-muted-foreground">Loading...</div>}
          {error && !loading && <div className="text-center text-destructive">{error}</div>}
          {!loading && !error && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {images.map((img) => (
                <div key={img._id} className="bg-white rounded-xl p-4 border shadow-sm flex items-center justify-center">
                  <img src={img.url} alt={img.fileName || 'Client'} className="max-h-16 object-contain" loading="lazy" />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}


