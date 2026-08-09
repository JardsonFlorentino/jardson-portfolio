import { z } from 'zod';

/**
 * Schema do formulário de contato.
 * Compartilhado entre cliente (React Hook Form) e servidor (Route Handler),
 * então a validação é literalmente a mesma nos dois lados.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'min_name')
    .max(80, 'max_name'),
  email: z.string().trim().toLowerCase().email('invalid_email').max(120),
  message: z
    .string()
    .trim()
    .min(20, 'min_message')
    .max(2000, 'max_message'),
  /** Honeypot — bots preenchem, humanos não veem. Precisa vir vazio. */
  company: z.string().max(0).optional().or(z.literal('')),
});

export type ContactInput = z.infer<typeof contactSchema>;
