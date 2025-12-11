"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface MaskContainerProps {
  children?: string | ReactNode;
  revealText?: string | ReactNode;
  size?: number;
  revealSize?: number;
  className?: string;
  hoverTargetRef?: React.RefObject<HTMLElement>;
}

export function MaskContainer({
  children,
  revealText,
  size = 10,
  revealSize = 600,
  className,
  hoverTargetRef,
}: MaskContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isOverTargetRef = useRef(false);
  const [isOverTarget, setIsOverTarget] = useState(false);
  const [isMaskSuppressed, setIsMaskSuppressed] = useState(false);

  // Valores animados para la posición y tamaño de la máscara (en px)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rawRadius = useMotionValue(size);

  // Springs suaves para animaciones
  const springConfig = { damping: 30, stiffness: 300 };
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);
  const radius = useSpring(rawRadius, { damping: 24, stiffness: 220 });

  // Máscara: círculo con borde suave (linterna)
  const maskImage = useMotionTemplate`radial-gradient(circle ${radius}px at ${x}px ${y}px, rgba(0,0,0,1) 0%, rgba(0,0,0,0.98) 58%, rgba(0,0,0,0) 74%)`;

  // Máscara inversa para la capa base (evita superposición de textos dentro del círculo)
  // En masks CSS: negro = visible, transparente = oculto.
  const inverseMaskImage = useMotionTemplate`radial-gradient(circle ${radius}px at ${x}px ${y}px, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 66%, rgba(0,0,0,1) 78%)`;

  useEffect(() => {
    rawRadius.set(isOverTarget ? revealSize : size);
  }, [isOverTarget, revealSize, size, rawRadius]);

  // Si la máscara está suprimida (cursor sobre UI interactiva), ocultamos el reveal
  // y colapsamos el radio para evitar “linterna” encima de botones/navbar.
  useEffect(() => {
    rawRadius.set(isMaskSuppressed ? 0 : isOverTarget ? revealSize : size);
  }, [isMaskSuppressed, isOverTarget, revealSize, size, rawRadius]);

  return (
    <motion.div
      ref={containerRef}
      className={cn(
        "relative h-screen w-full overflow-hidden bg-background text-foreground theme-transition",
        className
      )}
      onPointerMove={(e) => {
        const container = containerRef.current;
        if (!container) return;

        // Si el puntero está sobre un elemento interactivo, suprimimos la máscara
        // hasta que vuelva a pasar por “fondo” (zona no interactiva) dentro del hero.
        const el = document.elementFromPoint(
          e.clientX,
          e.clientY
        ) as HTMLElement | null;
        const isInteractive =
          el?.closest(
            'a,button,input,textarea,select,summary,[role="button"],[role="link"],[data-mask-suppress="true"]'
          ) != null;

        if (isInteractive) {
          if (!isMaskSuppressed) setIsMaskSuppressed(true);
          // Importante: no seguimos actualizando la linterna encima del UI.
          return;
        }

        if (isMaskSuppressed) setIsMaskSuppressed(false);

        const rect = container.getBoundingClientRect();
        const clampedX = Math.max(
          0,
          Math.min(e.clientX - rect.left, rect.width)
        );
        const clampedY = Math.max(
          0,
          Math.min(e.clientY - rect.top, rect.height)
        );

        rawX.set(clampedX);
        rawY.set(clampedY);

        if (!hoverTargetRef?.current) return;
        const targetRect = hoverTargetRef.current.getBoundingClientRect();
        const next =
          e.clientX >= targetRect.left &&
          e.clientX <= targetRect.right &&
          e.clientY >= targetRect.top &&
          e.clientY <= targetRect.bottom;

        if (next !== isOverTargetRef.current) {
          isOverTargetRef.current = next;
          setIsOverTarget(next);
        }
      }}
      onPointerLeave={() => {
        setIsMaskSuppressed(false);
        if (isOverTargetRef.current) {
          isOverTargetRef.current = false;
          setIsOverTarget(false);
        }
        rawRadius.set(size);
      }}
    >
      {/* Base (visible fuera del círculo) */}
      <motion.div
        className="relative z-0 flex h-full w-full items-center justify-center theme-transition"
        style={{
          maskImage: inverseMaskImage,
          WebkitMaskImage: inverseMaskImage,
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      >
        {revealText}
      </motion.div>

      {/* Reveal (solo visible a través de la máscara) */}
      <motion.div
        className="absolute inset-0 z-10 flex h-full w-full items-center justify-center bg-foreground text-background pointer-events-none theme-transition"
        animate={{ opacity: isMaskSuppressed ? 0 : 1 }}
        transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
        style={{
          maskImage,
          WebkitMaskImage: maskImage,
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
      >
        <div className="mx-auto w-full max-w-4xl text-center px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}
