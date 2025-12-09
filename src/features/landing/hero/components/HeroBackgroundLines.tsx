import React from "react";
import { cn } from "@/lib/utils";

type HeroBackgroundLinesProps = {
  className?: string;
  variant?: "soft" | "bold";
};

export function HeroBackgroundLines({
  className,
  variant = "soft",
}: HeroBackgroundLinesProps) {
  const isBold = variant === "bold";

  return (
    <div
      className={cn(
        "pointer-events-none select-none overflow-hidden",
        className
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 900"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full object-cover"
        preserveAspectRatio="none"
      >
        {/* Fondo base sólido */}
        <rect width="1440" height="900" fill="var(--color-bg-base)" />

        {/* 
            ------------------------------------------
            VARIANT: SOFT (Por defecto)
            Curvas suaves, mucho aire blanco, toques sutiles 
            ------------------------------------------
        */}
        {!isBold && (
          <>
            {/* Curva de Acento Superior Derecha */}
            <path
              d="M1440 0V450C1300 400 1100 250 1250 0H1440Z"
              fill="var(--color-accent-primary)"
              opacity="0.6"
            />
            {/* Curva de Soporte Inferior Izquierda */}
            <path
              d="M0 900H450C300 850 150 700 0 550V900Z"
              fill="var(--color-accent-support)"
              opacity="0.5"
            />
            {/* Línea decorativa sutil (Stroke) */}
            <path
              d="M1440 600C1200 650 1000 800 800 900"
              stroke="var(--color-text-base)"
              strokeWidth="1"
              strokeOpacity="0.05"
              fill="none"
            />
          </>
        )}

        {/* 
            ------------------------------------------
            VARIANT: BOLD
            Áreas más grandes, más dinamismo 
            ------------------------------------------
        */}
        {isBold && (
          <>
            {/* Gran ola de acento desde arriba derecha hacia el centro */}
            <path
              d="M1440 0V700C1200 650 900 400 1100 0H1440Z"
              fill="var(--color-accent-primary)"
              opacity="0.8"
            />
            {/* Ola de soporte desde abajo izquierda */}
            <path
              d="M0 900V300C200 400 500 800 900 900H0Z"
              fill="var(--color-accent-support)"
              opacity="0.7"
            />
            {/* Elemento flotante central decorativo */}
            <circle
              cx="1200"
              cy="200"
              r="50"
              fill="var(--color-bg-base)"
              fillOpacity="0.5"
            />
          </>
        )}
      </svg>
    </div>
  );
}

