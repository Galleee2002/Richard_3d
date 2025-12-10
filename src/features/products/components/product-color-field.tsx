"use client";

import { Controller, type Control, type FieldPath, type FieldValues } from "react-hook-form";
import { ColorPicker } from "./color-picker";
import { Label } from "@/components/ui/label";
import type { ProductColorId } from "../types/product-color";

interface ProductColorFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  className?: string;
}

export function ProductColorField<T extends FieldValues>({
  control,
  name,
  label = "Colores",
  className,
}: ProductColorFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className={className}>
          <Label className="text-foreground theme-transition mb-2 block">
            {label}
          </Label>
          <ColorPicker value={field.value || []} onChange={field.onChange} />
          {fieldState.error && (
            <p className="text-sm text-destructive theme-transition mt-2">
              {fieldState.error.message}
            </p>
          )}
        </div>
      )}
    />
  );
}

