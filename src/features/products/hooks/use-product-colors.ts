"use client";

import { useQuery } from "@tanstack/react-query";
import { getProductColors } from "../services/product-color.service";
import type { ProductColor } from "../services/product-color.service";

export function useProductColorsQuery() {
  return useQuery<ProductColor[]>({
    queryKey: ["product-colors", "list"],
    queryFn: getProductColors,
  });
}
