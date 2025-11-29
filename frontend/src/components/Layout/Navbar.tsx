
import { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Phone, Mail, Globe, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTranslation } from '@/contexts/TranslationContext';
import Logo from '@/components/Common/Logo';
import { SITE_PHONE_DISPLAY } from '@/config/site';

const languages = [
  { code: 'en', name: 'English', countryCode: 'us' },
  { code: 'fr', name: 'Français', countryCode: 'fr' },
  { code: 'pt', name: 'Português', countryCode: 'pt' },
  { code: 'es', name: 'Español', countryCode: 'es' },
  { code: 'ru', name: 'Русский', countryCode: 'ru' },
  { code: 'zh', name: '中文', countryCode: 'cn' },
];

// Flag component with fallback to emoji
const FlagIcon = ({ countryCode, className = "w-5 h-4" }: { countryCode: string; className?: string }) => {
  const [imgError, setImgError] = useState(false);
  const emojiMap: { [key: string]: string } = {
    'us': '🇺🇸',
    'fr': '🇫🇷',
    'pt': '🇵🇹',
    'es': '🇪🇸',
    'ru': '🇷🇺',
    'cn': '🇨🇳',
  };

  if (imgError) {
    return <span className={className}>{emojiMap[countryCode] || '🏳️'}</span>;
  }

  return (
    <img
      src={`https://flagcdn.com/w20/${countryCode}.png`}
      alt={`${countryCode} flag`}
      className={className}
      onError={() => setImgError(true)}
    />
  );
};

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [logoWidth, setLogoWidth] = useState<number | null>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const { 
    currentLanguage, 
    translations, 
    isLoading, 
    error, 
    changeLanguage 
  } = useTranslation();

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

  const selectedLanguage = languages.find(lang => lang.code === currentLanguage) || languages[0];

  const handleLanguageChange = async (language: typeof languages[0]) => {
    try {
      await changeLanguage(language.code);
      console.log(`Language changed to: ${language.name} (${language.code})`);
    } catch (err) {
      console.error('Failed to change language:', err);
    }
  };

  // Get translated navigation items
  const getNavigationItems = () => {
    if (!translations) return [];

    return [
      { name: translations.navbar.services, href: '/services' },
      { name: translations.navbar.industries, href: '/industries' },
      { name: translations.navbar.about, href: '/about' },
      // Some locales define "vacancies" instead of "careers"
      { name: (translations.navbar as any).vacancies || (translations.navbar as any).careers || 'Vacancies', href: '/vacancies' },
      // Some locales may not have "blog"
      { name: (translations.navbar as any).blog || 'Blog', href: '/blog' },
    ];
  };

  const navigation = getNavigationItems();

  return (
    <>
      {/* Top Bar */}
      <div className="bg-tuv-gray-900 text-white py-2 hidden lg:block">
        <div className="container-responsive">
          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>{SITE_PHONE_DISPLAY}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>info@inspectors360.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-tuv-gray-400">
                Trusted Worldwide | International Standards
              </div>
              {/* Desktop Language Selector */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-tuv-gray-400 hover:text-white hover:bg-tuv-gray-800 h-8 px-3"
                    disabled={isLoading}
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    <FlagIcon countryCode={selectedLanguage.countryCode} className="w-4 h-3 mr-1" />
                    <span className="text-xs">{selectedLanguage.code.toUpperCase()}</span>
                    {isLoading ? (
                      <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin ml-1" />
                    ) : (
                      <ChevronDown className="h-3 w-3 ml-1" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {languages.map((language) => (
                    <DropdownMenuItem
                      key={language.code}
                      onClick={() => handleLanguageChange(language)}
                      className={`flex items-center space-x-3 cursor-pointer ${
                        selectedLanguage.code === language.code
                          ? 'bg-primary/10 text-primary'
                          : ''
                      }`}
                      disabled={isLoading}
                    >
                      <FlagIcon countryCode={language.countryCode} className="w-5 h-4" />
                      <span className="text-sm font-medium">{language.code.toUpperCase()}</span>
                      <span className="flex-1">{language.name}</span>
                      {selectedLanguage.code === language.code && (
                        <div className="w-2 h-2 bg-primary rounded-full" />
                      )}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="bg-white shadow-tuv-sm sticky top-0 z-50">
        <div className="container-responsive">
          <div className="relative flex items-center py-2 lg:py-3 min-h-[80px]">
            {/* Logo with Tags */}
            <div className="inline-flex flex-col gap-2">
              <div className="relative inline-block">
                <div ref={logoRef} className="inline-block">
                  <Logo height={40} withLink />
                </div>
                {/* Taglines aligned under INS, SPEC, TORS - matching exact logo layout */}
                {logoWidth !== null && (
                  <div className="mt-2.5 relative" style={{ width: `${logoWidth}px` }}>
                    <div className="flex items-center justify-between text-black font-semibold uppercase text-[0.7rem] leading-tight" style={{ 
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

            {/* Desktop Navigation - Centered */}
            <div className="hidden lg:flex items-center space-x-8 absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
              {navigation.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.href}
                  className={({ isActive }) =>
                    `nav-link ${isActive ? 'nav-link-active' : ''}`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>

            {/* CTA Buttons - Right side */}
            <div className="hidden lg:flex items-center space-x-4 ml-auto">
              <Button className="btn-primary" asChild>
                <Link to="/contact">
                  {translations?.navbar.contactUs || 'Contact Us'}
                </Link>
              </Button>
              <Button className="btn-primary" asChild>
                <Link to="/contact#contact-form">
                  {translations?.navbar.getQuote || 'Get Quote'}
                </Link>
              </Button>
              <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50 hover:text-orange-700" asChild>
                <Link to="/verify-documents">
                  Verify Documents
                </Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <div className="lg:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(!isOpen)}
                className="p-2"
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden bg-white border-t border-border">
            <div className="container-responsive py-4">
              <div className="flex flex-col space-y-4">
                {navigation.map((item, index) => (
                  <NavLink
                    key={index}
                    to={item.href}
                    className={({ isActive }) =>
                      `nav-link ${isActive ? 'nav-link-active' : ''} py-2`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                ))}
                
                {/* Mobile Language Selector */}
                <div className="pt-4 border-t border-border">
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-700 mb-3">Language</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {languages.map((language) => (
                        <button
                          key={language.code}
                          onClick={() => {
                            handleLanguageChange(language);
                            setIsOpen(false);
                          }}
                          disabled={isLoading}
                          className={`flex items-center space-x-2 p-3 rounded-lg border transition-colors ${
                            selectedLanguage.code === language.code
                              ? 'border-primary bg-primary/5 text-primary'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                          <FlagIcon countryCode={language.countryCode} className="w-5 h-4" />
                          <span className="text-xs font-medium">{language.code.toUpperCase()}</span>
                          <span className="text-sm font-medium">{language.name}</span>
                          {isLoading && selectedLanguage.code === language.code && (
                            <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <Button className="btn-primary" asChild>
                      <Link to="/contact#contact-form" onClick={() => setIsOpen(false)}>
                        {translations?.navbar.getQuote || 'Get Quote'}
                      </Link>
                    </Button>
                    <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50 hover:text-orange-700" asChild>
                      <Link to="/verify-documents" onClick={() => setIsOpen(false)}>
                        Verify Documents
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Error Toast */}
      {error && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg z-50">
          {error}
        </div>
      )}
    </>
  );
}
