import { Link, useLocation, useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { getPageWithSections, PageDto, SectionDto } from '@/utils/api';
import { useTranslation } from '@/contexts/TranslationContext';

export default function IndustriesDetail() {
  const { slug } = useParams();
  const location = useLocation() as { state?: { section?: SectionDto } };
  const { currentLanguage } = useTranslation();
  const prevLanguageRef = useRef(currentLanguage);
  const [page, setPage] = useState<PageDto | null>(null);
  const [section, setSection] = useState<SectionDto | null>(location.state?.section || null);
  const [loading, setLoading] = useState<boolean>(!location.state?.section);

  // Redirect to parent page when language changes
  useEffect(() => {
    // Only redirect if language actually changed and we have a valid slug
    if (prevLanguageRef.current !== currentLanguage && slug) {
      window.location.href = '/industries';
    }
    // Update the ref to current language
    prevLanguageRef.current = currentLanguage;
  }, [currentLanguage, slug]);

  useEffect(() => {
    let isMounted = true;
    const load = async () => {
      if (!slug || section) return;
      try {
        setLoading(true);
        const p = await getPageWithSections('industries', undefined, currentLanguage);
        if (!isMounted) return;
        setPage(p);
        const target = p.sections?.find(s => s.sectionId === slug || s.title?.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-') === slug) || null;
        setSection(target);
      } catch (e) {
        // ignore
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    load();
    return () => {
      isMounted = false;
    };
  }, [slug, currentLanguage]);

  if (!slug) return null;

  if (loading) {
    return (
      <section className="section">
        <div className="container-responsive text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading industry details...</p>
        </div>
      </section>
    );
  }

  if (!section) {
    return (
      <section className="section">
        <div className="container-responsive text-center">
          <p className="text-muted-foreground mb-6">Industry item not found.</p>
          <Button asChild>
            <Link to="/industries">Back to Industries</Link>
          </Button>
        </div>
      </section>
    );
  }

  // Reuse the same lightweight parser used by ServiceDetail for consistent styling
  function parseContentToBlocks(raw: string): Array<{ type: string; content: JSX.Element }> {
    const lines = (raw || '').replace(/\r\n/g, '\n').split('\n');
    const blocks: Array<{ type: string; content: JSX.Element }> = [];
    let paragraphBuffer: string[] = [];

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

    const startNewBlock = () => {
      flushParagraph();
    };

    lines.forEach((line) => {
      const trimmed = line.trim();
      if (!trimmed) {
        startNewBlock();
        return;
      }
      // Headings: #, ##, ###
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
          )
        });
        return;
      }
      paragraphBuffer.push(trimmed);
    });

    startNewBlock();
    return blocks;
  }

  return (
    <div>
      <section className="section pb-0">
        <div className="container-responsive">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/industries">Industries</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/industries/${slug}`}>{section.title}</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </section>

      <section className="section pt-0">
        <div className="container-responsive max-w-5xl mx-auto">
          {(() => {
            const blocks = parseContentToBlocks(section.bodyText || '');
            const imageUrls = section.images || [];

            if (imageUrls.length >= 2) {
              return (
                <div className="flex flex-col gap-8">
                  <div className="overflow-hidden">
                    <img src={imageUrls[0]} alt={`${section.title} 1`} className="w-full h-64 md:h-80 object-cover rounded-2xl" />
                  </div>
                  <div className="space-y-4 md:px-4">
                    {blocks.map((b, i) => (<div key={i}>{b.content}</div>))}
                  </div>
                  <div className="overflow-hidden">
                    <img src={imageUrls[1]} alt={`${section.title} 2`} className="w-full h-64 md:h-80 object-cover rounded-2xl" />
                  </div>
                </div>
              );
            }

            if (imageUrls.length === 1) {
              return (
                <div className="flex flex-col gap-8">
                  <div className="overflow-hidden">
                    <img src={imageUrls[0]} alt={section.title} className="w-full h-64 md:h-80 object-cover rounded-2xl" />
                  </div>
                  <div className="space-y-4">
                    {blocks.map((b, i) => (<div key={i}>{b.content}</div>))}
                  </div>
                </div>
              );
            }

            return (
              <div className="space-y-4">
                {blocks.map((b, i) => (<div key={i}>{b.content}</div>))}
              </div>
            );
          })()}
        </div>
      </section>
    </div>
  );
}




