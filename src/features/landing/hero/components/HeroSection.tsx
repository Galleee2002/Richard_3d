import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { HeroSectionProps } from "../types/hero-types";
import { HeroBackgroundLines } from "./HeroBackgroundLines";

/**
 * HeroSection
 *
 * - H1 prominente
 * - Subtítulo descriptivo
 * - Badge superior con contexto rápido
 * - Lista de beneficios
 * - CTAs principales
 * - Métricas de confianza
 */
export function HeroSection({ className }: HeroSectionProps) {
  return (
    <section
      className={`relative overflow-hidden w-full min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)] flex items-center ${
        className || ""
      }`}
      aria-label="Hero section"
    >
      {/* Fondo SVG dinámico */}
      <HeroBackgroundLines className="absolute inset-0 -z-10" variant="soft" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="flex flex-col gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-center">
          {/* Contenido de texto */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 text-center max-w-4xl">
            {/* Badge / etiqueta superior */}
            <Badge
              variant="secondary"
              className="mx-auto text-xs sm:text-sm px-3 py-1 rounded-full"
            >
              Todo lo que necesitas aquí{" "}
            </Badge>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight">
              Bienvenido a Richard 3D
            </h1>

            <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-muted-foreground leading-relaxed">
              Explora modelos 3D interactivos con la mejor experiencia visual.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mt-2 sm:mt-4">
              <Button size="lg" className="w-full sm:w-auto">
                Explorar modelos
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                Ver modelos destacados
              </Button>
            </div>

            {/* Métricas de confianza */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-2 sm:mt-3 text-xs sm:text-sm text-muted-foreground">
              <span>+120 modelos disponibles</span>
              <Separator
                orientation="vertical"
                className="hidden sm:block h-4"
              />
              <span>+50 clientes satisfechos</span>
              <Separator
                orientation="vertical"
                className="hidden sm:block h-4"
              />
              <span>Descarga inmediata</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
