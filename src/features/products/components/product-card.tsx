"use client";

import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images && product.images.length > 0 ? product.images[0] : null;

  return (
    <Link href={`/products/${product.id}`} className="block h-full">
      <Card className="h-full bg-card border-border hover:border-accent/50 transition-all duration-200 theme-transition group overflow-hidden">
        <div className="relative w-full aspect-square bg-muted/30 overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground theme-transition">
              <span className="text-sm">Sin imagen</span>
            </div>
          )}
        </div>
        <CardContent className="p-4 space-y-2">
          <h3 className="font-heading font-semibold text-foreground text-base sm:text-lg line-clamp-2 theme-transition">
            {product.name}
          </h3>
          <p className="text-muted-foreground text-sm line-clamp-2 theme-transition">
            {product.description}
          </p>
          <div className="flex items-center justify-between pt-2">
            <span className="text-accent font-semibold text-lg sm:text-xl theme-transition">
              ${product.price.toFixed(2)}
            </span>
            {product.colors && product.colors.length > 0 && (
              <span className="text-xs text-muted-foreground theme-transition">
                {product.colors.length} {product.colors.length === 1 ? "color" : "colores"}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

