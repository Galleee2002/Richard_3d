import { z } from "zod";

const productSchemaBase = z.object({
  name: z
    .string()
    .min(1, "El nombre es requerido")
    .max(200, "El nombre es demasiado largo"),
  description: z
    .string()
    .min(1, "La descripción es requerida")
    .max(2000, "La descripción es demasiado larga"),
  price: z.number().positive("El precio debe ser mayor a 0"),
  images: z
    .array(z.string().url("Debe ser una URL válida"))
    .default([]),
  videos: z
    .array(z.string().url("Debe ser una URL válida"))
    .default([]),
  measurements: z
    .string()
    .min(1, "La medida es requerida")
    .max(100, "La medida es demasiado larga"),
  featured: z.boolean().default(false),
  category: z
    .string()
    .min(1, "La categoría es requerida")
    .max(100, "La categoría es demasiado larga"),
  stock: z.number().int().min(0, "El stock no puede ser negativo").default(0),
});

export const productSchema = productSchemaBase;

export type ProductFormData = Required<z.infer<typeof productSchemaBase>>;
