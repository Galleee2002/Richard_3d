"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, type ProductFormData } from "../schemas/product.schema";
import { useCreateProductMutation } from "../hooks/use-products";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X } from "lucide-react";

export function ProductForm() {
  const [images, setImages] = useState<string[]>([""]);
  const [videos, setVideos] = useState<string[]>([""]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createMutation = useCreateProductMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
    watch,
  } = useForm<ProductFormData>({
    // @ts-expect-error - Zod infiere tipos opcionales para campos con default,
    // pero react-hook-form espera tipos requeridos. El código funciona correctamente en runtime.
    resolver: zodResolver(productSchema),
    defaultValues: {
      images: [],
      videos: [],
      featured: false,
      category: "",
      stock: 0,
    },
  });

  const featuredValue = watch("featured");

  const addImage = () => {
    setImages([...images, ""]);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    setValue(
      "images",
      newImages.filter((img) => img.trim() !== "")
    );
  };

  const updateImage = (index: number, value: string) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
    setValue(
      "images",
      newImages.filter((img) => img.trim() !== "")
    );
  };

  const addVideo = () => {
    setVideos([...videos, ""]);
  };

  const removeVideo = (index: number) => {
    const newVideos = videos.filter((_, i) => i !== index);
    setVideos(newVideos);
    setValue(
      "videos",
      newVideos.filter((vid) => vid.trim() !== "")
    );
  };

  const updateVideo = (index: number, value: string) => {
    const newVideos = [...videos];
    newVideos[index] = value;
    setVideos(newVideos);
    setValue(
      "videos",
      newVideos.filter((vid) => vid.trim() !== "")
    );
  };

  const onSubmit = async (data: ProductFormData) => {
    setError(null);
    setSuccess(false);

    try {
      await createMutation.mutateAsync(data);
      setSuccess(true);
      reset();
      setImages([""]);
      setVideos([""]);
      setValue("featured", false);
      setValue("category", "");
      setValue("stock", 0);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al crear el producto"
      );
    }
  };

  return (
    <Card className="bg-card border-border theme-transition">
      <CardHeader>
        <CardTitle className="text-foreground theme-transition">
          Agregar Producto Nuevo
        </CardTitle>
        <CardDescription className="text-muted-foreground theme-transition">
          Completa el formulario para agregar un nuevo producto
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* @ts-expect-error - Mismo problema de tipos entre Zod y react-hook-form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Nombre */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground theme-transition">
              Nombre del Producto
            </Label>
            <Input
              id="name"
              {...register("name")}
              className="bg-background border-input text-foreground focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:border-accent/30 theme-transition"
              placeholder="Ej: Silla Ergonómica"
            />
            {errors.name && (
              <p className="text-sm text-destructive theme-transition">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Descripción */}
          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-foreground theme-transition"
            >
              Descripción
            </Label>
            <Textarea
              id="description"
              {...register("description")}
              className="bg-background border-input text-foreground focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:border-accent/30 theme-transition min-h-[100px]"
              placeholder="Describe el producto..."
            />
            {errors.description && (
              <p className="text-sm text-destructive theme-transition">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Precio */}
          <div className="space-y-2">
            <Label htmlFor="price" className="text-foreground theme-transition">
              Precio
            </Label>
            <Input
              id="price"
              type="number"
              step="0.01"
              {...register("price", { valueAsNumber: true })}
              className="bg-background border-input text-foreground focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:border-accent/30 theme-transition"
              placeholder="0.00"
            />
            {errors.price && (
              <p className="text-sm text-destructive theme-transition">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Imágenes */}
          <div className="space-y-2">
            <Label className="text-foreground theme-transition">
              Imágenes (URLs)
            </Label>
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
                      className="border-border theme-transition"
                    >
                      <X className="h-4 w-4" />
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
              <p className="text-sm text-destructive theme-transition">
                {errors.images.message}
              </p>
            )}
          </div>

          {/* Videos */}
          <div className="space-y-2">
            <Label className="text-foreground theme-transition">
              Videos (URLs)
            </Label>
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
                      className="border-border theme-transition"
                    >
                      <X className="h-4 w-4" />
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
              <p className="text-sm text-destructive theme-transition">
                {errors.videos.message}
              </p>
            )}
          </div>

          {/* Medida */}
          <div className="space-y-2">
            <Label
              htmlFor="measurements"
              className="text-foreground theme-transition"
            >
              Medida
            </Label>
            <Input
              id="measurements"
              {...register("measurements")}
              className="bg-background border-input text-foreground focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:border-accent/30 theme-transition"
              placeholder="Ej: 50cm x 40cm x 30cm"
            />
            {errors.measurements && (
              <p className="text-sm text-destructive theme-transition">
                {errors.measurements.message}
              </p>
            )}
          </div>

          {/* Categoría */}
          <div className="space-y-2">
            <Label
              htmlFor="category"
              className="text-foreground theme-transition"
            >
              Categoría
            </Label>
            <Input
              id="category"
              {...register("category")}
              className="bg-background border-input text-foreground focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:border-accent/30 theme-transition"
              placeholder="Ej: Sillas, Mesas, Sofás..."
            />
            {errors.category && (
              <p className="text-sm text-destructive theme-transition">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Stock */}
          <div className="space-y-2">
            <Label htmlFor="stock" className="text-foreground theme-transition">
              Stock
            </Label>
            <Input
              id="stock"
              type="number"
              min="0"
              step="1"
              {...register("stock", { valueAsNumber: true })}
              className="bg-background border-input text-foreground focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:border-accent/30 theme-transition"
              placeholder="0"
            />
            {errors.stock && (
              <p className="text-sm text-destructive theme-transition">
                {errors.stock.message}
              </p>
            )}
          </div>

          {/* Producto Destacado */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="featured"
              {...register("featured")}
              checked={featuredValue}
              className="h-4 w-4 rounded border-input bg-background text-accent focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 cursor-pointer theme-transition"
            />
            <Label
              htmlFor="featured"
              className="text-foreground cursor-pointer theme-transition"
            >
              Marcar como producto destacado
            </Label>
          </div>
          {errors.featured && (
            <p className="text-sm text-destructive theme-transition">
              {errors.featured.message}
            </p>
          )}

          {/* Mensajes de error y éxito */}
          {error && (
            <div className="p-3 rounded-md bg-destructive/10 border border-destructive text-destructive text-sm theme-transition">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 rounded-md bg-accent-support/10 dark:bg-accent-support/20 border border-accent-support/50 dark:border-accent-support/40 text-accent-support dark:text-accent-support/90 text-sm theme-transition">
              Producto creado exitosamente
            </div>
          )}

          {/* Botón de envío */}
          <Button
            type="submit"
            disabled={createMutation.isPending}
            className="w-full sm:w-auto bg-accent text-foreground hover:bg-accent/90 shadow-sm hover:shadow-md transition-all duration-200 theme-transition"
          >
            {createMutation.isPending ? "Creando..." : "Crear Producto"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
