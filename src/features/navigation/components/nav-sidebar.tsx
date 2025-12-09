"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Instagram, Facebook, Linkedin, Twitter } from "lucide-react";
import { SocialLink } from "@/shared/ui/social-link";

interface NavSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: "Ingresar", href: "/admin/dashboard" }, // Admin link
  { label: "Impresiones 3D", href: "/productos" },
  { label: "Guía de Diseño", href: "/guia" },
  { label: "Materiales", href: "/materiales" },
  { label: "Cotizador", href: "/cotizar" },
];

export const NavSidebar: React.FC<NavSidebarProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop (Fondo oscuro semitransparente) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-base/60 backdrop-blur-sm"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-[70] h-full w-full max-w-md border-l border-border/10 bg-base text-brand shadow-2xl sm:w-[400px]"
          >
            <div className="flex h-full flex-col p-8 md:p-12 relative">
              {/* Botón Cerrar (A la izquierda del contenido del menú, como en la imagen) */}
              <button
                onClick={onClose}
                className="absolute left-6 top-1/2 -translate-y-1/2 md:-left-16 md:top-12 md:translate-y-0 flex h-12 w-12 items-center justify-center rounded-full bg-brand text-base hover:scale-105 transition-transform shadow-lg z-50"
                aria-label="Cerrar menú"
              >
                <X size={24} />
              </button>

              {/* Título o Marca dentro del menú */}
              <div className="mb-12">
                <span className="text-xs font-bold uppercase tracking-widest text-brand/50 border-b border-brand/20 pb-2">
                  Richard3D
                </span>
              </div>

              {/* Links de Navegación */}
              <nav className="flex flex-1 flex-col justify-center gap-6">
                {menuItems.map((item, index) => (
                  <motion.a
                    key={item.label}
                    href={item.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    className="text-3xl font-light tracking-tight text-brand transition-colors hover:text-brand/70 md:text-4xl"
                  >
                    {item.label}
                  </motion.a>
                ))}
              </nav>

              {/* Footer: Redes Sociales */}
              <div className="mt-auto pt-10">
                <div className="flex gap-4">
                  <SocialLink icon={Instagram} href="#" label="Instagram" />
                  <SocialLink icon={Twitter} href="#" label="Twitter" />
                  <SocialLink icon={Linkedin} href="#" label="LinkedIn" />
                  <SocialLink icon={Facebook} href="#" label="Facebook" />
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

