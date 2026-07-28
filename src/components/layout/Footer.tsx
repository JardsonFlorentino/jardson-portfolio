import { Github, Linkedin, Mail } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { SITE, SOCIAL } from '@/lib/constants';

/**
 * Footer — Server Component.
 * Links sociais, copyright, navegação.
 */
export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-12">
      <Container>
        <div className="flex flex-col items-center gap-6 md:flex-row md:justify-between">
          {/* Copyright */}
          <p className="text-sm text-muted">
            &copy; {currentYear} {SITE.name}. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${SITE.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-2 text-muted transition-colors hover:text-foreground"
              aria-label="Email"
            >
              <Mail size={18} />
            </a>
            <a
              href={SOCIAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-2 text-muted transition-colors hover:text-foreground"
              aria-label="GitHub"
            >
              <Github size={18} />
            </a>
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full p-2 text-muted transition-colors hover:text-foreground"
              aria-label="LinkedIn"
            >
              <Linkedin size={18} />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
