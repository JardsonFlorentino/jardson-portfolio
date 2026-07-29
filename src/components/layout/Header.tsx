'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLenis } from 'lenis/react';
import { Menu, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

import { Container } from '@/components/ui/Container';
import { NAV_ITEMS, SITE } from '@/lib/constants';
import { cn } from '@/lib/utils';


export function Header() {
  const t = useTranslations('nav');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const lenis = useLenis();

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    setIsScrolled(scrollY > 50);

    // Detecção da seção ativa
    let currentSection = 'hero';
    for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
      const item = NAV_ITEMS[i];
      const el = document.getElementById(item.href.replace('#', ''));
      if (el && el.offsetTop <= scrollY + 100) {
        currentSection = item.href.replace('#', '');
        break;
      }
    }
    setActiveSection(currentSection);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Checagem inicial
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const scrollTo = useCallback(
    (target: string) => {
      lenis?.scrollTo(target, {
        offset: -80, 
        duration: 1.5,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      setIsMobileMenuOpen(false);
    },
    [lenis],
  );

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-header transition-all duration-fast',
        isScrolled ? 'border-b border-border bg-glass backdrop-blur-lg' : 'bg-transparent',
      )}
    >
      <Container>
        <nav className="flex items-center justify-between py-4">
          <button
            onClick={() => scrollTo('#hero')}
            className="font-display text-lg font-semibold tracking-tight text-foreground transition-opacity hover:opacity-80"
            aria-label="Voltar ao início"
          >
            
            <Image
              src="/images/logo.png"
              alt={SITE.name}
              width={80} 
              height={28} 
              priority
            />
          </button>

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
                    {t(item.label)}
                    <span
                      className={cn(
                        'absolute -bottom-1 left-0 h-px bg-accent transition-all duration-fast',
                        isActive ? 'w-full' : 'w-0 group-hover:w-full',
                      )}
                    />
                  </button>
                </li>
              );
            })}
          </ul>

          <button
            className="relative z-overlay md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
          >
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={isMobileMenuOpen ? 'x' : 'menu'}
                initial={{ opacity: 0, rotate: -30, scale: 0.8 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 30, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </AnimatePresence>
          </button>
        </nav>
      </Container>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 top-16 z-50 bg-background/90 backdrop-blur-xl md:hidden"
          >
            <motion.nav
              className="flex h-full flex-col items-center justify-center gap-10"
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.08 }}
            >
              {NAV_ITEMS.map((item) => (
                <motion.button
                  key={item.href}
                  onClick={() => scrollTo(item.href)}
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0, transition: { ease: 'easeOut' } },
                  }}
                  className="font-display text-3xl font-bold text-foreground transition-colors hover:text-accent"
                >
                  {t(item.label)}
                </motion.button>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
