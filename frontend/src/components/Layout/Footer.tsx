
import { Link } from 'react-router-dom';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Linkedin, 
  Facebook, 
  Youtube,
  ArrowRight
} from 'lucide-react';
import Logo from '@/components/Common/Logo';
import { useEffect, useState, useRef } from 'react';
import { getPageWithSections, type SectionDto } from '@/utils/api';
import { footerIndustryItems, footerServiceItems } from '@/data/footerLists';

export function Footer() {
  const [logoWidth, setLogoWidth] = useState<number | null>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const [servicesList, setServicesList] = useState<{ title: string; link: string }[]>([]);

  useEffect(() => {
    const updateLogoWidth = () => {
      if (logoRef.current) {
        // Measure the full logo width including the 360° circle
        const logoContainer = logoRef.current;
        const fullWidth = logoContainer.offsetWidth;
        setLogoWidth(fullWidth);
      }
    };

    // Use a small delay to ensure logo is rendered
    const timer = setTimeout(updateLogoWidth, 100);
    // Also try after a longer delay to catch any async rendering
    const timer2 = setTimeout(updateLogoWidth, 500);
    updateLogoWidth();
    window.addEventListener('resize', updateLogoWidth);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
      window.removeEventListener('resize', updateLogoWidth);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const page = await getPageWithSections('services');
        if (!isMounted) return;
        const sections: SectionDto[] = page.sections || [];
        const toSlug = (text: string) => String(text).toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim().replace(/\s+/g, '-');
        // Map to title and detail link, keep order, limit to 7
        const mapped = sections.slice(0, 7).map((s) => ({
          title: s.title,
          link: `/services/${s.sectionId || toSlug(s.title)}`,
        }));
        setServicesList(mapped);
      } catch {
        if (isMounted) setServicesList([]);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  return (
    <footer className="bg-tuv-gray-900 text-white">
      <div className="container-responsive">
        {/* Main Footer Content */}
        <div className="py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="flex flex-col items-center gap-2 mb-6">
                <div className="relative inline-block">
                  <div ref={logoRef} className="inline-block">
                    <Logo height={38} withLink />
                  </div>
                  {/* Taglines aligned under INS, SPEC, TORS - matching exact logo layout */}
                  {logoWidth !== null && (
                    <div className="mt-2.5 relative" style={{ width: `${logoWidth}px` }}>
                      <div className="flex items-center justify-between text-orange font-semibold uppercase text-[0.7rem] leading-tight" style={{ 
                        fontFamily: 'inherit',
                        letterSpacing: '0.02em'
                      }}>
                        <span>Expert's</span>
                        <span>Equipment</span>
                        <span>Experience</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <p className="text-tuv-gray-400 mb-6 leading-relaxed text-center">
                Trusted provider of skilled manpower,
                recruitment, and staffing solutions and
                equipment's across industries. Dedicated
                to quality, reliability, and operational excellence.
                Committed to empowering businesses with
                the right talent - ensuring growth, safety, and
                performance worldwide.
              </p>
              <div className="flex space-x-4">
                <a href="https://www.linkedin.com/company/109967214/admin/page-posts/published/" className="text-tuv-gray-400 hover:text-white transition-colors">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="https://x.com/Inspectors360" className="text-tuv-gray-400 hover:text-white transition-colors">
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-label="X (formerly Twitter)">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
                <a href="#" className="text-tuv-gray-400 hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="https://www.youtube.com/channel/UCpc1DphEdy5h2S1RRoFhMFQ" className="text-tuv-gray-400 hover:text-white transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">
                Services
              </h3>
              <ul className="space-y-4">
                {(servicesList.length > 0 ? servicesList : footerServiceItems.map(({ label, link }) => ({
                  title: label,
                  link,
                }))).map((service, index) => (
                  <li key={index}>
                    <Link 
                      to={service.link} 
                      className="text-tuv-gray-400 hover:text-white transition-colors flex items-center group"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 group-hover:translate-x-0" />
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Industries */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">
                Industries
              </h3>
              <ul className="space-y-4">
                {footerIndustryItems.map((industry, index) => (
                  <li key={index}>
                    <Link 
                      to={industry.link} 
                      className="text-tuv-gray-400 hover:text-white transition-colors flex items-center group"
                    >
                      <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-all duration-200 -translate-x-2 group-hover:translate-x-0" />
                      {industry.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-6 text-white">
                Contact
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-tuv-gray-400 mt-1 flex-shrink-0" />
                  <div className="text-tuv-gray-400">
                    <p className="font-semibold text-white mb-1">INSPECTORS 360 -UK</p>
                    <p>77 Denyer St, London SW3 2NY, United Kingdom</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-tuv-gray-400" />
                  <span className="text-tuv-gray-400">
                    +44 7934 980214
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-tuv-gray-400" />
                  <div className="text-tuv-gray-400">
                    <p>
                      <a href="mailto:contact@inspectors360.com" className="hover:text-white transition-colors">
                        contact@inspectors360.com
                      </a>
                    </p>
                    <p>
                      <a href="mailto:info@inspectors360.com" className="hover:text-white transition-colors">
                        info@inspectors360.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Newsletter */}
              <div className="mt-8">
                <h4 className="text-sm font-semibold mb-4 text-white">
                  Stay Updated
                </h4>
                <div className="flex">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 rounded-l-md border-0 text-tuv-gray-900"
                  />
                  <button className="bg-primary hover:bg-primary-hover px-4 py-2 rounded-r-md transition-colors">
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-tuv-gray-700 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="text-tuv-gray-400 text-sm">
              © 2024 INSPECTORS. All rights reserved.
            </div>
            <div className="flex flex-wrap items-center space-x-6 text-sm">
              <Link to="#" className="text-tuv-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="#" className="text-tuv-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="#" className="text-tuv-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
              <Link to="#" className="text-tuv-gray-400 hover:text-white transition-colors">
                Legal Notice
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
