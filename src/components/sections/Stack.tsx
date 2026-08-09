import { useTranslations } from 'next-intl';

import { Container } from '@/components/ui/Container';
import { SlideUp } from '@/components/motion/SlideUp';
import { BrandMark } from '@/components/ui/BrandMark';
import { BRANDS } from '@/data/brands';

/**
 * Stack — Server Component. Zero JavaScript: todo o hover é CSS.
 *
 * NÃO é grade de badges. É a arquitetura em camadas que o Jardson
 * constrói, com a justificativa de cada escolha ao lado.
 *
 * ── O que mudou ──────────────────────────────────────────────────
 * Antes as ferramentas eram só nomes em mono, e o ticker do hero tinha
 * sido jogado aqui. Agora cada ferramenta tem a marca de verdade —
 * mas em `currentColor`, monocromática.
 *
 * Isso é deliberado: as logos oficiais são coloridas (React ciano, Node
 * verde, Mongo verde, Postgres azul, Docker azul) e uma parede delas
 * sobre um site monocromático é exatamente o mural de badges do
 * shields.io que o briefing proíbe. Monocromáticas, elas dão o
 * reconhecimento imediato do logo sem custar a disciplina da paleta.
 *
 * A cor entra só no hover, e uma marca por vez.
 *
 * ── Tempero ──────────────────────────────────────────────────────
 *  · barra de acento crescendo na lateral da linha
 *  · a linha inteira desloca para a direita no hover
 *  · cada marca sobe e vira azul quando recebe o cursor
 *  · o nome da ferramenta aparece embaixo da marca no hover
 *  · a camada de automação nasce em azul: é o diferencial
 */
interface Layer {
  id: string;
  tools: (keyof typeof BRANDS | string)[];
  /** true = camada de diferencial, recebe destaque em azul */
  edge?: boolean;
}

const LAYERS: Layer[] = [
  {
    id: 'interface',
    tools: ['html5', 'css', 'javascript', 'typescript', 'react', 'nextdotjs', 'tailwindcss', 'figma'],
  },
  { id: 'api', tools: ['nodedotjs', 'express', 'prisma', 'jsonwebtokens'] },
  { id: 'data', tools: ['postgresql', 'mongodb'] },
  { id: 'automation', tools: ['whatsapp', 'n8n'], edge: true },
  { id: 'infra', tools: ['docker', 'vercel', 'git', 'github'] },
];

export function Stack() {
  const t = useTranslations('stack');

  return (
    <section id="stack" className="relative scroll-mt-24 pt-section md:pt-section-lg">
      <Container>
        <SlideUp>
          <div className="flex items-center gap-4">
            <span className="meta-label shrink-0">{t('index')}</span>
            <span className="rule" />
          </div>
          <div className="mt-block grid gap-x-8 gap-y-5 md:grid-cols-12">
            <h2 className="font-display text-heading text-fg md:col-span-5">{t('title')}</h2>
            <p className="text-lede text-fg-muted md:col-span-6 md:col-start-7 md:self-end">
              {t('intro')}
            </p>
          </div>
        </SlideUp>

        <ul className="mt-group border-t border-line">
          {LAYERS.map((layer, i) => (
            <SlideUp key={layer.id} delay={0.06 * i} distance={18}>
              <li className="group relative border-b border-line">
                {/* Barra de acento que cresce do topo */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-0 h-full w-0.5 origin-top scale-y-0 bg-accent transition-transform duration-base ease-out-quart group-hover:scale-y-100"
                />

                <div className="grid grid-cols-12 items-center gap-x-8 gap-y-5 py-block pl-0 transition-[padding] duration-base ease-out-quart group-hover:pl-5">
                  {/* Número + nome da camada */}
                  <div className="col-span-12 flex items-baseline gap-4 md:col-span-3">
                    <span className="font-mono text-meta tabular text-fg-dim">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3
                      className={
                        layer.edge
                          ? 'font-display text-title text-accent-bright'
                          : 'font-display text-title text-fg'
                      }
                    >
                      {t(`${layer.id}_name`)}
                    </h3>
                  </div>

                  {/* Marcas */}
                  <ul className="col-span-12 flex flex-wrap items-start gap-x-6 gap-y-5 md:col-span-5">
                    {layer.tools.map((tool) => (
                      <li key={tool} className="group/mk flex w-16 flex-col items-center gap-2 md:w-12">
                        <BrandMark
                          id={tool}
                          size={24}
                          className={
                            layer.edge
                              ? 'text-accent-bright/80 transition-[color,transform] duration-fast group-hover/mk:-translate-y-0.5 group-hover/mk:text-accent-bright motion-reduce:group-hover/mk:translate-y-0'
                              : 'text-fg-dim transition-[color,transform] duration-fast group-hover/mk:-translate-y-0.5 group-hover/mk:text-accent-bright motion-reduce:group-hover/mk:translate-y-0'
                          }
                        />
                        {/* Legenda VISÍVEL por padrão; escondida só onde
                            existe cursor, onde o hover a revela.
                            Antes era opacity-0 puro: no celular as 20
                            logos ficavam sem nome nenhum — bug de
                            usabilidade, não falta de graça. */}
                        <span className="text-center font-mono text-[0.625rem] uppercase leading-tight tracking-wider text-fg-dim transition-opacity duration-fast [@media(pointer:fine)]:opacity-0 [@media(pointer:fine)]:group-hover/mk:opacity-100">
                          {BRANDS[tool as string]?.label}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* Justificativa — o que responde "ele pensa?" */}
                  <p className="col-span-12 max-w-prose text-body text-fg-muted md:col-span-4">
                    {t(`${layer.id}_why`)}
                  </p>
                </div>
              </li>
            </SlideUp>
          ))}
        </ul>
      </Container>
    </section>
  );
}
