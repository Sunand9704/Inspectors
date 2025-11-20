import * as React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';

interface VideoHeroProps {
  title: string;
  subtitle?: string;
  description: string;
  primaryCTA?: {
    text: string;
    href: string;
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  videoUrls: string[];
  autoPlaySeconds?: number;
}

export function VideoHero({
  title,
  subtitle,
  description,
  primaryCTA,
  secondaryCTA,
  videoUrls,
  autoPlaySeconds = 5,
}: VideoHeroProps) {
  // Use single video if only one provided, otherwise use carousel
  const isSingleVideo = videoUrls && videoUrls.length === 1;
  const [api, setApi] = React.useState<CarouselApi | null>(null);

  React.useEffect(() => {
    if (!api || !videoUrls || videoUrls.length <= 1) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const intervalMs = Math.max(2000, autoPlaySeconds * 1000);
    const id = window.setInterval(() => {
      api.scrollNext();
    }, intervalMs);

    return () => window.clearInterval(id);
  }, [api, autoPlaySeconds, videoUrls]);

  return (
    <section className="relative overflow-hidden min-h-[120vh] lg:min-h-[100vh]">
      {/* Video Background - Single or Carousel */}
      <div className="absolute inset-0">
        {isSingleVideo ? (
          // Single video (no carousel) - Full height to show complete video
          <div className="relative h-[120vh] lg:h-[100vh] w-full">
            <video
              className="h-full w-full object-cover bg-black"
              src={videoUrls[0]}
              playsInline
              autoPlay
              muted
              loop
              controls={false}
              preload="auto"
            />
            {/* Gradient overlay for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20" />
          </div>
        ) : (
          // Multiple videos carousel
          <Carousel className="h-full" opts={{ loop: true }} setApi={setApi}>
            <CarouselContent className="h-full">
              {videoUrls.map((url, idx) => (
                <CarouselItem key={idx} className="h-[80vh] lg:h-[90vh] p-0">
                  <div className="relative h-full w-full">
                    <video
                      className="h-full w-full object-cover"
                      src={url}
                      playsInline
                      autoPlay
                      muted
                      loop
                      controls={false}
                      preload="metadata"
                    />
                    {/* Gradient overlay for readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/20" />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white" />
            <CarouselNext className="right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white" />
          </Carousel>
        )}
      </div>

      {/* Content Overlay */}
      <div className="relative container-responsive py-16 lg:py-28">
        <div className="max-w-4xl mx-auto text-center text-white">
          {subtitle && (
            <div className="inline-block bg-white/10 backdrop-blur-sm rounded-full px-6 py-2 mb-6">
              <span className="text-sm font-medium">{subtitle}</span>
            </div>
          )}

          <h1 className="text-4xl lg:text-6xl font-bold mb-6 text-balance">
            {title}
          </h1>

          <p className="text-xl lg:text-2xl text-white/90 mb-10 text-pretty max-w-3xl mx-auto">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {primaryCTA && (
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4" asChild>
                {primaryCTA.href.startsWith('/') ? (
                  <Link to={primaryCTA.href}>
                    {primaryCTA.text}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                ) : (
                  <a href={primaryCTA.href}>
                    {primaryCTA.text}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                )}
              </Button>
            )}
            {secondaryCTA && (
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-4" asChild
              >
                {secondaryCTA.href.startsWith('/') ? (
                  <Link to={secondaryCTA.href}>
                    {secondaryCTA.text}
                  </Link>
                ) : (
                  <a href={secondaryCTA.href}>
                    {secondaryCTA.text}
                  </a>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Decorative Bottom Wave - Pronounced undulating wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg className="w-full h-24 lg:h-32 text-background" viewBox="0 0 1200 240" preserveAspectRatio="none">
          <path d="M0,240 Q200,100 400,140 Q600,180 800,120 Q1000,60 1200,100 L1200,240 Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
  );
}

