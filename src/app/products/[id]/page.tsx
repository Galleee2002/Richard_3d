"use client";

import { useParams } from "next/navigation";
import { useProductByIdQuery } from "@/features/products/hooks/use-products";
import { mockProducts } from "@/features/products/data/mock-products";
import { ProductCardSkeleton } from "@/features/products/components/product-card-skeleton";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { ArrowLeft, ShoppingCart, Package } from "lucide-react";
import Link from "next/link";
import { useInquiry } from "@/features/inquiry/inquiry-context";
import type { Product as InquiryProduct } from "@/features/inquiry/types";
import { useMemo } from "react";

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id as string;
  const { data: product, isLoading, error } = useProductByIdQuery(productId);
  const { addItem } = useInquiry();

  // Si no hay datos de Supabase, buscar en mock
  const displayProduct = useMemo(() => {
    if (product) return product;
    return mockProducts.find(p => p.id === productId);
  }, [product, productId]);

  const handleAddToInquiry = () => {
    if (!displayProduct) return;
    
    const inquiryProduct: InquiryProduct = {
      id: displayProduct.id,
      name: displayProduct.name,
      price: displayProduct.price,
      imageUrl: displayProduct.images && displayProduct.images.length > 0 ? displayProduct.images[0] : undefined,
    };
    addItem(inquiryProduct);
  };

  if (isLoading && !displayProduct) {
    return (
      <main className="min-h-screen bg-background theme-transition">
        <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ProductCardSkeleton />
              <div className="space-y-4">
                <div className="h-8 bg-muted rounded animate-pulse" />
                <div className="h-24 bg-muted rounded animate-pulse" />
                <div className="h-12 bg-muted rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error && !displayProduct) {
    return (
      <main className="min-h-screen bg-background theme-transition">
        <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="p-4 rounded-md bg-destructive/10 border border-destructive text-destructive text-sm theme-transition">
              Error al cargar el producto: {error instanceof Error ? error.message : "Error desconocido"}
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!displayProduct) {
    return (
      <main className="min-h-screen bg-background theme-transition">
        <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center py-12">
              <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground theme-transition" />
              <p className="text-muted-foreground theme-transition">Producto no encontrado</p>
              <Link href="/products">
                <Button variant="outline" className="mt-4 border-border text-foreground hover:bg-muted theme-transition">
                  Volver a productos
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const mainImage = displayProduct.images && displayProduct.images.length > 0 ? displayProduct.images[0] : null;
  const stock = displayProduct.stock ?? 0;
  const isInStock = stock > 0;

  return (
    <main className="min-h-screen bg-background theme-transition">
      <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Botón volver */}
          <Link href="/products">
            <Button
              variant="ghost"
              className="mb-6 text-foreground hover:bg-muted theme-transition"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Volver a productos
            </Button>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Imagen del producto */}
            <div className="relative w-full aspect-square bg-muted/30 rounded-lg overflow-hidden">
              {mainImage ? (
                <Image
                  src={mainImage}
                  alt={displayProduct.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground theme-transition">
                  <span>Sin imagen</span>
                </div>
              )}
            </div>

            {/* Información del producto */}
            <div className="space-y-6">
              <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-4 theme-transition">
                  {displayProduct.name}
                </h1>
                <p className="text-3xl sm:text-4xl font-semibold text-accent mb-6 theme-transition">
                  ${displayProduct.price.toFixed(2)}
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-2 theme-transition">
                    Descripción
                  </h2>
                  <p className="text-muted-foreground leading-relaxed theme-transition">
                    {displayProduct.description}
                  </p>
                </div>

                {/* Colores */}
                {displayProduct.colors && displayProduct.colors.length > 0 && (
                  <div>
                    <h2 className="text-lg font-semibold text-foreground mb-3 theme-transition">
                      Colores disponibles
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {displayProduct.colors.map((color, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 rounded-md bg-muted text-foreground text-sm border border-border theme-transition"
                        >
                          {color}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Medidas */}
                {displayProduct.measurements && (
                  <div>
                    <h2 className="text-lg font-semibold text-foreground mb-2 theme-transition">
                      Medidas
                    </h2>
                    <p className="text-muted-foreground theme-transition">
                      {displayProduct.measurements}
                    </p>
                  </div>
                )}

                {/* Stock */}
                <div>
                  <h2 className="text-lg font-semibold text-foreground mb-2 theme-transition">
                    Stock disponible
                  </h2>
                  <div className="flex items-center gap-2">
                    <div className={`px-4 py-2 rounded-md font-semibold text-sm theme-transition ${
                      isInStock 
                        ? "bg-accent-support/10 dark:bg-accent-support/20 text-accent-support dark:text-accent-support/90 border border-accent-support/50 dark:border-accent-support/40" 
                        : "bg-destructive/10 text-destructive border border-destructive/50"
                    }`}>
                      {isInStock ? `${stock} unidades disponibles` : "Sin stock"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón añadir a consultas */}
              <Button
                onClick={handleAddToInquiry}
                disabled={!isInStock}
                className="w-full sm:w-auto bg-accent text-foreground hover:bg-accent/90 shadow-sm hover:shadow-md transition-all duration-200 theme-transition disabled:opacity-50 disabled:cursor-not-allowed"
                size="lg"
              >
                <ShoppingCart className="h-5 w-5 mr-2" />
                {isInStock ? "Añadir a lista de consultas" : "Producto sin stock"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

