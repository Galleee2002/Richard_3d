"use client";

import { useEffect, useMemo, useRef } from "react";
import { useTheme } from "@/shared/hooks/use-theme";

type RGB = readonly [r: number, g: number, b: number];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number; // 0..1 multiplier
}

export interface CanvasParticlesProps {
  className?: string;
  /**
   * Controla el tono de las partículas según el fondo.
   * - "auto": usa el tema (dark => partículas claras, light => partículas oscuras)
   * - "on-dark": fuerza partículas claras (para fondos oscuros)
   * - "on-light": fuerza partículas oscuras (para fondos claros)
   */
  tone?: "auto" | "on-dark" | "on-light";
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function pickParticleCount(width: number) {
  // Objetivo: ~150-200 en desktop, menos en mobile/tablet.
  if (width < 640) return 90;
  if (width < 1024) return 150;
  return 200;
}

function ensureParticleInBounds(p: Particle, width: number, height: number) {
  p.x = clamp(p.x, p.radius, width - p.radius);
  p.y = clamp(p.y, p.radius, height - p.radius);
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function createParticle(width: number, height: number): Particle {
  const radius = randomBetween(1.1, 3.1);
  const speed = randomBetween(0.03, 0.12);
  const angle = randomBetween(0, Math.PI * 2);

  return {
    x: randomBetween(radius, Math.max(radius, width - radius)),
    y: randomBetween(radius, Math.max(radius, height - radius)),
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    radius,
    alpha: randomBetween(0.35, 1),
  };
}

function setCanvasSize(
  canvas: HTMLCanvasElement,
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) {
  const dpr = clamp(window.devicePixelRatio || 1, 1, 2);

  // Tamaño CSS (layout)
  canvas.style.width = `${Math.max(0, width)}px`;
  canvas.style.height = `${Math.max(0, height)}px`;

  // Tamaño real (buffer)
  canvas.width = Math.max(1, Math.floor(width * dpr));
  canvas.height = Math.max(1, Math.floor(height * dpr));

  // Reset transform + escalar a píxeles CSS
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

export function CanvasParticles({
  className,
  tone = "auto",
}: CanvasParticlesProps) {
  const { theme } = useTheme();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const rafIdRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const sizeRef = useRef({ width: 0, height: 0 });

  const baseRgb: RGB = useMemo(() => {
    if (tone === "on-dark") return [255, 255, 255];
    if (tone === "on-light") return [0, 0, 0];
    return theme === "dark" ? [255, 255, 255] : [0, 0, 0];
  }, [theme, tone]);

  const baseAlpha = 0.38;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctxRef.current = ctx;

    let mounted = true;
    const pointerRef = { x: 0, y: 0, active: false };

    const syncSizeAndParticles = () => {
      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      const width = Math.floor(rect.width);
      const height = Math.floor(rect.height);

      if (width <= 0 || height <= 0) return;

      const prev = sizeRef.current;
      const sizeChanged = prev.width !== width || prev.height !== height;

      if (sizeChanged) {
        sizeRef.current = { width, height };
        setCanvasSize(canvas, ctx, width, height);
      }

      // Ajustar cantidad sin “resetear” posiciones por cambio de tema.
      const targetCount = pickParticleCount(width);
      const particles = particlesRef.current;

      if (particles.length === 0) {
        for (let i = 0; i < targetCount; i += 1) {
          particles.push(createParticle(width, height));
        }
      } else if (particles.length < targetCount) {
        const toAdd = targetCount - particles.length;
        for (let i = 0; i < toAdd; i += 1) {
          particles.push(createParticle(width, height));
        }
      } else if (particles.length > targetCount) {
        particles.splice(targetCount);
      }

      // Si cambió el tamaño, clampa partículas dentro del nuevo bounds.
      if (sizeChanged) {
        for (const p of particles) ensureParticleInBounds(p, width, height);
      }
    };

    syncSizeAndParticles();

    const onPointerMove = (e: PointerEvent) => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      pointerRef.x = e.clientX - rect.left;
      pointerRef.y = e.clientY - rect.top;
      pointerRef.active = true;
    };

    const onPointerLeaveWindow = () => {
      pointerRef.active = false;
    };

    const onResize = () => {
      syncSizeAndParticles();
    };

    // Interacción suave con el puntero (sin bloquear clicks porque el canvas va pointer-events-none)
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("blur", onPointerLeaveWindow);
    window.addEventListener("resize", onResize, { passive: true });

    const prefersReducedMotion =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

    const tick = () => {
      if (!mounted) return;
      const ctx2 = ctxRef.current;
      const { width, height } = sizeRef.current;
      if (!ctx2 || width <= 0 || height <= 0) {
        rafIdRef.current = window.requestAnimationFrame(tick);
        return;
      }

      // Pausa barata cuando la pestaña no está visible.
      if (document.visibilityState !== "visible") {
        rafIdRef.current = window.requestAnimationFrame(tick);
        return;
      }

      ctx2.clearRect(0, 0, width, height);

      const [r, g, b] = baseRgb;
      ctx2.fillStyle = `rgb(${r} ${g} ${b})`;

      const particles = particlesRef.current;

      // Movimiento orgánico: pequeña “brisa” + rebote suave en bordes.
      // Si reduce motion, igual dibujamos pero sin actualizar posiciones.
      const breeze = 0.0009;
      const damping = 0.995;
      const interactionRadius = 140;
      const interactionRadiusSq = interactionRadius * interactionRadius;
      const interactionStrength = 0.035;

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];

        if (!prefersReducedMotion) {
          // Fuerza por puntero: ligera repulsión local para “vida” sin jank.
          if (pointerRef.active) {
            const dx = p.x - pointerRef.x;
            const dy = p.y - pointerRef.y;
            const d2 = dx * dx + dy * dy;
            if (d2 > 1 && d2 < interactionRadiusSq) {
              const d = Math.sqrt(d2);
              const falloff = 1 - d / interactionRadius; // 0..1
              const nx = dx / d;
              const ny = dy / d;
              p.vx += nx * falloff * interactionStrength;
              p.vy += ny * falloff * interactionStrength;
            }
          }

          const ax = (Math.random() - 0.5) * breeze;
          const ay = (Math.random() - 0.5) * breeze;
          p.vx = (p.vx + ax) * damping;
          p.vy = (p.vy + ay) * damping;

          p.x += p.vx;
          p.y += p.vy;

          if (p.x <= p.radius) {
            p.x = p.radius;
            p.vx = Math.abs(p.vx) * 0.98;
          } else if (p.x >= width - p.radius) {
            p.x = width - p.radius;
            p.vx = -Math.abs(p.vx) * 0.98;
          }

          if (p.y <= p.radius) {
            p.y = p.radius;
            p.vy = Math.abs(p.vy) * 0.98;
          } else if (p.y >= height - p.radius) {
            p.y = height - p.radius;
            p.vy = -Math.abs(p.vy) * 0.98;
          }
        }

        ctx2.globalAlpha = baseAlpha * p.alpha;
        ctx2.beginPath();
        ctx2.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx2.fill();
      }

      ctx2.globalAlpha = 1;
      rafIdRef.current = window.requestAnimationFrame(tick);
    };

    rafIdRef.current = window.requestAnimationFrame(tick);

    return () => {
      mounted = false;
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("blur", onPointerLeaveWindow);
      window.removeEventListener("resize", onResize);
      if (rafIdRef.current != null) {
        window.cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [baseRgb]);

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
