
import { HeroSection } from '@/components/Common/HeroSection';
import { VideoHero } from '@/components/Common/VideoHero';
import { ServiceCard } from '@/components/Common/ServiceCard';
// No legacy industry stats; rely on translations if available
import CountUp from '@/components/Common/CountUp';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, Award, Globe, Search, Settings, Shield, FileText, Brain } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';
import { useEffect, useState } from 'react';
import { getPageWithSections, SectionDto } from '@/utils/api';

export default function Services() {
  const { translations } = useTranslation();
  const hero = translations?.pages?.services?.hero;

  // Icon mapping for services
  const iconMap = {
    Search,
    Settings,
    Shield,
    FileText,
    Award,
    Brain
  };

  // Build services strictly from the 'services' page sections in DB (7 items)
  const [services, setServices] = useState<Array<{
    id: string | number;
    title: string;
    description: string;
    icon: any;
    link: string;
    imageUrl?: string;
  }>>([]);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      try {
        const page = await getPageWithSections('services', undefined, undefined);
        if (!isMounted) return;
        const sections: SectionDto[] = page.sections || [];
        const toSlug = (text: string) => String(text).toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
        const items = sections.map((s, index) => ({
          id: s._id || index,
          title: s.title,
          description: s.bodyText?.slice(0, 220) || '',
          icon: iconMap.Search,
          link: `/services/${s.sectionId || toSlug(s.title)}`,
          imageUrl: (s.images && s.images[0]) || undefined,
        }));
        setServices(items);
      } catch {
        if (isMounted) setServices([]);
      }
    };

    load();
    return () => { isMounted = false; };
  }, []);

  // Get industry stats from API or fallback to static data
  const industryStats = translations?.industryStats || [];

  return (
    <div>
      {/* Video Hero Section */}
      <VideoHero
        title={hero?.title || "Leading Testing, Inspection & Certification Services"}
        subtitle={hero?.subtitle || "Trusted Worldwide"}
        description={hero?.description || "Ensuring safety, security, and sustainability across industries with comprehensive testing, inspection, certification, and advisory services."}
        primaryCTA={{
          text: hero?.primaryCTAText || "Explore Services",
          href: "#services"
        }}
        secondaryCTA={{
          text: hero?.secondaryCTAText || "Get Quote",
          href: "/contact"
        }}
        autoPlaySeconds={7}
        videoUrls={[
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4',
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4',
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4',
        ]}
      />

      {/* Trust Indicators */}
      <section className="section bg-white">
        <div className="container-responsive">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {industryStats.map((stat, index) => {
              const raw = String(stat.number).replace(/\+/g, '').replace(/,/g, '');
              const isNumeric = /^\d+$/.test(raw);
              const end = isNumeric ? parseInt(raw, 10) : 0;
              const suffix = String(stat.number).includes('+') ? '+' : '';
              return (
              <div key={index} className="text-center animate-fade-in-up">
                <CountUp
                  end={end}
                  suffix={suffix}
                  className="text-3xl lg:text-4xl font-bold text-primary mb-2"
                />
                <div className="font-semibold text-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.description}
                </div>
              </div>
            )})}
          </div>
        </div>
      </section>

      {/* All Services */}
      <section className="section" id="services">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {hero?.title || "Complete Service Portfolio"}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {hero?.description || "From product testing to regulatory compliance, we provide comprehensive solutions to help you succeed in global markets."}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
            {services.length === 0 && (
              <div className="col-span-full text-center text-muted-foreground">
                No services available.
              </div>
            )}
          </div>
        </div>
      </section>

     
    </div>
  );
}
