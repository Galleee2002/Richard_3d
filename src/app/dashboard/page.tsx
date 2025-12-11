"use client";

import { ProductForm } from "@/features/products/components/product-form";
import { ProductList } from "@/features/products/components/product-list";
import { ColorForm } from "@/features/colors/components/color-form";
import { ColorList } from "@/features/colors/components/color-list";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus, Edit, Palette } from "lucide-react";

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-background theme-transition">
      <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-6 sm:mb-8 theme-transition">
            Dashboard Admin
          </h1>

          <Accordion type="single" collapsible className="w-full space-y-4">
            {/* Agregar Producto */}
            <AccordionItem
              value="add-product"
              className="border border-border rounded-lg px-4 bg-card hover:border-accent/30 transition-colors duration-200 theme-transition data-[state=open]:border-accent/50"
            >
              <AccordionTrigger className="text-foreground hover:no-underline theme-transition group data-[state=open]:text-accent">
                <div className="flex items-center gap-3">
                  <Plus className="h-5 w-5 text-foreground group-data-[state=open]:text-accent transition-colors duration-200 theme-transition" />
                  <span className="text-lg font-semibold">Agregar Producto Nuevo</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <ProductForm />
              </AccordionContent>
            </AccordionItem>

            {/* Modificar Producto */}
            <AccordionItem
              value="edit-product"
              className="border border-border rounded-lg px-4 bg-card hover:border-accent/30 transition-colors duration-200 theme-transition data-[state=open]:border-accent/50"
            >
              <AccordionTrigger className="text-foreground hover:no-underline theme-transition group data-[state=open]:text-accent">
                <div className="flex items-center gap-3">
                  <Edit className="h-5 w-5 text-foreground group-data-[state=open]:text-accent transition-colors duration-200 theme-transition" />
                  <span className="text-lg font-semibold">Modificar Producto</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4">
                <ProductList />
              </AccordionContent>
            </AccordionItem>

            {/* Gestionar Colores */}
            <AccordionItem
              value="manage-colors"
              className="border border-border rounded-lg px-4 bg-card hover:border-accent/30 transition-colors duration-200 theme-transition data-[state=open]:border-accent/50"
            >
              <AccordionTrigger className="text-foreground hover:no-underline theme-transition group data-[state=open]:text-accent">
                <div className="flex items-center gap-3">
                  <Palette className="h-5 w-5 text-foreground group-data-[state=open]:text-accent transition-colors duration-200 theme-transition" />
                  <span className="text-lg font-semibold">Gestionar Colores</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-4 space-y-6">
                <ColorForm />
                <ColorList />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </main>
  );
}
