/**
 * Atmosphere — Server Component. Zero JavaScript.
 *
 * Quatro camadas empilhadas que dão profundidade ao fundo:
 *   1. grid blueprint (hairlines azuis, mascaradas nas bordas)
 *   2. luz radial azul (a "aurora" sem animar blur)
 *   3. vinheta (foco no centro)
 *   4. grain (textura de filme)
 *
 * A versão anterior do site animava dois divs de 480px com blur(100px)
 * em loop infinito. Isso repintava uma área enorme a cada frame.
 * Aqui o mesmo efeito visual é um gradiente estático: custo zero.
 */
export function Atmosphere({ withGrid = true }: { withGrid?: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-atmos overflow-hidden" aria-hidden="true">
      {withGrid && <div className="atmos-grid absolute inset-0" />}
      <div className="atmos-light absolute inset-0" />
      <div className="atmos-vignette absolute inset-0" />
      <div className="atmos-grain absolute inset-0" />
    </div>
  );
}
