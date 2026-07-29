'use client';

import { useEffect, useRef, useState, memo, type FC } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import clsx from 'clsx';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  parallaxFactor: number;
}

const SparkleParticle: FC<{
  sparkle: Sparkle;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
}> = memo(function SparkleParticle({
  sparkle,
  mouseX,
  mouseY,
}) {
  return (
    <motion.div
      key={sparkle.id}
      className="absolute rounded-full bg-white/80"
      style={{
        top: `${sparkle.y}%`,
        left: `${sparkle.x}%`,
        width: `${sparkle.size}px`,
        height: `${sparkle.size}px`,
      }}
      initial={{ opacity: 0, x: 0, y: 0 }}
      animate={{
        opacity: [0, 1, 0],
        x: [0, Math.random() * 40 - 20, 0], // Enhanced slow drift
        y: [0, Math.random() * 40 - 20, 0],
      }}
      transition={{
        duration: sparkle.duration,
        repeat: Infinity,
        delay: sparkle.delay,
        ease: 'linear',
      }}
    />
  );
});

SparkleParticle.displayName = 'SparkleParticle';

/**
 * Sparkles — Componente que gera um fundo de partículas animadas.
 * Cria um efeito de "poeira cósmica" ou "céu estrelado" sutil.
 */
export function Sparkles({
  particleCount = 120,
  className,
}: {
  particleCount?: number;
  className?: string;
}) {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  // Parallax effect based on mouse movement
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientWidth, clientHeight } = document.documentElement;
      mouseX.set(event.clientX / clientWidth - 0.5);
      mouseY.set(event.clientY / clientHeight - 0.5);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const generateSparkles = () => {
      const newSparkles = Array.from({ length: particleCount }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5, // Tamanho entre 0.5px e 2px
        delay: Math.random() * 5, // Atraso de até 5s
        duration: Math.random() * 5 + 3, // Duração entre 3s e 8s
        parallaxFactor: Math.random() * 0.5 + 0.1, // Fator de parallax
      }));
      setSparkles(newSparkles);
    };

    generateSparkles();
  }, [particleCount]);

  return (
    <div
      ref={containerRef}
      className={clsx('pointer-events-none absolute inset-0 z-0 h-full w-full', className)}
    >
      {sparkles.map((s) => (
        <SparkleParticle
          key={s.id}
          sparkle={s}
          mouseX={mouseX}
          mouseY={mouseY}
        />
      ))}
    </div>
  );
}