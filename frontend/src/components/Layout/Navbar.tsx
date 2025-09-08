
import { useState } from 'react';
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

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    currentLanguage, 
    translations, 
    isLoading, 
    error, 
    changeLanguage 
  } = useTranslation();

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
      { name: translations.navbar.careers, href: '/careers' },
      { name: translations.navbar.blog || 'Blog', href: '/blog' },
      { name: translations.navbar.contact, href: '/contact' },
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
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>contact@cbm.com</span>
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
                    <span className="mr-1">{selectedLanguage.flag}</span>
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
                      <span className="text-lg">{language.flag}</span>
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
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo */}
            <Link to="/services" className="flex items-center">
              <div className="text-2xl font-bold text-primary">
                CBM
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8">
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

            {/* CTA Button */}
            <div className="hidden lg:flex items-center space-x-4">
              <Button variant="outline" size="sm" asChild>
                <Link to="/contact">
                  {translations?.navbar.getQuote || 'Get Quote'}
                </Link>
              </Button>
              <Button className="btn-primary" asChild>
                <Link to="/contact">
                  {translations?.navbar.contactUs || 'Contact Us'}
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
                          <span className="text-lg">{language.flag}</span>
                          <span className="text-sm font-medium">{language.name}</span>
                          {isLoading && selectedLanguage.code === language.code && (
                            <div className="w-3 h-3 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <Button variant="outline" asChild>
                      <Link to="/contact" onClick={() => setIsOpen(false)}>
                        {translations?.navbar.getQuote || 'Get Quote'}
                      </Link>
                    </Button>
                    <Button className="btn-primary" asChild>
                      <Link to="/contact" onClick={() => setIsOpen(false)}>
                        {translations?.navbar.contactUs || 'Contact Us'}
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
