"use client";

import { useProductsQuery } from "@/features/products/hooks/use-products";
import { ProductCard } from "@/features/products/components/product-card";
import { ProductCardSkeleton } from "@/features/products/components/product-card-skeleton";
import { Package } from "lucide-react";
import { useMemo } from "react";

export default function ProductsPage() {
  const { data: products, isLoading, error } = useProductsQuery();

  const productsByCategory = useMemo(() => {
    if (!products || products.length === 0) return {};
    return products.reduce((acc, product) => {
      const category = product.category || "Sin categoría";
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {} as Record<string, typeof products>);
  }, [products]);

  const categories = Object.keys(productsByCategory).sort();

  if (error) {
    return (
      <main className="min-h-screen bg-background theme-transition">
        <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
          <div className="p-4 rounded-md bg-destructive/10 border border-destructive text-destructive text-sm theme-transition">
            Error al cargar productos: {error instanceof Error ? error.message : "Error desconocido"}
          </div>
        </div>
      </main>
    );
  }


  return (
    <main className="min-h-screen bg-background theme-transition">
      <div className="container mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-foreground mb-8 sm:mb-10 lg:mb-12 theme-transition">
            Todos los Productos
          </h1>

          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {Array.from({ length: 8 }).map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          ) : (
            <div className="space-y-12 sm:space-y-16 lg:space-y-20">
              {categories.map((category) => (
                <section key={category} className="space-y-6 sm:space-y-8">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-heading font-semibold text-foreground border-b border-border pb-2 theme-transition">
                    {category}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                    {productsByCategory[category].map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

