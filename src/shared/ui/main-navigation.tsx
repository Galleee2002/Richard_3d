"use client"

import Link from "next/link"
import { Shield, Search } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function MainNavigation() {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-base/95 backdrop-blur supports-[backdrop-filter]:bg-base/80">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Lado izquierdo: Avatar + Nombre */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/logo.png" alt="Richard3D Logo" />
              <AvatarFallback>R3D</AvatarFallback>
            </Avatar>
            <span className="font-heading text-xl font-bold text-brand">Richard3D</span>
          </Link>
        </div>

        {/* Centro: Links de navegación */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium text-brand hover:text-accent transition-colors"
          >
            Inicio
          </Link>
          <Link
            href="/productos"
            className="text-sm font-medium text-brand hover:text-accent transition-colors"
          >
            Productos
          </Link>
          <Link
            href="/sobre-nosotros"
            className="text-sm font-medium text-brand hover:text-accent transition-colors"
          >
            Sobre Nosotros
          </Link>
          <Link
            href="/contacto"
            className="text-sm font-medium text-brand hover:text-accent transition-colors"
          >
            Contacto
          </Link>
        </div>

        {/* Lado derecho: Search bar + Dashboard link */}
        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar productos..."
              className="w-[200px] pl-9 md:w-[250px]"
              disabled
            />
          </div>
          <Button
            asChild
            variant="ghost"
            size="icon"
            className="h-10 w-10"
            aria-label="Panel de administración"
          >
            <Link href="/admin/dashboard">
              <Shield className="h-5 w-5 text-brand" />
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}

