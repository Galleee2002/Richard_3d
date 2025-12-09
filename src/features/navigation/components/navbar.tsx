"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { NavSidebar } from "./nav-sidebar";

export const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detectar scroll para efectos visuales (glassmorphism)
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
          isScrolled
            ? "bg-base/80 py-3 backdrop-blur-md border-b border-brand/5"
            : "bg-transparent py-4 sm:py-6"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4 sm:px-6 md:px-12">
          {/* LADO IZQUIERDO: Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Image
              src="/logo.png"
              alt="Richard3D Logo"
              width={32}
              height={32}
              className="h-7 w-7 sm:h-8 sm:w-8 object-contain"
              priority
            />
            <span className="text-base sm:text-lg font-medium tracking-wide text-brand">
              Richard3D
            </span>
          </div>

          {/* LADO DERECHO: CTA + Hamburguesa */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* CTA Contacto */}
            <a
              href="/contacto"
              className="hidden rounded-full border border-brand/20 bg-brand/5 px-4 py-1.5 sm:px-6 sm:py-2 text-xs sm:text-sm font-medium text-brand transition-all hover:bg-brand hover:text-base md:block"
            >
              Contacto
            </a>

            {/* Menú Hamburguesa */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="group flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-brand/10 transition-colors hover:bg-brand/20"
              aria-label="Abrir menú"
            >
              <Menu className="h-4 w-4 sm:h-5 sm:w-5 text-brand transition-transform group-hover:scale-110" />
            </button>
          </div>
        </div>
      </header>

      {/* Renderizamos el Sidebar fuera del header visual, pero conectado lógica */}
      <NavSidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

