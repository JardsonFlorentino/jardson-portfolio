/**
 * ScrollProgress — barra de 2px no topo que cresce com o scroll.
 *
 * Server Component. ZERO JavaScript: usa scroll-driven animations
 * nativas do CSS (`animation-timeline: scroll(root block)`).
 *
 * Onde o browser não suporta, a barra simplesmente não aparece —
 * enhancement progressivo, sem fallback em JS e sem listener de scroll.
 */
export function ScrollProgress() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-progress h-[2px] bg-transparent"
    >
      <div className="scroll-progress h-full w-full bg-gradient-to-r from-accent-deep via-accent to-accent-bright" />
    </div>
  );
}
