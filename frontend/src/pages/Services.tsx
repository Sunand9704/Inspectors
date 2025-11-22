
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
  const { translations, currentLanguage } = useTranslation();
  const hero = translations?.pages?.services?.hero;
  const servicesOverview = (translations as any)?.pages?.services?.servicesOverview;

  // Hero slide titles & descriptions for all languages
  const heroSlidesByLanguage: Record<
    string,
    Array<{ title: string; description: string }>
  > = {
    en: [
      {
        title: hero?.title || 'Inspectors 360°',
        description:
          hero?.description ||
          'We provide global workforce, staffing, and technical support solutions, delivering certified professionals and equipment to ensure safety, compliance, and performance across Oil & Gas, Mining, and Industrial sectors.',
      },
      {
        title: "Expert's",
        description:
          'We believe inspection is more than compliance—it is the backbone of safety, reliability, and operational success. By combining expert people, precision tools, and strong global support, we ensure our clients achieve excellence in every project.',
      },
      {
        title: 'Equipment',
        description:
          'We provide a complete range of Mechanical, Electrical, Instrumentation, NDT, and Safety equipment, along with certified tools for inspections, audits, and industrial operations. Our services also cover import and export of specialized equipment and reliable working tools for Oil & Gas, Mining, FPSO/FSO, and Industrial projects worldwide.',
      },
      {
        title: 'Experience',
        description:
          "INSPECTORS 360 is a trusted global partner in recruitment, contract staffing, payroll, HR, and technical support for the world’s most demanding industries.",
      },
    ],
    fr: [
      {
        title: hero?.title || 'Services de tests, d’inspection et de certification de premier plan',
        description:
          hero?.description ||
          'Nous garantissons la sécurité, la fiabilité et la durabilité des industries grâce à des services complets de tests, d’inspection, de certification et de conseil.',
      },
      {
        title: 'Expertise',
        description:
          "Nous pensons que l’inspection va bien au-delà de la conformité : elle est la colonne vertébrale de la sécurité, de la fiabilité et de la performance opérationnelle. En combinant des experts qualifiés, des outils de précision et un solide soutien mondial, nous permettons à nos clients d’atteindre l’excellence sur chaque projet.",
      },
      {
        title: 'Équipement',
        description:
          "Nous fournissons une gamme complète d’équipements mécaniques, électriques, d’instrumentation, de CND et de sécurité, ainsi que des outils certifiés pour les inspections, audits et opérations industrielles. Nos services couvrent également l’importation et l’exportation d’équipements spécialisés et d’outils de travail fiables pour les projets pétroliers et gaziers, miniers, FPSO/FSO et industriels dans le monde entier.",
      },
      {
        title: 'Expérience',
        description:
          "INSPECTORS 360 est un partenaire mondial de confiance pour le recrutement, l’intérim, la paie, les ressources humaines et le support technique dans les industries les plus exigeantes au monde.",
      },
    ],
    pt: [
      {
        title: hero?.title || 'Líder em serviços de teste, inspeção e certificação',
        description:
          hero?.description ||
          'Garantimos segurança, confiabilidade e sustentabilidade em diversos setores com serviços completos de teste, inspeção, certificação e consultoria.',
      },
      {
        title: 'Especialistas',
        description:
          'Acreditamos que a inspeção é mais do que conformidade — é a espinha dorsal da segurança, confiabilidade e sucesso operacional. Combinando profissionais experientes, ferramentas de precisão e forte suporte global, garantimos que nossos clientes alcancem excelência em cada projeto.',
      },
      {
        title: 'Equipamentos',
        description:
          'Oferecemos uma linha completa de equipamentos mecânicos, elétricos, de instrumentação, END e segurança, juntamente com ferramentas certificadas para inspeções, auditorias e operações industriais. Nossos serviços também abrangem importação e exportação de equipamentos especializados e ferramentas de trabalho confiáveis para projetos de Óleo & Gás, Mineração, FPSO/FSO e indústrias em todo o mundo.',
      },
      {
        title: 'Experiência',
        description:
          'A INSPECTORS 360 é uma parceira global confiável em recrutamento, contratação temporária, folha de pagamento, RH e suporte técnico para as indústrias mais exigentes do mundo.',
      },
    ],
    es: [
      {
        title: hero?.title || 'Líder en servicios de prueba, inspección y certificación',
        description:
          hero?.description ||
          'Garantizamos la seguridad, la fiabilidad y la sostenibilidad en múltiples sectores con servicios integrales de prueba, inspección, certificación y consultoría.',
      },
      {
        title: 'Expertos',
        description:
          'Creemos que la inspección es más que cumplimiento: es la base de la seguridad, la fiabilidad y el éxito operativo. Al combinar personal experto, herramientas de precisión y un sólido apoyo global, ayudamos a nuestros clientes a lograr la excelencia en cada proyecto.',
      },
      {
        title: 'Equipos',
        description:
          'Proporcionamos una gama completa de equipos mecánicos, eléctricos, de instrumentación, END y de seguridad, junto con herramientas certificadas para inspecciones, auditorías y operaciones industriales. Nuestros servicios también incluyen la importación y exportación de equipos especializados y herramientas de trabajo fiables para proyectos de petróleo y gas, minería, FPSO/FSO e industriales en todo el mundo.',
      },
      {
        title: 'Experiencia',
        description:
          'INSPECTORS 360 es un socio global de confianza en reclutamiento, contratación temporal, nómina, RR. HH. y soporte técnico para las industrias más exigentes del mundo.',
      },
    ],
    ru: [
      {
        title: hero?.title || 'Лидер в области испытаний, инспекции и сертификации',
        description:
          hero?.description ||
          'Мы обеспечиваем безопасность, надежность и устойчивое развитие отраслей благодаря комплексным услугам по испытаниям, инспекции, сертификации и консультированию.',
      },
      {
        title: 'Эксперты',
        description:
          'Мы считаем, что инспекция — это не только соответствие требованиям, но и основа безопасности, надежности и операционного успеха. Объединяя опытных специалистов, точные инструменты и сильную глобальную поддержку, мы помогаем нашим клиентам достигать высокого качества на каждом проекте.',
      },
      {
        title: 'Оборудование',
        description:
          'Мы предоставляем полный спектр механического, электрического, контрольно‑измерительного, НК и защитного оборудования, а также сертифицированные инструменты для инспекций, аудитов и промышленных операций. Наши услуги включают импорт и экспорт специализированного оборудования и надежных рабочих инструментов для проектов в нефтегазовой отрасли, горнодобывающей промышленности, FPSO/FSO и других промышленных объектов по всему миру.',
      },
      {
        title: 'Опыт',
        description:
          'INSPECTORS 360 — надежный глобальный партнер по подбору персонала, контрактному найму, расчету заработной платы, HR‑сопровождению и технической поддержке для самых требовательных отраслей мира.',
      },
    ],
    zh: [
      {
        title: hero?.title || '领先的测试、检验与认证服务',
        description:
          hero?.description ||
          '我们通过全面的测试、检验、认证和咨询服务，帮助各行业提升安全性、可靠性和可持续发展能力。',
      },
      {
        title: '专家',
        description:
          '我们认为检验不仅仅是合规要求，而是保障安全、可靠性和运营成功的基础。通过结合专业人才、精准工具以及全球支持网络，我们帮助客户在每一个项目中实现卓越表现。',
      },
      {
        title: '设备',
        description:
          '我们提供全系列的机械、电气、仪表、无损检测和安全设备，以及经过认证的工具，用于各类检验、审核和工业运营。我们的服务还涵盖专业设备和可靠工器具的进出口，适用于全球油气、矿业、FPSO/FSO以及各类工业项目。',
      },
      {
        title: '经验',
        description:
          'INSPECTORS 360 是全球值得信赖的合作伙伴，提供招聘、合同用工、薪资管理、人力资源以及技术支持服务，服务于全球最具挑战性的行业。',
      },
    ],
  };

  const heroSlides =
    heroSlidesByLanguage[currentLanguage] || heroSlidesByLanguage.en;
  const heroSlideTitles = heroSlides.map((s) => s.title);
  const heroSlideDescriptions = heroSlides.map((s) => s.description);

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
        title={heroSlides[0]?.title || hero?.title || "Inspectors 360°"}
        subtitle={hero?.subtitle || "Trusted Worldwide"}
        description={heroSlides[0]?.description || hero?.description || "We provide global workforce, staffing, and technical support solutions, delivering certified professionals and equipment to ensure safety, compliance, and performance across Oil & Gas, Mining, and Industrial sectors."}
        slideTitles={heroSlideTitles}
        slideDescriptions={heroSlideDescriptions}
        primaryCTA={{
          text: hero?.primaryCTAText || "Explore Services",
          href: "#services"
        }}
        secondaryCTA={{
          text: hero?.secondaryCTAText || "Get Quote",
          href: "/contact#contact-form"
        }}
        autoPlaySeconds={5}
        videoUrls={[
          // First video is the current one; the rest can be replaced with new URLs later
          'https://res.cloudinary.com/docyipoze/video/upload/v1763629708/first_video_m6exmg.mp4',
          'https://res.cloudinary.com/docyipoze/video/upload/v1763745859/second_igtujy.mp4',
          'https://res.cloudinary.com/docyipoze/video/upload/v1763746701/third_iwvcry.mp4',
          'https://res.cloudinary.com/docyipoze/video/upload/v1763747142/fourth_vbh63c.mp4',
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
