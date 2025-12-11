import { z } from "zod";

const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

export const colorSchema = z.object({
  name: z
    .string()
    .min(1, "El nombre del color es requerido")
    .max(100, "El nombre es demasiado largo"),
  hex_code: z
    .string()
    .min(1, "El código hexadecimal es requerido")
    .regex(hexColorRegex, "Debe ser un código hexadecimal válido (ej: #FF0000 o #F00)"),
  available: z.boolean().default(true),
});

export type ColorFormData = z.infer<typeof colorSchema>;

