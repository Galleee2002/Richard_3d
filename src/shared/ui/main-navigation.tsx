"use client"

import { useState } from "react"
import Link from "next/link"
import { Shield, Search, Menu, X } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function MainNavigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigationLinks = [
    { href: "/", label: "Inicio" },
    { href: "/productos", label: "Productos" },
    { href: "/sobre-nosotros", label: "Sobre Nosotros" },
    { href: "/contacto", label: "Contacto" },
  ]

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-base/95 backdrop-blur supports-[backdrop-filter]:bg-base/80">
      <div className="container flex h-14 sm:h-16 items-center justify-between px-3 sm:px-4 lg:px-6">
        {/* Lado izquierdo: Avatar + Nombre - Mobile first */}
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
            <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
              <AvatarImage src="/logo.png" alt="Richard3D Logo" />
              <AvatarFallback>R3D</AvatarFallback>
            </Avatar>
            <span className="font-heading text-base sm:text-lg lg:text-xl font-bold text-brand">
              Richard3D
            </span>
          </Link>
        </div>

        {/* Centro: Links de navegación - Desktop only */}
        <div className="hidden lg:flex items-center gap-4 xl:gap-6">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm xl:text-base font-medium text-brand hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Lado derecho: Search bar + Dashboard link + Mobile menu button */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search bar - Tablet and Desktop */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-2 sm:left-3 top-1/2 h-3.5 w-3.5 sm:h-4 sm:w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar productos..."
              className="w-[140px] sm:w-[180px] md:w-[200px] lg:w-[250px] pl-7 sm:pl-9 text-xs sm:text-sm"
              disabled
            />
          </div>

          {/* Dashboard button - Always visible */}
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10"
            aria-label="Panel de administración"
          >
            <Link href="/admin/dashboard">
              <Shield className="h-4 w-4 sm:h-5 sm:w-5 text-brand" />
            </Link>
          </Button>

          {/* Mobile menu button - Mobile and Tablet only */}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 sm:h-9 sm:w-9 lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menú de navegación"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5 text-brand" />
            ) : (
              <Menu className="h-5 w-5 text-brand" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile menu - Mobile and Tablet */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-base/95 backdrop-blur supports-[backdrop-filter]:bg-base/80">
          <div className="container px-3 sm:px-4 py-4 space-y-3">
            {/* Search bar in mobile menu */}
            <div className="relative sm:hidden">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar productos..."
                className="w-full pl-9 text-sm"
                disabled
              />
            </div>

            {/* Navigation links */}
            {navigationLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-base font-medium text-brand hover:text-accent transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}

