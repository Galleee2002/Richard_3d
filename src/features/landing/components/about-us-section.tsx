"use client";

import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/shared/hooks/use-outside-click";
import { X } from "lucide-react";

type ProcessCard = {
  title: string;
  description: string;
  src: string;
  content: () => React.ReactNode;
};

const processCards: ProcessCard[] = [
  {
    title: "Inicio",
    description: "Diseño y conceptualización",
    src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",
    content: () => {
      return (
        <div className="space-y-3">
          <p className="text-sm md:text-base text-black dark:text-white theme-transition">
            Todo comienza con una idea. Nuestro equipo de diseñadores trabaja
            contigo para conceptualizar el producto, entendiendo tus necesidades
            y visión.
          </p>
          <p className="text-sm md:text-base text-black dark:text-white theme-transition">
            Utilizamos herramientas de diseño 3D avanzadas para crear modelos
            detallados que permiten visualizar el producto final antes de la
            producción.
          </p>
          <p className="text-sm md:text-base text-black dark:text-white theme-transition">
            En esta fase, definimos materiales, colores, dimensiones y todos los
            detalles que harán único tu producto.
          </p>
        </div>
      );
    },
  },
  {
    title: "Producción",
    description: "Fabricación con tecnología de vanguardia",
    src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
    content: () => {
      return (
        <div className="space-y-3">
          <p className="text-sm md:text-base text-black dark:text-white theme-transition">
            Una vez aprobado el diseño, pasamos a la fase de producción. Nuestro
            proceso utiliza tecnología de impresión 3D de última generación para
            garantizar la máxima calidad.
          </p>
          <p className="text-sm md:text-base text-black dark:text-white theme-transition">
            Cada pieza es fabricada con precisión milimétrica, utilizando
            materiales de primera calidad que aseguran durabilidad y
            resistencia.
          </p>
          <p className="text-sm md:text-base text-black dark:text-white theme-transition">
            Durante la producción, realizamos controles de calidad continuos
            para asegurar que cada producto cumpla con nuestros estándares de
            excelencia.
          </p>
        </div>
      );
    },
  },
  {
    title: "Final",
    description: "Acabado y entrega",
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    content: () => {
      return (
        <div className="space-y-3">
          <p className="text-sm md:text-base text-black dark:text-white theme-transition">
            La fase final incluye el acabado detallado de cada pieza. Realizamos
            procesos de pulido, pintura y tratamiento de superficie según las
            especificaciones del diseño.
          </p>
          <p className="text-sm md:text-base text-black dark:text-white theme-transition">
            La fase final incluye el acabado detallado de cada pieza. Realizamos
            procesos de pulido, pintura y tratamiento de superficie según las
            especificaciones del diseño.
          </p>
          <p className="text-sm md:text-base text-black dark:text-white theme-transition">
            Cada producto pasa por una inspección final exhaustiva antes de ser
            empaquetado con cuidado para su envío.
          </p>
          <p className="text-sm md:text-base text-black dark:text-white theme-transition">
            Nos aseguramos de que tu producto llegue en perfectas condiciones,
            listo para ser utilizado y disfrutado.
          </p>
        </div>
      );
    },
  },
];

export function AboutUsSection() {
  const [active, setActive] = useState<ProcessCard | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(null);
      }
    }

    if (active) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 dark:bg-black/40 h-full w-full z-10 theme-transition"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active ? (
          <div className="fixed inset-0 grid place-items-center z-[100] p-4">
            <motion.button
              key={`button-close-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-4 right-4 lg:hidden items-center justify-center bg-background border border-border rounded-full h-8 w-8 z-10 theme-transition"
              onClick={() => setActive(null)}
              aria-label="Cerrar"
            >
              <X className="h-4 w-4 text-foreground" />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-background border border-border sm:rounded-3xl overflow-hidden shadow-lg theme-transition"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  width={500}
                  height={320}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-64 sm:h-80 object-cover object-center"
                />
              </motion.div>

              <div className="flex flex-col flex-1 overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 p-4 sm:p-6">
                  <div className="flex-1">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-lg sm:text-xl text-black dark:text-white mb-2 theme-transition"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-sm sm:text-base text-black dark:text-white theme-transition"
                    >
                      {active.description}
                    </motion.p>
                  </div>
                </div>
                <div className="pt-0 relative px-4 sm:px-6 pb-6 flex-1 overflow-hidden">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-foreground text-sm sm:text-base h-40 sm:h-fit pb-4 flex flex-col items-start gap-4 overflow-auto theme-transition [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] dark:[mask:linear-gradient(to_bottom,black,black,transparent)]"
                  >
                    {active.content()}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <section className="py-12 sm:py-16 lg:py-20 bg-background theme-transition">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-8 sm:mb-10 lg:mb-12 text-center theme-transition">
              Sobre Nosotros
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {processCards.map((card) => (
                <motion.div
                  layoutId={`card-${card.title}-${id}`}
                  key={`card-${card.title}-${id}`}
                  onClick={() => setActive(card)}
                  className="flex flex-col hover:bg-muted/50 rounded-xl cursor-pointer border border-border/50 hover:border-border transition-colors theme-transition overflow-hidden"
                >
                  <motion.div
                    layoutId={`image-${card.title}-${id}`}
                    className="w-full"
                  >
                    <img
                      width={400}
                      height={250}
                      src={card.src}
                      alt={card.title}
                      className="w-full h-48 sm:h-56 lg:h-64 object-cover"
                    />
                  </motion.div>
                  <div className="p-4 sm:p-6 flex flex-col flex-1">
                    <motion.h3
                      layoutId={`title-${card.title}-${id}`}
                      className="font-medium text-lg sm:text-xl text-black dark:text-white mb-2 theme-transition"
                    >
                      {card.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${card.description}-${id}`}
                      className="text-sm sm:text-base text-black dark:text-white mb-4 flex-1 theme-transition"
                    >
                      {card.description}
                    </motion.p>
                    <motion.button
                      layoutId={`button-${card.title}-${id}`}
                      className="px-4 py-2 text-sm sm:text-base rounded-full font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors theme-transition w-full"
                    >
                      Ver más
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
