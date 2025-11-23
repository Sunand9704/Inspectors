import * as React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from '@/components/ui/carousel';

interface VideoHeroProps {
  title: string;
  subtitle?: string;
  description: string;
  slideTitles?: string[];
  slideDescriptions?: string[];
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
  slideTitles,
  slideDescriptions,
  primaryCTA,
  secondaryCTA,
  videoUrls,
  autoPlaySeconds = 5,
}: VideoHeroProps) {
  // Use single video if only one provided, otherwise use carousel
  const isSingleVideo = videoUrls && videoUrls.length === 1;
  const [api, setApi] = React.useState<CarouselApi | null>(null);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const videoRefs = React.useRef<(HTMLVideoElement | null)[]>([]);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Handle video end - wait 3 seconds then move to next slide
  const handleVideoEnd = React.useCallback((videoIndex: number) => {
    if (!api || !videoUrls || videoUrls.length <= 1) return;
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Wait 3 seconds before moving to next slide
    timeoutRef.current = setTimeout(() => {
      const nextIndex = (videoIndex + 1) % videoUrls.length;
      api.scrollTo(nextIndex);
    }, 3000);
  }, [api, videoUrls]);

  // Clean up timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Track current slide index and play video when slide changes
  React.useEffect(() => {
    if (!api || !videoUrls || videoUrls.length <= 1) return;

    const onSelect = () => {
      try {
        const snap = api.selectedScrollSnap();
        const newIndex = snap ?? 0;
        setCurrentIndex(newIndex);
        
        // Clear any pending auto-advance timeout when manually navigating
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
        
        // Play the video for the current slide
        const currentVideo = videoRefs.current[newIndex];
        if (currentVideo) {
          // Pause all videos first
          videoRefs.current.forEach((video) => {
            if (video) {
              video.pause();
            }
          });
          // Play the current video
          currentVideo.currentTime = 0;
          currentVideo.play().catch(() => {
            // Ignore autoplay errors
          });
        }
      } catch {
        setCurrentIndex(0);
      }
    };

    onSelect();
    api.on('select', onSelect);

    return () => {
      api.off('select', onSelect);
    };
  }, [api, videoUrls]);

  const activeTitle =
    slideTitles && slideTitles.length > 0
      ? slideTitles[Math.min(currentIndex, slideTitles.length - 1)]
      : title;

  const activeDescription =
    slideDescriptions && slideDescriptions.length > 0
      ? slideDescriptions[Math.min(currentIndex, slideDescriptions.length - 1)]
      : description;

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
                      ref={(el) => {
                        videoRefs.current[idx] = el;
                      }}
                      className="h-full w-full object-cover"
                      src={url}
                      playsInline
                      autoPlay={idx === 0}
                      muted
                      controls={false}
                      preload="metadata"
                      onEnded={() => handleVideoEnd(idx)}
                      onPlay={() => {
                        // Pause all other videos when one starts playing
                        videoRefs.current.forEach((video, i) => {
                          if (video && i !== idx) {
                            video.pause();
                          }
                        });
                      }}
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
            {activeTitle}
          </h1>

          <p className="text-xl lg:text-2xl text-white/90 mb-10 text-pretty max-w-3xl mx-auto">
            {activeDescription}
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

