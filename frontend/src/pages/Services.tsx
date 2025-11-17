
import { HeroSection } from '@/components/Common/HeroSection';
import { VideoHero } from '@/components/Common/VideoHero';
import { ServiceCard } from '@/components/Common/ServiceCard';
import { ClientMarquee } from '@/components/Common/ClientMarquee';
// No legacy industry stats; rely on translations if available
import CountUp from '@/components/Common/CountUp';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Users, Award, Globe, Search, Settings, Shield, FileText, Brain } from 'lucide-react';
import { useTranslation } from '@/contexts/TranslationContext';
import { useEffect, useState } from 'react';
import { getPageWithSections, SectionDto } from '@/utils/api';
import { industryStats as fallbackIndustryStats } from '@/data/industries';

export default function Services() {
  const { translations } = useTranslation();
  const hero = translations?.pages?.services?.hero;
  const servicesOverview = (translations as any)?.pages?.services?.servicesOverview;

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
        
        // Log all service cover images for verification
        console.log('=== SERVICE COVER IMAGES DEBUG ===');
        sections.forEach((s) => {
          console.log(`Service: ${s.title}`);
          console.log(`  - coverPhoto: ${s.coverPhoto || 'NOT SET'}`);
          console.log(`  - images[0]: ${s.images?.[0] || 'NOT SET'}`);
          console.log(`  - images array length: ${s.images?.length || 0}`);
          if (s.images && s.images.length > 0) {
            console.log(`  - All images:`, s.images);
          }
        });
        console.log('================================');
        
        const toSlug = (text: string) => String(text).toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
        const items = sections.map((s, index) => {
          const imageUrl = s.coverPhoto || (s.images && s.images[0]) || undefined;
          console.log(`[Service: ${s.title}] Final imageUrl: ${imageUrl || 'UNDEFINED'}`);
          return {
            id: s._id || index,
            title: s.title,
            description: s.bodyText?.slice(0, 220) || '',
            icon: iconMap.Search,
            link: `/services/${s.sectionId || toSlug(s.title)}`,
            imageUrl,
          };
        });
        setServices(items);
      } catch {
        if (isMounted) setServices([]);
      }
    };

    load();
    return () => { isMounted = false; };
  }, []);

  // Force new industry stats values regardless of backend translations
  const industryStats = fallbackIndustryStats;

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
          href: "/contact#contact-form"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center max-w-5xl mx-auto">
            {industryStats.map((stat, index) => {
              const yearsCompleted = stat.startYear
                ? Math.max(new Date().getFullYear() - stat.startYear, 0)
                : null;
              const displayNumber = yearsCompleted !== null
                ? yearsCompleted.toString()
                : stat.number;
              const raw = String(displayNumber).replace(/\+/g, '').replace(/,/g, '');
              const isNumeric = /^\d+$/.test(raw);
              const end = isNumeric ? parseInt(raw, 10) : 0;
              const suffix = yearsCompleted !== null
                ? ''
                : String(stat.number).includes('+')
                  ? '+'
                  : '';
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

      <ClientMarquee direction="left" />

      {/* All Services */}
      <section className="section" id="services">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              {servicesOverview?.title || "Services"}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {servicesOverview?.description || "we provide complete inspection workforce and technical support solutions, including recruitment, contract staffing, payroll, logistics, and training—ensuring qualified professionals and reliable service for every project."}
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

      {/* Client Marquee */}
      <ClientMarquee direction="right" />
     
    </div>
  );
}
