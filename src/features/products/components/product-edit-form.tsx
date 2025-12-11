"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, type ProductFormData } from "../schemas/product.schema";
import { useUpdateProductMutation } from "../hooks/use-products";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X, Save, XCircle } from "lucide-react";
import type { Product } from "../types";

interface ProductEditFormProps {
  product: Product;
  onCancel: () => void;
  onSuccess?: () => void;
}

export function ProductEditForm({ product, onCancel, onSuccess }: ProductEditFormProps) {
  const [images, setImages] = useState<string[]>(product.images && product.images.length > 0 ? product.images : [""]);
  const [videos, setVideos] = useState<string[]>(product.videos && product.videos.length > 0 ? product.videos : [""]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const updateMutation = useUpdateProductMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
    watch,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price,
      images: product.images || [],
      videos: product.videos || [],
      measurements: product.measurements,
      featured: product.featured || false,
      category: product.category || "",
      stock: product.stock || 0,
    },
  });

  const featuredValue = watch("featured");

  useEffect(() => {
    setValue("images", product.images || []);
    setValue("videos", product.videos || []);
    setValue("featured", product.featured || false);
    setValue("category", product.category || "");
    setValue("stock", product.stock || 0);
  }, [product, setValue]);

  const addImage = () => {
    setImages([...images, ""]);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    setValue("images", newImages.filter((img) => img.trim() !== ""));
  };

  const updateImage = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
    setValue("images", newImages.filter((img) => img.trim() !== ""));
  };

  const addVideo = () => {
    setVideos([...videos, ""]);
  };

  const removeVideo = (index: number) => {
    const newVideos = videos.filter((_, i) => i !== index);
    setVideos(newVideos);
    setValue("videos", newVideos.filter((vid) => vid.trim() !== ""));
  };

  const updateVideo = (index: number, value: string) => {
    const newVideos = [...videos];
    newVideos[index] = value;
    setVideos(newVideos);
    setValue("videos", newVideos.filter((vid) => vid.trim() !== ""));
  };

  const onSubmit = async (data: ProductFormData) => {
    setError(null);
    setSuccess(false);

    try {
      await updateMutation.mutateAsync({ id: product.id, data });
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onSuccess?.();
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al actualizar el producto");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 bg-muted/30 rounded-lg border border-border theme-transition">
      {/* Nombre */}
      <div className="space-y-2">
        <Label htmlFor={`name-${product.id}`} className="text-foreground theme-transition">
          Nombre del Producto
        </Label>
        <Input
          id={`name-${product.id}`}
          {...register("name")}
          className="bg-background border-input text-foreground focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:border-accent/30 theme-transition"
          placeholder="Ej: Silla Ergonómica"
        />
        {errors.name && (
          <p className="text-sm text-destructive theme-transition">{errors.name.message}</p>
        )}
      </div>

      {/* Descripción */}
      <div className="space-y-2">
        <Label htmlFor={`description-${product.id}`} className="text-foreground theme-transition">
          Descripción
        </Label>
        <Textarea
          id={`description-${product.id}`}
          {...register("description")}
          className="bg-background border-input text-foreground focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:border-accent/30 theme-transition min-h-[80px]"
          placeholder="Describe el producto..."
        />
        {errors.description && (
          <p className="text-sm text-destructive theme-transition">{errors.description.message}</p>
        )}
      </div>

      {/* Precio */}
      <div className="space-y-2">
        <Label htmlFor={`price-${product.id}`} className="text-foreground theme-transition">
          Precio
        </Label>
        <Input
          id={`price-${product.id}`}
          type="number"
          step="0.01"
          {...register("price", { valueAsNumber: true })}
          className="bg-background border-input text-foreground focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:border-accent/30 theme-transition"
          placeholder="0.00"
        />
        {errors.price && (
          <p className="text-sm text-destructive theme-transition">{errors.price.message}</p>
        )}
      </div>

      {/* Imágenes */}
      <div className="space-y-2">
        <Label className="text-foreground theme-transition">Imágenes (URLs)</Label>
        <div className="space-y-2">
          {images.map((image, index) => (
            <div key={index} className="flex gap-2">
              <Input
                type="url"
                value={image}
                onChange={(e) => updateImage(index, e.target.value)}
                className="bg-background border-input text-foreground focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:border-accent/30 theme-transition"
                placeholder="https://ejemplo.com/imagen.jpg"
              />
              {images.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeImage(index)}
                  className="border-border text-foreground hover:bg-muted theme-transition"
                >
                  <X className="h-4 w-4 text-foreground theme-transition" />
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={addImage}
            className="w-full sm:w-auto border-border text-foreground hover:bg-muted theme-transition"
          >
            <Plus className="h-4 w-4 mr-2 text-foreground theme-transition" />
            Agregar Imagen
          </Button>
        </div>
        {errors.images && (
          <p className="text-sm text-destructive theme-transition">{errors.images.message}</p>
        )}
      </div>

      {/* Videos */}
      <div className="space-y-2">
        <Label className="text-foreground theme-transition">Videos (URLs)</Label>
        <div className="space-y-2">
          {videos.map((video, index) => (
            <div key={index} className="flex gap-2">
              <Input
                type="url"
                value={video}
                onChange={(e) => updateVideo(index, e.target.value)}
                className="bg-background border-input text-foreground focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:border-accent/30 theme-transition"
                placeholder="https://ejemplo.com/video.mp4"
              />
              {videos.length > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeVideo(index)}
                  className="border-border text-foreground hover:bg-muted theme-transition"
                >
                  <X className="h-4 w-4 text-foreground theme-transition" />
                </Button>
              )}
            </div>
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={addVideo}
            className="w-full sm:w-auto border-border text-foreground hover:bg-muted theme-transition"
          >
            <Plus className="h-4 w-4 mr-2 text-foreground theme-transition" />
            Agregar Video
          </Button>
        </div>
        {errors.videos && (
          <p className="text-sm text-destructive theme-transition">{errors.videos.message}</p>
        )}
      </div>

      {/* Medida */}
      <div className="space-y-2">
        <Label htmlFor={`measurements-${product.id}`} className="text-foreground theme-transition">
          Medida
        </Label>
        <Input
          id={`measurements-${product.id}`}
          {...register("measurements")}
          className="bg-background border-input text-foreground focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:border-accent/30 theme-transition"
          placeholder="Ej: 50cm x 40cm x 30cm"
        />
        {errors.measurements && (
          <p className="text-sm text-destructive theme-transition">{errors.measurements.message}</p>
        )}
      </div>

      {/* Categoría */}
      <div className="space-y-2">
        <Label htmlFor={`category-${product.id}`} className="text-foreground theme-transition">
          Categoría
        </Label>
        <Input
          id={`category-${product.id}`}
          {...register("category")}
          className="bg-background border-input text-foreground focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:border-accent/30 theme-transition"
          placeholder="Ej: Sillas, Mesas, Sofás..."
        />
        {errors.category && (
          <p className="text-sm text-destructive theme-transition">{errors.category.message}</p>
        )}
      </div>

      {/* Stock */}
      <div className="space-y-2">
        <Label htmlFor={`stock-${product.id}`} className="text-foreground theme-transition">
          Stock
        </Label>
        <Input
          id={`stock-${product.id}`}
          type="number"
          min="0"
          step="1"
          {...register("stock", { valueAsNumber: true })}
          className="bg-background border-input text-foreground focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:border-accent/30 theme-transition"
          placeholder="0"
        />
        {errors.stock && (
          <p className="text-sm text-destructive theme-transition">{errors.stock.message}</p>
        )}
      </div>

      {/* Producto Destacado */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id={`featured-${product.id}`}
          {...register("featured")}
          checked={featuredValue}
          className="h-4 w-4 rounded border-input bg-background text-accent focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 cursor-pointer theme-transition"
        />
        <Label htmlFor={`featured-${product.id}`} className="text-foreground cursor-pointer theme-transition">
          Marcar como producto destacado
        </Label>
      </div>
      {errors.featured && (
        <p className="text-sm text-destructive theme-transition">{errors.featured.message}</p>
      )}

      {/* Mensajes de error y éxito */}
      {error && (
        <div className="p-3 rounded-md bg-destructive/10 border border-destructive text-destructive text-sm theme-transition">
          {error}
        </div>
      )}

      {success && (
        <div className="p-3 rounded-md bg-accent-support/10 dark:bg-accent-support/20 border border-accent-support/50 dark:border-accent-support/40 text-accent-support dark:text-accent-support/90 text-sm theme-transition">
          Producto actualizado exitosamente
        </div>
      )}

      {/* Botones de acción */}
      <div className="flex flex-col sm:flex-row gap-2 pt-2">
        <Button
          type="submit"
          disabled={updateMutation.isPending}
          className="flex-1 sm:flex-initial bg-accent text-foreground hover:bg-accent/90 shadow-sm hover:shadow-md transition-all duration-200 theme-transition"
        >
          <Save className="h-4 w-4 mr-2" />
          {updateMutation.isPending ? "Guardando..." : "Guardar Cambios"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1 sm:flex-initial border-border text-foreground hover:bg-muted theme-transition"
        >
          <XCircle className="h-4 w-4 mr-2" />
          Cancelar
        </Button>
      </div>
    </form>
  );
}

