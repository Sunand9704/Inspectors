import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { SectionDto, getPageWithSections } from '@/utils/api';
import { useTranslation } from '@/contexts/TranslationContext';

// Props interface for ServiceDetail
interface ServiceDetailProps {
  sectionData?: SectionDto;
  serviceType?: string;
  serviceDisplayName?: string;
}

// Lightweight Markdown-like parser supporting H1/H2/H3, paragraphs and bullets
function parseContentToBlocks(raw: string): Array<{ type: string; content: JSX.Element; props?: any }> {
  const lines = raw.replace(/\r\n/g, '\n').split('\n');
  const blocks: Array<{ type: string; content: JSX.Element; props?: any }> = [];
  let paragraphBuffer: string[] = [];
  let listBuffer: string[] = [];

  const flushParagraph = () => {
    if (paragraphBuffer.length > 0) {
      const text = paragraphBuffer.join(' ').trim();
      if (text) {
        blocks.push({
          type: 'p',
          content: (
            <div key={`p-${blocks.length}`} className="prose prose-lg prose-slate max-w-none mb-4 text-muted-foreground leading-relaxed">
              <p className="text-base md:text-lg leading-6 text-gray-700 dark:text-gray-300">{text}</p>
            </div>
          )
        });
      }
      paragraphBuffer = [];
    }
  };

  const flushList = () => {
    if (listBuffer.length > 0) {
      blocks.push({
        type: 'ul',
        content: (
          <ul key={`ul-${blocks.length}`} className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            {listBuffer.map((li, i) => (
              <li key={i}>{li}</li>
            ))}
          </ul>
        )
      });
      listBuffer = [];
    }
  };

  const startNewBlock = () => {
    flushParagraph();
    flushList();
  };

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      // Blank line separates blocks
      startNewBlock();
      return;
    }

    // Bullets: -, *, •, – or numbered like 1.
    if (/^(\-|\*|•|–)\s+/.test(trimmed)) {
      flushParagraph();
      const bulletContent = trimmed.replace(/^(\-|\*|•|–)\s+/, '');
      
      // Check if bullet content starts with **text** pattern
      const boldMatch = bulletContent.match(/^\*\*(.*?)\*\*:?\s*(.*)$/);
      if (boldMatch) {
        // Treat as a heading instead of a bullet point
        const headingText = boldMatch[1].trim();
        const remainingText = boldMatch[2].trim();
        const Tag = 'h3' as keyof JSX.IntrinsicElements;
        const sizeClass = 'text-xl md:text-2xl';
        blocks.push({
          type: 'h3',
          content: (
            <Tag key={`h-${blocks.length}`} className={`${sizeClass} font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3`}>
              {headingText}
            </Tag>
          ),
          props: { children: headingText }
        });
        
        // If there's remaining text after the heading, add it as a paragraph
        if (remainingText) {
          blocks.push({
            type: 'p',
            content: (
              <div key={`p-${blocks.length}`} className="prose prose-lg prose-slate max-w-none mb-4 text-muted-foreground leading-relaxed">
                <p className="text-base md:text-lg leading-6 text-gray-700 dark:text-gray-300">{remainingText}</p>
              </div>
            )
          });
        }
        return;
      }
      
      listBuffer.push(bulletContent);
      return;
    }
    if (/^\d+\.[\)\.]?\s+/.test(trimmed)) {
      flushParagraph();
      const bulletContent = trimmed.replace(/^\d+\.[\)\.]?\s+/, '');
      
      // Check if bullet content starts with **text** pattern
      const boldMatch = bulletContent.match(/^\*\*(.*?)\*\*:?\s*(.*)$/);
      if (boldMatch) {
        // Treat as a heading instead of a bullet point
        const headingText = boldMatch[1].trim();
        const remainingText = boldMatch[2].trim();
        const Tag = 'h4' as keyof JSX.IntrinsicElements;
        const sizeClass = 'text-xl md:text-2xl';
        blocks.push({
          type: 'h3',
          content: (
            <Tag key={`h-${blocks.length}`} className={`${sizeClass} font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3`}>
              {headingText}
            </Tag>
          ),
          props: { children: headingText }
        });
        
        // If there's remaining text after the heading, add it as a paragraph
        if (remainingText) {
          blocks.push({
            type: 'p',
            content: (
              <div key={`p-${blocks.length}`} className="prose prose-lg prose-slate max-w-none mb-4 text-muted-foreground leading-relaxed">
                <p className="text-base md:text-lg leading-6 text-gray-700 dark:text-gray-300">{remainingText}</p>
              </div>
            )
          });
        }
        return;
      }
      
      listBuffer.push(bulletContent);
      return;
    }

    // Headings: #, ##, ### or **text** patterns
    const hMatch = trimmed.match(/^(#{1,3})\s+(.*)$/);
    if (hMatch) {
      startNewBlock();
      const level = hMatch[1].length;
      const text = hMatch[2].trim();
      const Tag = (level === 1 ? 'h1' : level === 2 ? 'h2' : 'h3') as keyof JSX.IntrinsicElements;
      const sizeClass = level === 1 ? 'text-3xl md:text-4xl' : level === 2 ? 'text-2xl md:text-3xl' : 'text-xl md:text-2xl';
      blocks.push({
        type: level === 1 ? 'h1' : level === 2 ? 'h2' : 'h3',
        content: (
          <Tag key={`h-${blocks.length}`} className={`${sizeClass} font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3`}>
            {text}
          </Tag>
        ),
        props: { children: text }
      });
      return;
    }

    // Bold text as headings: **text** patterns
    const boldMatch = trimmed.match(/^\*\*(.*?)\*\*:?\s*$/);
    if (boldMatch) {
      startNewBlock();
      const text = boldMatch[1].trim();
      // Determine heading level based on context or use h3 as default
      const Tag = 'h3' as keyof JSX.IntrinsicElements;
      const sizeClass = 'text-xl md:text-2xl';
      blocks.push({
        type: 'h3',
        content: (
          <Tag key={`h-${blocks.length}`} className={`${sizeClass} font-semibold text-gray-900 dark:text-gray-100 mt-6 mb-3`}>
            {text}
          </Tag>
        ),
        props: { children: text }
      });
      return;
    }

    // Fallback: treat as paragraph text; will be merged until blank line
    paragraphBuffer.push(trimmed);
  });

  // Flush any remaining buffers
  startNewBlock();

  return blocks;
}

// Service type mapping for display names and routes
const serviceTypeMap: Record<string, { displayName: string; route: string }> = {
  'verification-certification': {
    displayName: 'Verification & Certification (VC)',
    route: '/services/verification-certification'
  },
  'testing': {
    displayName: 'Testing & Inspection',
    route: '/services/testing'
  },
  'inspection': {
    displayName: 'Inspection (I)',
    route: '/services/inspection'
  },
  'cbm': {
    displayName: 'Condition based Monitoring (CBM)',
    route: '/services/cbm'
  },
  'auditing': {
    displayName: 'Auditing (A)',
    route: '/services/auditing'
  },
  'innovation-rd': {
    displayName: 'Innovation & R&D',
    route: '/services/innovation-rd'
  }
};

export default function ServiceDetail({ sectionData, serviceType, serviceDisplayName }: ServiceDetailProps) {
  const { serviceType: urlServiceType, slug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { currentLanguage } = useTranslation();
  const prevLanguageRef = useRef(currentLanguage);
  
  // Get service info from props or URL params
  const currentServiceType = serviceType || urlServiceType;
  const serviceInfo = currentServiceType ? serviceTypeMap[currentServiceType] : null;
  const displayName = serviceDisplayName || serviceInfo?.displayName || 'Service';
  const serviceRoute = serviceInfo?.route || '/services';
  
  // Get section data from props or location state
  const initialSection = sectionData || (location.state as any)?.sectionData || null;
  const [section, setSection] = useState<SectionDto | null>(initialSection);

  // Fallback fetch: when opened via /services/:slug, load the correct page (service type) and find the section
  useEffect(() => {
    const toSlug = (text: string) => String(text).toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
    let isMounted = true;
    const load = async () => {
      if (section || !slug) return;
      try {
        // Determine which page to load: use the current service type if available; otherwise fallback to 'services'
        const pageSlug = currentServiceType || 'services';
        const page = await getPageWithSections(pageSlug, undefined, currentLanguage);
        const match = (page.sections || []).find((s) =>
          s.sectionId === slug || toSlug(s.title) === String(slug).toLowerCase()
        );
        if (isMounted) setSection(match || null);
      } catch {
        if (isMounted) setSection(null);
      }
    };
    load();
    return () => { isMounted = false; };
  }, [slug, currentLanguage, section, currentServiceType]);

  // Redirect to parent page when language changes
  useEffect(() => {
    // Only redirect if language actually changed and we have a valid service route
    if (prevLanguageRef.current !== currentLanguage && serviceRoute && serviceRoute !== '/services') {
      navigate(serviceRoute, { replace: true });
    }
    // Update the ref to current language
    prevLanguageRef.current = currentLanguage;
  }, [currentLanguage, serviceRoute, navigate]);

  // Validation
  // In the simplified 7-services setup, allow direct /services/:slug access as well

  if (!section) {
    return (
      <div className="section">
        <div className="container-responsive text-center">
          <p className="text-muted-foreground mb-6">{displayName} item not found.</p>
          <Button asChild>
            <Link to={serviceRoute}>Back to {displayName}</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="section pb-0">
        <div className="container-responsive">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/services">Services</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={serviceRoute}>{displayName}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`${serviceRoute}/${slug}`}>
                  {section?.title || 'Detail'}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      {/* Content + images arranged with diagonal layout */}
      <section className="section pt-0">
        <div className="container-responsive max-w-5xl mx-auto">
          {(() => {
            const content = section?.bodyText || '';
            let blocks = parseContentToBlocks(content);
            // Remove duplicate top heading if it matches section title
            if (blocks.length > 0 && ['h1','h2','h3'].includes(blocks[0].type)) {
              const firstHeadingText = String(blocks[0].props?.children || '').trim().toLowerCase();
              const sectionTitleText = String(section?.title || '').trim().toLowerCase();
              if (firstHeadingText && sectionTitleText && firstHeadingText === sectionTitleText) {
                blocks = blocks.slice(1);
              }
            }
            const imageUrls = Array.isArray(section?.images) ? section!.images : [];

            // Extract the first heading to place before the first image
            const headingIndex = blocks.findIndex(b => ['h1','h2','h3'].includes(b.type));
            const headingEl = headingIndex >= 0 ? <div key="first-heading">{blocks[headingIndex].content}</div> : null;
            const bodyBlocks = headingIndex >= 0 ? blocks.filter((_, i) => i !== headingIndex) : blocks;

            if (imageUrls.length >= 1) {
              // Build elements array with diagonal image layout
              const elements: JSX.Element[] = [];
              
              // Add first heading if it exists
              if (headingEl) {
                elements.push(headingEl);
              }
              
              // Add first image after first heading
              elements.push(
                <div key="img-0" className="overflow-hidden my-6">
                  <img 
                    src={imageUrls[0]} 
                    alt={`${section?.title || 'Service'} 1`} 
                    className="w-full h-64 md:h-80 object-cover rounded-2xl" 
                  />
                </div>
              );

              // Distribute remaining images and content blocks in diagonal pattern
              let imageIndex = 1;
              // Calculate spacing: distribute images evenly through content
              const itemsPerImage = imageUrls.length > 1 && bodyBlocks.length > 0 
                ? Math.ceil(bodyBlocks.length / (imageUrls.length - 1)) 
                : bodyBlocks.length + 1; // Prevent division by zero

              bodyBlocks.forEach((b, i) => {
                elements.push(<div key={`blk-${i}`}>{b.content}</div>);
                
                // Insert images at intervals to create diagonal effect
                // Alternate between left and right margins for staggered/diagonal appearance
                if (imageIndex < imageUrls.length && itemsPerImage > 0 && (i + 1) % itemsPerImage === 0) {
                  const isEven = imageIndex % 2 === 0;
                  elements.push(
                    <div 
                      key={`img-${imageIndex}`} 
                      className={`overflow-hidden my-6 ${isEven ? 'md:ml-16 lg:ml-24' : 'md:mr-16 lg:mr-24'}`}
                    >
                      <img 
                        src={imageUrls[imageIndex]} 
                        alt={`${section?.title || 'Service'} ${imageIndex + 1}`} 
                        className="w-full h-64 md:h-80 object-cover rounded-2xl" 
                      />
                    </div>
                  );
                  imageIndex++;
                }
              });

              // Add any remaining images at the end with diagonal pattern
              while (imageIndex < imageUrls.length) {
                const isEven = imageIndex % 2 === 0;
                elements.push(
                  <div 
                    key={`img-${imageIndex}`} 
                    className={`overflow-hidden my-6 ${isEven ? 'md:ml-16 lg:ml-24' : 'md:mr-16 lg:mr-24'}`}
                  >
                    <img 
                      src={imageUrls[imageIndex]} 
                      alt={`${section?.title || 'Service'} ${imageIndex + 1}`} 
                      className="w-full h-64 md:h-80 object-cover rounded-2xl" 
                    />
                  </div>
                );
                imageIndex++;
              }

              return (
                <div className="flex flex-col gap-4">
                  <div className="space-y-4 md:px-4">
                    {elements}
                  </div>
                </div>
              );
            }

            // No images - just render content
            return (
              <div className="space-y-4 md:px-4">
                {blocks.map((b, i) => (<div key={i}>{b.content}</div>))}
              </div>
            );
          })()}
        </div>
      </section>

    </div>
  );
}
