"use client";

import { useFeaturedProductsQuery } from "../hooks/use-products";
import { ProductCard } from "./product-card";
import { ProductCardSkeleton } from "./product-card-skeleton";
import { mockFeaturedProducts } from "../data/mock-products";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function FeaturedProductsSection() {
  const { data: products, isLoading, error } = useFeaturedProductsQuery();
  
  // Usar datos mock si no hay datos de Supabase o hay error
  const displayProducts = products && products.length > 0 ? products : mockFeaturedProducts;

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-background theme-transition">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 sm:mb-10 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-foreground theme-transition">
              Productos Destacados
            </h2>
            {!isLoading && (
              <Link href="/products">
                <Button
                  variant="outline"
                  className="hidden sm:flex items-center gap-2 border-border text-foreground hover:bg-accent/10 hover:border-accent/50 hover:text-accent theme-transition"
                >
                  Más productos
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
            {isLoading ? (
              <>
                {Array.from({ length: 4 }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </>
            ) : (
              displayProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            )}
          </div>

          {!isLoading && (
            <div className="mt-8 sm:mt-10 flex justify-center sm:hidden">
              <Link href="/products" className="w-full sm:w-auto">
                <Button
                  variant="outline"
                  className="w-full items-center gap-2 border-border text-foreground hover:bg-accent/10 hover:border-accent/50 hover:text-accent theme-transition"
                >
                  Más productos
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

