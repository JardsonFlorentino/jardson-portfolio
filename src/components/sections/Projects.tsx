import { useTranslations } from 'next-intl';

import { Container } from '@/components/ui/Container';
import { ProjectCard } from './ProjectCard';
import { ClientWorkList } from './ClientWorkList';
import { SlideUp } from '@/components/motion/SlideUp';
import { CLIENT_WORK, CONTEST, SYSTEMS } from '@/data/projects';

/**
 * Projects — Server Component (SlideUp é o único wrapper client).
 *
 * TRÊS faixas, uma hierarquia:
 *   02 Sistemas   → cards. Junior Jets em largura total + 2 médios.
 *   03 Concurso   → lista tipográfica. Rótulo próprio, peso de lista.
 *   04 Cliente    → lista tipográfica.
 *
 * O DevClub tem faixa própria porque não é sistema (sem backend) nem
 * entrega paga — mas usa o formato de LISTA, não de card. Como card de
 * largura total ele competia com o Junior Jets, que é a única peça com
 * métrica e o que sustenta o argumento do site.
 *
 * Só a faixa 02 usa card. É o que separa "olhe com atenção" de
 * "também entreguei" — e o rótulo é que dá o contexto de cada uma.
 */
export function Projects() {
  const t = useTranslations('projects');
  const [featured, ...rest] = SYSTEMS;

  return (
    // Padding no topo próprio: a dobradiça que antes entregava esse
    // respiro foi removida. O rodapé segue sem padding — quem dá o
    // intervalo até Sobre é o pt daquela seção.
    <section id="projects" className="relative scroll-mt-24 pt-section md:pt-section-lg">
      <Container>
        {/* ── Faixa 1 ─────────────────────────────── */}
        <SlideUp>
          <div className="flex items-center gap-4">
            <span className="meta-label shrink-0 text-accent-bright">{t('index_systems')}</span>
            <span className="rule-accent" />
          </div>
          <div className="mt-block grid gap-x-8 gap-y-5 md:grid-cols-12">
            <h2 className="font-display text-heading text-fg md:col-span-6">{t('title')}</h2>
            <p className="text-lede text-fg-muted md:col-span-6 md:self-end">{t('intro')}</p>
          </div>
        </SlideUp>

        <div className="mt-group grid grid-cols-1 gap-6 md:grid-cols-2">
          <SlideUp className="md:col-span-2" distance={24}>
            <ProjectCard project={featured} featured />
          </SlideUp>
          {rest.map((project, i) => (
            <SlideUp key={project.id} delay={0.08 * (i + 1)} distance={24}>
              <ProjectCard project={project} />
            </SlideUp>
          ))}
        </div>

        {/* ── Faixa 2: CONCURSO ───────────────────
            Faixa própria porque o DevClub não é sistema (sem backend) nem
            entrega paga — mas com o MESMO formato da faixa de cliente.
            Como card de largura total ele roubava a cena do Junior Jets,
            que é a peça que carrega a métrica e o argumento do site. */}
        <div id="contest" className="mt-section scroll-mt-24">
          <SlideUp>
            <div className="flex items-center gap-4">
              <span className="meta-label shrink-0">{t('index_contest')}</span>
              <span className="rule" />
            </div>
            <div className="mt-block grid gap-x-8 gap-y-5 md:grid-cols-12">
              <h2 className="font-display text-title text-fg md:col-span-5">
                {t('contest_title')}
              </h2>
              <p className="text-body text-fg-muted md:col-span-6 md:self-end">
                {t('contest_intro')}
              </p>
            </div>
          </SlideUp>

          <div className="mt-block">
            <ClientWorkList projects={CONTEST} />
          </div>
        </div>

        {/* ── Faixa 3: CLIENTE ────────────────────── */}
        <div id="client-work" className="mt-section scroll-mt-24">
          <SlideUp>
            <div className="flex items-center gap-4">
              <span className="meta-label shrink-0">{t('index_client')}</span>
              <span className="rule" />
            </div>
            <div className="mt-block grid gap-x-8 gap-y-5 md:grid-cols-12">
              <h2 className="font-display text-title text-fg md:col-span-5">{t('client_title')}</h2>
              <p className="text-body text-fg-muted md:col-span-6 md:self-end">
                {t('client_intro')}
              </p>
            </div>
          </SlideUp>

          {/* Lista tipográfica, não cards — peso deliberadamente menor.
              A thumbnail aparece seguindo o cursor (ver ClientWorkList):
              imagem fixa em cada linha devolveria o peso que a curadoria
              tirou de propósito. */}
          <div className="mt-block">
            <ClientWorkList projects={CLIENT_WORK} />
          </div>
        </div>
      </Container>
    </section>
  );
}
