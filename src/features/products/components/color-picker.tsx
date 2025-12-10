"use client";

import { useMemo } from "react";
import { ColorSwatch } from "./color-swatch";
import { useProductColorsQuery } from "../hooks/use-product-colors";
import type { ProductColorId, ProductColorOption } from "../types/product-color";
import { cn } from "@/lib/utils";

interface ColorPickerProps {
  value: ProductColorId[];
  onChange: (value: ProductColorId[]) => void;
  className?: string;
}

/**
 * Ordena los colores seleccionados según el orden de la base de datos
 */
function sortColorsByDisplayOrder(
  colorIds: ProductColorId[],
  availableColors: ProductColorOption[]
): ProductColorId[] {
  return availableColors
    .filter((color) => colorIds.includes(color.id))
    .map((color) => color.id);
}

export function ColorPicker({ value, onChange, className }: ColorPickerProps) {
  const { data: colors = [], isLoading } = useProductColorsQuery();

  // Convertir ProductColor a ProductColorOption
  const colorOptions: ProductColorOption[] = useMemo(
    () =>
      colors.map((color) => ({
        id: color.id,
        label: color.label,
        hex: color.hex,
      })),
    [colors]
  );

  // Ordenar los colores seleccionados según el orden de la BD
  const sortedSelectedColors = useMemo(
    () => sortColorsByDisplayOrder(value, colorOptions),
    [value, colorOptions]
  );

  const handleToggle = (colorId: ProductColorId) => {
    const isSelected = sortedSelectedColors.includes(colorId);
    let newValue: ProductColorId[];

    if (isSelected) {
      // Remover el color
      newValue = sortedSelectedColors.filter((id) => id !== colorId);
    } else {
      // Agregar el color
      newValue = [...sortedSelectedColors, colorId];
    }

    // Reordenar según el orden de la BD antes de llamar a onChange
    const reordered = sortColorsByDisplayOrder(newValue, colorOptions);
    onChange(reordered);
  };

  if (isLoading) {
    return (
      <div className={cn("flex flex-wrap gap-2 sm:gap-3", className)}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-muted animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (colorOptions.length === 0) {
    return (
      <div className="text-sm text-muted-foreground theme-transition">
        No hay colores disponibles
      </div>
    );
  }

  return (
    <div className={cn("flex flex-wrap gap-2 sm:gap-3", className)}>
      {colorOptions.map((color) => (
        <ColorSwatch
          key={color.id}
          color={color}
          selected={sortedSelectedColors.includes(color.id)}
          onToggle={() => handleToggle(color.id)}
        />
      ))}
    </div>
  );
}

