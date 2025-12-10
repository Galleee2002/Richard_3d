"use client";

import type { ProductColorOption } from "../types/product-color";
import { cn } from "@/lib/utils";

interface ColorSwatchProps {
  color: ProductColorOption;
  selected: boolean;
  onToggle: () => void;
}

export function ColorSwatch({ color, selected, onToggle }: ColorSwatchProps) {
  return (
    <button
      type="button"
      role="button"
      aria-pressed={selected}
      aria-label={`Color ${color.label}`}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      className={cn(
        "w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent/50",
        selected
          ? "ring-2 ring-offset-2 ring-accent/50 border-foreground/20"
          : "border-border hover:border-foreground/30"
      )}
      style={{ backgroundColor: color.hex }}
    />
  );
}

