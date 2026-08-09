import { BRANDS } from '@/data/brands';
import { cn } from '@/lib/utils';

interface BrandMarkProps {
  /** chave em BRANDS */
  id: keyof typeof BRANDS | string;
  size?: number;
  className?: string;
}

/**
 * BrandMark — Server Component. Um SVG inline de caminho único.
 *
 * Desenha em `currentColor`, então a cor vem do sistema e não da marca.
 * É a decisão que permite usar logo de verdade sem quebrar a paleta:
 * as marcas oficiais são coloridas e uma parede delas sobre um site
 * monocromático viraria o mural de badges que o briefing proíbe.
 *
 * `aria-hidden`: o nome legível vem do texto ao lado ou do title do
 * container. Um SVG decorativo com nome duplicado atrapalha leitor de tela.
 */
export function BrandMark({ id, size = 22, className }: BrandMarkProps) {
  const brand = BRANDS[id as string];
  if (!brand) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={cn('shrink-0', className)}
    >
      <path d={brand.d} />
    </svg>
  );
}
