"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { colorSchema, type ColorFormData } from "../schemas/color.schema";
import { useCreateColorMutation } from "../hooks/use-colors";
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

export function ColorForm() {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const createMutation = useCreateColorMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ColorFormData>({
    resolver: zodResolver(colorSchema),
    defaultValues: {
      available: true,
    },
  });

  const hexCodeValue = watch("hex_code");
  const availableValue = watch("available");

  const onSubmit = async (data: ColorFormData) => {
    setError(null);
    setSuccess(false);

    try {
      await createMutation.mutateAsync(data);
      setSuccess(true);
      reset();
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error al crear el color"
      );
    }
  };

  return (
    <Card className="bg-card border-border theme-transition">
      <CardHeader>
        <CardTitle className="text-foreground theme-transition">
          Agregar Color Nuevo
        </CardTitle>
        <CardDescription className="text-muted-foreground theme-transition">
          Completa el formulario para agregar un nuevo color disponible
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Nombre */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-foreground theme-transition">
              Nombre del Color
            </Label>
            <Input
              id="name"
              {...register("name")}
              className="bg-background border-input text-foreground focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:border-accent/30 theme-transition"
              placeholder="Ej: Rojo, Azul, Verde..."
            />
            {errors.name && (
              <p className="text-sm text-destructive theme-transition">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Código Hexadecimal */}
          <div className="space-y-2">
            <Label
              htmlFor="hex_code"
              className="text-foreground theme-transition"
            >
              Código Hexadecimal
            </Label>
            <div className="flex gap-3 items-start">
              <div className="flex-1 space-y-2">
                <Input
                  id="hex_code"
                  {...register("hex_code")}
                  className="bg-background border-input text-foreground focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:border-accent/30 theme-transition font-mono"
                  placeholder="#FF0000 o #F00"
                  maxLength={7}
                />
                {errors.hex_code && (
                  <p className="text-sm text-destructive theme-transition">
                    {errors.hex_code.message}
                  </p>
                )}
              </div>
              {/* Vista previa del color */}
              {hexCodeValue && /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hexCodeValue) && (
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-md border-2 border-border shadow-sm theme-transition flex-shrink-0"
                  style={{
                    backgroundColor: hexCodeValue,
                  }}
                  title={`Vista previa: ${hexCodeValue.toUpperCase()}`}
                />
              )}
            </div>
          </div>

          {/* Disponible */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="available"
              {...register("available")}
              checked={availableValue}
              className="h-4 w-4 rounded border-input bg-background text-accent focus:ring-2 focus:ring-accent/50 focus:ring-offset-2 cursor-pointer theme-transition"
            />
            <Label
              htmlFor="available"
              className="text-foreground cursor-pointer theme-transition"
            >
              Disponible (con stock)
            </Label>
          </div>
          {errors.available && (
            <p className="text-sm text-destructive theme-transition">
              {errors.available.message}
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
              Color creado exitosamente
            </div>
          )}

          {/* Botón de envío */}
          <Button
            type="submit"
            disabled={createMutation.isPending}
            className="w-full sm:w-auto bg-accent text-foreground hover:bg-accent/90 shadow-sm hover:shadow-md transition-all duration-200 theme-transition"
          >
            {createMutation.isPending ? "Creando..." : "Crear Color"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

