'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useLenis } from 'lenis/react';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/utils';
import { NAV_ITEMS, SITE } from '@/lib/constants';

/**
 * Header — Navbar responsiva com mudança ao scroll.
 * - Scroll detection para efeito glass/blur
 * - Navegação smooth via Lenis
 * - Mobile menu com AnimatePresence
 * - Underline animado nos links (hover)
 */
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const lenis = useLenis();

  // Scroll detection + active section tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      // Detect active section
      const sections = NAV_ITEMS.map((item) => item.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollY + 200) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll on mobile menu open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Smooth scroll to section
  const scrollTo = useCallback(
    (href: string) => {
      const id = href.replace('#', '');
      const el = document.getElementById(id);
      if (el && lenis) {
        lenis.scrollTo(el, {
          offset: -80, // header height offset
          duration: 1.2,
          immediate: false,
          lock: true,
        });
      }
      setIsMobileMenuOpen(false);
    },
    [lenis],
  );

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-header transition-all duration-300',
        isScrolled
          ? 'border-b border-border bg-glass backdrop-blur-xl'
          : 'bg-transparent',
      )}
    >
      <Container>
        <nav className="flex items-center justify-between py-4">
          {/* Logo / Name */}
          <button
            onClick={() => scrollTo('#hero')}
            className="font-display text-lg font-bold tracking-tight text-foreground transition-opacity hover:opacity-80"
          >
            {SITE.name.split(' ')[0]}
            <span className="text-accent">.</span>
          </button>

          {/* Desktop Nav */}
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <li key={item.href}>
                  <button
                    onClick={() => scrollTo(item.href)}
                    className={cn(
                      'group relative text-sm transition-colors',
                      isActive ? 'text-foreground' : 'text-muted hover:text-foreground',
                    )}
                  >
                    {item.label}
                    {/* Underline animado */}
                    <span
                      className={cn(
                        'absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300',
                        isActive ? 'w-full' : 'w-0 group-hover:w-full',
                      )}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="relative z-overlay md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </Container>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[57px] z-50 bg-background/95 backdrop-blur-xl"
          >
            <nav className="flex h-full flex-col items-center justify-center gap-8">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="font-display text-2xl font-bold text-foreground transition-colors hover:text-accent"
                >
                  {item.label}
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
