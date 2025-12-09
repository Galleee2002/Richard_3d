"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProducts, getProductById, createProduct, updateProduct, getFeaturedProducts } from "../services/product.service";
import type { ProductFormData } from "../schemas/product.schema";
import type { Product } from "../types";

export function useProductsQuery() {
  return useQuery({
    queryKey: ["products", "list"],
    queryFn: getProducts,
  });
}

export function useFeaturedProductsQuery() {
  return useQuery({
    queryKey: ["products", "featured"],
    queryFn: getFeaturedProducts,
  });
}

export function useProductByIdQuery(id: string) {
  return useQuery({
    queryKey: ["products", "by-id", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
}

export function useCreateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", "list"] });
      queryClient.invalidateQueries({ queryKey: ["products", "featured"] });
    },
  });
}

export function useUpdateProductMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ProductFormData }) =>
      updateProduct(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products", "list"] });
      queryClient.invalidateQueries({ queryKey: ["products", "by-id", variables.id] });
      queryClient.invalidateQueries({ queryKey: ["products", "featured"] });
    },
  });
}

