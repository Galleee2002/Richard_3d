"use client";

import { motion } from "framer-motion";
import { forwardRef, useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { MaskContainer } from "@/shared/ui/mask-container";
import { CanvasParticles } from "@/features/landing/components/CanvasParticles";
import { useTheme } from "@/shared/hooks/use-theme";

// --- TEXT COMPONENTS ---
interface AnimatedTextProps {
  text: string;
  className?: string;
}

const AnimatedText = forwardRef<HTMLHeadingElement, AnimatedTextProps>(
  ({ text, className }, ref) => {
    const words = text.split(" ");

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.08 },
      },
    };

    const wordVariants = {
      hidden: { opacity: 0, y: 50, clipPath: "inset(100% 0 0 0)" },
      visible: { opacity: 1, y: 0, clipPath: "inset(0% 0 0 0)" },
    };

    return (
      <motion.h1
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={className}
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={wordVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="inline-block overflow-hidden mr-2 sm:mr-3"
          >
            {word}
          </motion.span>
        ))}
      </motion.h1>
    );
  }
);

AnimatedText.displayName = "AnimatedText";

// --- MAIN COMPONENT ---
export const HeroSection: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const baseHeadlineRef = useRef<HTMLHeadingElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Contenido base (visible normalmente)
  const baseContent = (
    <div className="relative h-full w-full flex items-center justify-center">
      <CanvasParticles
        tone="auto"
        className="pointer-events-none absolute inset-0 z-0 theme-transition"
      />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedText
            ref={baseHeadlineRef}
            text="Impresiones 3D "
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold text-brand tracking-tight leading-[1.1] mb-4 sm:mb-6 lg:mb-8 theme-transition"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl text-brand/70 max-w-2xl mx-auto mb-8 sm:mb-10 lg:mb-12 leading-relaxed theme-transition"
          >
            Elevate your brand with interfaces that feel alive. Minimalist
            design meets robust engineering.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 text-sm sm:text-base lg:text-lg font-medium text-brand rounded-full bg-[#ffbd59] hover:bg-[#ffbd59]/90 transition-colors shadow-lg hover:shadow-xl theme-transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ffbd59] focus-visible:ring-offset-2 focus-visible:ring-offset-base-bg"
              aria-label="Ver Productos"
            >
              <span className="relative z-10">Productos</span>
              <motion.div
                className="relative z-10"
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.div>
              {/* Glow effect on button */}
              <motion.div
                className="absolute inset-0 rounded-full bg-[#ffbd59] opacity-0 group-hover:opacity-40 "
                layoutId="glow"
              />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );

  // Contenido revelado (visible a través de la máscara)
  const revealedContent = (
    <div className="relative h-full w-full flex items-center justify-center">
      <CanvasParticles
        // La capa reveal usa bg-foreground: en dark suele ser claro, así que invertimos el tono.
        tone={theme === "dark" ? "on-light" : "on-dark"}
        className="pointer-events-none absolute inset-0 z-0 theme-transition"
      />
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedText
            text="TEXTO ALTERNATIVO DE PRUEBA"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-heading font-bold tracking-tight leading-[1.1] mb-4 sm:mb-6 lg:mb-8 theme-transition"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto mb-8 sm:mb-10 lg:mb-12 leading-relaxed theme-transition opacity-90"
          >
            Si estás leyendo esto dentro del círculo, el “Mask Reveal” está
            funcionando. Ahora mueve el cursor hasta el H1 del hero: la máscara
            debería ensancharse.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="flex justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 text-sm sm:text-base lg:text-lg font-medium rounded-full bg-background/10 hover:bg-background/20 backdrop-blur-sm border border-background/20 transition-colors shadow-lg hover:shadow-xl theme-transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background/50 focus-visible:ring-offset-2"
              aria-label="Explorar"
            >
              <span className="relative z-10">Explorar</span>
              <motion.div
                className="relative z-10"
                animate={{ x: [0, 4, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.div>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </div>
  );

  return (
    <MaskContainer
      revealText={baseContent}
      size={10}
      revealSize={600}
      className="bg-base-bg theme-transition"
      hoverTargetRef={baseHeadlineRef}
    >
      {revealedContent}
    </MaskContainer>
  );
};
