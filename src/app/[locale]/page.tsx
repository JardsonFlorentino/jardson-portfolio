import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('site');

  return (
    <section className="flex min-h-screen items-center justify-center">
      <p className="text-sm text-muted">
        Fase 1 — {t('title')}. Setup concluído.
      </p>
    </section>
  );
}
