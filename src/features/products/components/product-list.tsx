"use client";

import { useState } from "react";
import { useProductsQuery } from "../hooks/use-products";
import { ProductEditForm } from "./product-edit-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit2, Loader2, Package } from "lucide-react";
import type { Product } from "../types";
import { useInquiry } from "@/features/inquiry/inquiry-context";
import type { Product as InquiryProduct } from "@/features/inquiry/types";

export function ProductList() {
  const { data: products, isLoading, error } = useProductsQuery();
  const [editingId, setEditingId] = useState<string | null>(null);
  const { addItem } = useInquiry();

  const handleAddToInquiry = (product: Product) => {
    const inquiryProduct: InquiryProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.images && product.images.length > 0 ? product.images[0] : undefined,
    };
    addItem(inquiryProduct);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground theme-transition" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-md bg-destructive/10 border border-destructive text-destructive text-sm theme-transition">
        Error al cargar productos: {error instanceof Error ? error.message : "Error desconocido"}
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="h-12 w-12 mx-auto mb-4 text-muted-foreground theme-transition" />
        <p className="text-muted-foreground theme-transition">No hay productos registrados</p>
      </div>
    );
  }

  const handleEditSuccess = () => {
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      {products.map((product) => (
        <Card key={product.id} className="bg-card border-border hover:border-accent/30 transition-colors duration-200 theme-transition">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-foreground theme-transition">{product.name}</CardTitle>
                <CardDescription className="text-muted-foreground theme-transition mt-1">
                  {product.description}
                </CardDescription>
              </div>
              {editingId !== product.id && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setEditingId(product.id)}
                  className="border-border text-foreground hover:bg-accent/10 hover:border-accent/50 hover:text-accent transition-all duration-200 theme-transition flex-shrink-0"
                >
                  <Edit2 className="h-4 w-4 text-foreground theme-transition" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {editingId === product.id ? (
              <ProductEditForm
                product={product}
                onCancel={() => setEditingId(null)}
                onSuccess={handleEditSuccess}
              />
            ) : (
              <div className="space-y-3 text-sm">
                <div className="flex flex-wrap gap-4">
                  <div>
                    <span className="text-muted-foreground theme-transition">Precio: </span>
                    <span className="text-accent font-semibold theme-transition">
                      ${product.price.toFixed(2)}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground theme-transition">Medida: </span>
                    <span className="text-foreground theme-transition">{product.measurements}</span>
                  </div>
                </div>
                {product.colors && product.colors.length > 0 && (
                  <div>
                    <span className="text-muted-foreground theme-transition">Colores: </span>
                    <span className="text-foreground theme-transition">
                      {product.colors.join(", ")}
                    </span>
                  </div>
                )}
                {product.images && product.images.length > 0 && (
                  <div>
                    <span className="text-muted-foreground theme-transition">Imágenes: </span>
                    <span className="text-foreground theme-transition">
                      {product.images.length} {product.images.length === 1 ? "imagen" : "imágenes"}
                    </span>
                  </div>
                )}
                {product.videos && product.videos.length > 0 && (
                  <div>
                    <span className="text-muted-foreground theme-transition">Videos: </span>
                    <span className="text-foreground theme-transition">
                      {product.videos.length} {product.videos.length === 1 ? "video" : "videos"}
                    </span>
                  </div>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-2 w-full theme-transition"
                  onClick={() => handleAddToInquiry(product)}
                >
                  Agregar a consultas
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

