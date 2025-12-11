"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, User, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/shared/ui/theme-toggle";
import { useTheme } from "@/shared/hooks/use-theme";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Productos", href: "/productos" },
  { label: "Sobre nosotros", href: "/sobre-nosotros" },
  { label: "Contacto", href: "/contacto" },
];

export function Navbar() {
  const { isTransitioning } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <motion.nav
      className={cn(
        "sticky top-0 z-50 w-full",
        "bg-background/70 backdrop-blur-lg supports-[backdrop-filter]:bg-background/50",
        "border-b border-border/30",
        "theme-transition"
      )}
      animate={{
        opacity: isTransitioning ? 0.95 : 1,
      }}
      transition={{
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      <div className="container mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex h-14 sm:h-16 items-center justify-between gap-2 sm:gap-4">
          {/* Logo y nombre - Izquierda */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3 flex-shrink-0"
            >
              <div className="relative h-6 w-6 sm:h-8 sm:w-8">
                <Image
                  src="/logo.png"
                  alt="Rich.art Logo"
                  fill
                  className="object-contain theme-transition"
                  priority
                />
              </div>
              <span className="text-sm sm:text-base lg:text-lg font-heading font-semibold text-brand hover:text-brand/80 theme-transition whitespace-nowrap">
                Rich.art
              </span>
            </Link>
          </motion.div>

          {/* Enlaces de navegación - Centro (oculto en mobile) */}
          <div className="hidden lg:flex items-center gap-6 flex-1 justify-center">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1,
                  ease: [0.4, 0, 0.2, 1],
                }}
                whileHover={{
                  y: -3,
                  transition: {
                    duration: 0.2,
                    ease: [0.4, 0, 0.2, 1],
                  },
                }}
              >
                <Link
                  href={item.href}
                  className="text-sm text-brand/80 hover:text-accent transition-colors duration-200 whitespace-nowrap"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Desktop: Búsqueda, Toggle y Avatar - Derecha */}
          <div className="hidden lg:flex items-center gap-2 sm:gap-3 flex-shrink-0">
            {/* Barra de búsqueda */}
            <motion.div
              className="relative flex items-center"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground pointer-events-none theme-transition" />
              <Input
                type="search"
                placeholder="Buscar..."
                className="pl-8 w-40 lg:w-48 h-8 sm:h-9 bg-background/40 border-border/40 focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:border-accent/30 theme-transition"
              />
            </motion.div>

            {/* Toggle de tema */}
            <ThemeToggle />

            {/* Avatar admin */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/dashboard">
                <Avatar className="h-8 w-8 sm:h-9 sm:w-9 cursor-pointer hover:ring-2 hover:ring-accent/50 transition-all duration-200 theme-transition">
                  <AvatarFallback className="bg-muted hover:bg-accent/10 transition-colors duration-200 theme-transition">
                    <User className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground group-hover:text-accent theme-transition" />
                  </AvatarFallback>
                </Avatar>
              </Link>
            </motion.div>
          </div>

          {/* Mobile: Botón hamburguesa */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <motion.button
                type="button"
                aria-label="Abrir menú"
                className="lg:hidden flex items-center justify-center h-9 w-9 rounded-md hover:bg-muted/50 transition-colors theme-transition"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="h-5 w-5 text-foreground theme-transition" />
              </motion.button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[280px] sm:w-[320px] bg-background theme-transition"
            >
              <SheetHeader className="text-left pb-6 border-b border-border/40">
                <SheetTitle className="flex items-center gap-2">
                  <div className="relative h-8 w-8">
                    <Image
                      src="/logo.png"
                      alt="Rich.art Logo"
                      fill
                      className="object-contain theme-transition"
                    />
                  </div>
                  <span className="text-lg font-heading font-semibold text-brand theme-transition">
                    Rich.art
                  </span>
                </SheetTitle>
              </SheetHeader>

              {/* Links de navegación */}
              <nav className="flex flex-col gap-1 mt-6">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.1,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center py-3 px-4 text-base text-foreground hover:bg-muted/50 rounded-md transition-colors duration-200 theme-transition"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Separador */}
              <div className="my-6 border-t border-border/40 theme-transition" />

              {/* Toggle theme y Avatar admin */}
              <div className="flex flex-col gap-4">
                {/* Toggle theme */}
                <div className="flex items-center justify-between px-4 py-2">
                  <span className="text-sm text-muted-foreground theme-transition">
                    Tema
                  </span>
                  <ThemeToggle />
                </div>

                {/* Avatar admin */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-muted/50 transition-colors duration-200 theme-transition"
                  >
                    <Avatar className="h-9 w-9 cursor-pointer hover:ring-2 hover:ring-accent/50 transition-all duration-200 theme-transition">
                      <AvatarFallback className="bg-muted hover:bg-accent/10 transition-colors duration-200 theme-transition">
                        <User className="h-5 w-5 text-muted-foreground theme-transition" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium text-foreground theme-transition">
                      Admin
                    </span>
                  </Link>
                </motion.div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}
