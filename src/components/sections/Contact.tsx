'use client';

import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowUpRight, Check, Linkedin, Loader2, Mail } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Container } from '@/components/ui/Container';
import { contactSchema, type ContactInput } from '@/lib/schemas';
import { BrandMark } from '@/components/ui/BrandMark';
import { HANDLES, SITE, SOCIAL } from '@/lib/constants';
import { cn } from '@/lib/utils';

type Status = 'idle' | 'sending' | 'sent' | 'error' | 'unconfigured';

/**
 * Contact — Client Component (é um formulário; não tem como não ser).
 *
 * ── Estados previstos ─────────────────────────────────────────────
 *   idle          formulário limpo
 *   sending       botão desabilitado, spinner, form com aria-busy
 *   sent          confirmação, campos limpos, botão neutro
 *   error         falha de rede/servidor → oferece WhatsApp
 *   unconfigured  chave do Resend ausente → diz a verdade, não finge envio
 *   invalid       erro por campo, anunciado a leitor de tela
 *
 * ── Acessibilidade ───────────────────────────────────────────────
 *   aria-invalid + aria-describedby ligando cada campo ao seu erro
 *   role="alert" nos erros de campo
 *   região aria-live="polite" para o resultado do envio
 *   O mesmo schema Zod roda aqui e no Route Handler.
 */
export function Contact() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<Status>('idle');
  const uid = useId();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', message: '', company: '' },
  });

  const onSubmit = async (data: ContactInput) => {
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.status === 503) return setStatus('unconfigured');
      if (!res.ok) return setStatus('error');
      setStatus('sent');
      reset();
    } catch {
      setStatus('error');
    }
  };

  // border-line-field = 3.33:1 contra o fundo do campo.
  // A hairline decorativa (`line`, 1.5:1) falharia WCAG 1.4.11 aqui.
  const fieldClass = (hasError: boolean) =>
    cn(
      'w-full rounded-xl border bg-surface px-4 py-3.5 text-body text-fg placeholder:text-fg-dim',
      'outline-none transition-colors duration-fast',
      hasError
        ? 'border-red-400 focus:border-red-300'
        : 'border-line-field hover:border-fg-muted focus:border-accent-bright',
    );

  /** Rótulo + campo + erro, com a fiação de aria sempre igual. */
  const fieldIds = (name: keyof ContactInput) => ({
    id: `${uid}-${name}`,
    errorId: `${uid}-${name}-error`,
  });

  /**
   * Canais com símbolo + handle.
   *
   * A marca vem do BrandMark (simple-icons, monocromática em
   * currentColor). LinkedIn e Email usam o lucide: o LinkedIn foi
   * retirado do simple-icons por pedido de marca, e para "Email" o
   * ícone genérico é mais correto que a logo do Gmail — o canal é
   * email, não um provedor.
   *
   * O handle abaixo do nome dá algo para escanear além do rótulo:
   * "@jardson_dev" comunica mais que a palavra "Instagram".
   */
  const channels = [
    {
      label: 'WhatsApp',
      href: SOCIAL.whatsapp,
      note: t('note_whatsapp'),
      icon: <BrandMark id="whatsapp" size={18} />,
    },
    {
      label: 'Email',
      href: `mailto:${SITE.email}`,
      note: SITE.email,
      icon: <Mail size={18} strokeWidth={1.75} aria-hidden="true" />,
    },
    {
      label: 'Instagram',
      href: SOCIAL.instagram,
      note: HANDLES.instagram,
      icon: <BrandMark id="instagram" size={18} />,
    },
    {
      label: 'LinkedIn',
      href: SOCIAL.linkedin,
      note: t('note_linkedin'),
      icon: <Linkedin size={18} strokeWidth={1.75} aria-hidden="true" />,
    },
    {
      label: 'GitHub',
      href: SOCIAL.github,
      note: HANDLES.github,
      icon: <BrandMark id="github" size={18} />,
    },
  ];

  const name = fieldIds('name');
  const email = fieldIds('email');
  const message = fieldIds('message');

  return (
    <section id="contact" className="relative scroll-mt-24 pb-group pt-section md:pt-section-lg">
      <Container>
        <div className="flex items-center gap-4">
          <span className="meta-label shrink-0 text-accent-bright">{t('index')}</span>
          <span className="rule-accent" />
        </div>

        <div className="mt-group grid grid-cols-12 gap-x-8 gap-y-group">
          {/* Chamada + canais diretos */}
          <div className="col-span-12 flex flex-col gap-block lg:col-span-5">
            <h2 className="font-display text-heading text-fg">{t('title')}</h2>
            <p className="max-w-prose text-lede text-fg-muted">{t('lede')}</p>

            <ul className="flex flex-col border-t border-line">
              {channels.map((c) => (
                <li key={c.label} className="border-b border-line">
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 py-4"
                  >
                    <span className="shrink-0 text-fg-dim transition-colors duration-fast group-hover:text-accent-bright">
                      {c.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-meta uppercase text-fg-muted transition-colors duration-fast group-hover:text-fg">
                        {c.label}
                      </span>
                      <span className="mt-0.5 block truncate text-sm text-fg-dim">{c.note}</span>
                    </span>
                    <ArrowUpRight
                      size={16}
                      strokeWidth={1.75}
                      aria-hidden="true"
                      className="shrink-0 text-fg-dim transition-[transform,color] duration-fast group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-bright"
                    />
                  </a>
                </li>
              ))}
            </ul>

            {/*
             * "Como funciona" — três passos.
             *
             * Era a maior lacuna de persuasão do site: o formulário pedia
             * que a pessoa descrevesse um problema e não dizia o que ela
             * recebe de volta nem quando. Quem hesita em contratar hesita
             * por não saber o próximo passo, não por não gostar do
             * portfólio. Isso remove o atrito.
             */}
            <div className="border-t border-line pt-block">
              <p className="meta-label mb-5">{t('how_label')}</p>
              <ol className="flex flex-col gap-5">
                {[1, 2, 3].map((n) => (
                  <li key={n} className="flex gap-4">
                    <span className="mt-0.5 shrink-0 font-mono text-meta tabular text-accent-bright">
                      0{n}
                    </span>
                    <span>
                      <span className="block text-body text-fg">{t(`how_${n}_title`)}</span>
                      <span className="mt-1 block max-w-prose text-sm text-fg-muted">
                        {t(`how_${n}_body`)}
                      </span>
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Formulário */}
          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              aria-busy={status === 'sending'}
              className="flex flex-col gap-5"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor={name.id} className="meta-label">
                    {t('field_name')}
                  </label>
                  <input
                    id={name.id}
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? name.errorId : undefined}
                    className={fieldClass(!!errors.name)}
                    placeholder={t('ph_name')}
                    {...register('name')}
                  />
                  {errors.name && (
                    <span id={name.errorId} role="alert" className="text-sm text-red-400">
                      {t(`err_${errors.name.message}`)}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor={email.id} className="meta-label">
                    {t('field_email')}
                  </label>
                  <input
                    id={email.id}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? email.errorId : undefined}
                    className={fieldClass(!!errors.email)}
                    placeholder={t('ph_email')}
                    {...register('email')}
                  />
                  {errors.email && (
                    <span id={email.errorId} role="alert" className="text-sm text-red-400">
                      {t(`err_${errors.email.message}`)}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor={message.id} className="meta-label">
                  {t('field_message')}
                </label>
                <textarea
                  id={message.id}
                  rows={5}
                  aria-invalid={!!errors.message}
                  aria-describedby={errors.message ? message.errorId : undefined}
                  className={cn(fieldClass(!!errors.message), 'resize-y')}
                  placeholder={t('ph_message')}
                  {...register('message')}
                />
                {errors.message && (
                  <span id={message.errorId} role="alert" className="text-sm text-red-400">
                    {t(`err_${errors.message.message}`)}
                  </span>
                )}
              </div>

              {/* Honeypot — fora da tela para humanos, preenchível por bots */}
              <div aria-hidden="true" className="absolute -left-[9999px] size-0 overflow-hidden">
                <label htmlFor={`${uid}-company`}>Company</label>
                <input
                  id={`${uid}-company`}
                  tabIndex={-1}
                  autoComplete="off"
                  {...register('company')}
                />
              </div>

              <div className="flex flex-wrap items-center gap-5">
                <button
                  type="submit"
                  disabled={status === 'sending' || status === 'sent'}
                  className={cn(
                    'inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-medium',
                    'transition-[background-color,box-shadow,transform] duration-fast',
                    'disabled:pointer-events-none disabled:opacity-60',
                    status === 'sent'
                      ? 'border border-line-strong bg-surface-raised text-fg'
                      : 'bg-accent text-white shadow-glow hover:scale-[1.02] hover:shadow-glow-lg active:scale-[0.98] motion-reduce:hover:scale-100',
                  )}
                >
                  {status === 'sending' && (
                    <Loader2 size={15} className="animate-spin" aria-hidden="true" />
                  )}
                  {status === 'sent' && <Check size={15} aria-hidden="true" />}
                  {status === 'sending'
                    ? t('sending')
                    : status === 'sent'
                      ? t('sent')
                      : t('submit')}
                </button>

                {/* Resultado do envio — anunciado a leitor de tela */}
                <p aria-live="polite" className="min-w-0 flex-1 text-sm">
                  {status === 'error' && <span className="text-red-400">{t('error')}</span>}
                  {status === 'unconfigured' && (
                    <span className="text-fg-muted">
                      {t('unconfigured')}{' '}
                      <a
                        href={SOCIAL.whatsapp}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="link-underline text-accent-bright"
                      >
                        WhatsApp
                      </a>
                      .
                    </span>
                  )}
                  {status === 'sent' && <span className="text-fg-muted">{t('sent_detail')}</span>}
                </p>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
