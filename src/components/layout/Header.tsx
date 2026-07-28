'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { cn } from '@/lib/utils';
import { NAV_ITEMS, SITE } from '@/lib/constants';

/**
 * Header — Navbar responsiva com mudança ao scroll.
 * Mobile menu com AnimatePresence.
 * Scroll detection para efeito de glass/blur ao descer.
 */
export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
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

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-header transition-all duration-300',
        isScrolled
          ? 'border-b border-border bg-background/80 backdrop-blur-xl'
          : 'bg-transparent',
      )}
    >
      <Container>
        <nav className="flex items-center justify-between py-4">
          {/* Logo / Name */}
          <a
            href="#hero"
            className="font-display text-lg font-bold tracking-tight text-foreground"
          >
            {SITE.name.split(' ')[0]}
            <span className="text-accent">.</span>
          </a>

          {/* Desktop Nav */}
          <ul className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="relative text-sm text-muted transition-colors hover:text-foreground"
                >
                  {item.label}
                </a>
              </li>
            ))}
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
                <motion.a
                  key={item.href}
                  href={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-display text-2xl font-bold text-foreground transition-colors hover:text-accent"
                >
                  {item.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
