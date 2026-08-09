import { NextResponse } from 'next/server';

import { contactSchema } from '@/lib/schemas';
import { SITE } from '@/lib/constants';

/**
 * POST /api/contact
 *
 * Envia o formulário por email via API REST do Resend.
 *
 * Por que fetch e não o SDK `resend`: o SDK são ~200KB de dependência para
 * fazer um POST. A API REST resolve com zero pacote novo — e menos uma
 * dependência para auditar.
 *
 * Variáveis de ambiente necessárias (.env.local):
 *   RESEND_API_KEY=re_xxxxx
 *   CONTACT_FROM="Portfólio <contato@jardsonflorentino.com.br>"
 *
 * Sem a chave configurada, a rota responde 503 e o formulário mostra
 * o WhatsApp como alternativa — nunca finge que enviou.
 */

const RATE_LIMIT = new Map<string, { count: number; resetAt: number }>();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = RATE_LIMIT.get(ip);

  if (!entry || now > entry.resetAt) {
    RATE_LIMIT.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  if (rateLimited(ip)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'validation', issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }

  // Honeypot preenchido: responde 200 para não ensinar o bot, mas não envia.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM;

  if (!apiKey || !from) {
    return NextResponse.json({ error: 'not_configured' }, { status: 503 });
  }

  const { name, email, message } = parsed.data;

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [SITE.email],
      reply_to: email,
      subject: `Contato do portfólio — ${name}`,
      text: [
        `Nome:  ${name}`,
        `Email: ${email}`,
        '',
        message,
        '',
        `— enviado pelo formulário de ${SITE.url}`,
      ].join('\n'),
    }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: 'send_failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
