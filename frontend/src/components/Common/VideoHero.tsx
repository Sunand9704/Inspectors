import * as React from 'react';
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
    <section className="relative overflow-hidden">
      {/* Video Carousel Background */}
      <div className="absolute inset-0">
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
                <a href={primaryCTA.href}>
                  {primaryCTA.text}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            )}
            {secondaryCTA && (
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-4" asChild
              >
                <a href={secondaryCTA.href}>
                  {secondaryCTA.text}
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Decorative Bottom Wave for continuity with existing design */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-12 text-background" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" fill="currentColor"></path>
        </svg>
      </div>
    </section>
  );
}


