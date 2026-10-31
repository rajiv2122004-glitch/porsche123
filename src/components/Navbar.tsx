import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onOpenTestDrive: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenTestDrive }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);

      const sections = ['home', 'models', 'india-prices', 'experience', 'performance', 'heritage', 'test-drive'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'MODELS', href: '#models', id: 'models' },
    { label: 'INDIA PRICES', href: '#india-prices', id: 'india-prices' },
    { label: '3D EXPERIENCE', href: '#experience', id: 'experience' },
    { label: 'PERFORMANCE', href: '#performance', id: 'performance' },
    { label: 'HERITAGE', href: '#heritage', id: 'heritage' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#090a0d]/90 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl'
            : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element Brand wordmark */}
          <a
            href="#home"
            className="text-xl sm:text-2xl font-bold tracking-[0.28em] text-white uppercase transition-opacity hover:opacity-85 whitespace-nowrap shrink-0"
            style={{ fontFamily: "'Outfit', sans-serif" }}
          >
            PORSCHE
          </a>

          {/* Zone 2: Clean single-line text navigation links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold tracking-[0.16em] uppercase">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                className={`relative py-1 transition-colors whitespace-nowrap shrink-0 ${
                  activeSection === link.id
                    ? 'text-white font-bold'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#d50000]" />
                )}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action */}
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={onOpenTestDrive}
              className="px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-semibold tracking-[0.15em] uppercase text-white bg-[#d50000] hover:bg-[#b00000] active:scale-[0.98] transition-all whitespace-nowrap shadow-md cursor-pointer"
            >
              BOOK A TEST DRIVE
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-300 hover:text-white focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#090a0d]/95 backdrop-blur-xl lg:hidden pt-24 px-8 pb-10 flex flex-col justify-between">
          <div className="flex flex-col gap-6 text-sm tracking-[0.2em] font-semibold uppercase">
            <a
              href="#home"
              onClick={() => setMobileMenuOpen(false)}
              className="text-neutral-300 hover:text-white py-2 border-b border-white/10"
            >
              HOME
            </a>
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 border-b border-white/10 transition-colors ${
                  activeSection === link.id ? 'text-[#d50000] font-bold' : 'text-neutral-300 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="space-y-4 pt-6 border-t border-white/10">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenTestDrive();
              }}
              className="w-full py-3.5 text-xs font-bold tracking-[0.2em] uppercase text-white bg-[#d50000] hover:bg-[#b00000] transition-colors"
            >
              REQUEST A TEST DRIVE
            </button>
            <p className="text-center text-[11px] text-neutral-500 tracking-wider">
              Porsche India Concierge · 1800 102 9911
            </p>
          </div>
        </div>
      )}
    </>
  );
};
