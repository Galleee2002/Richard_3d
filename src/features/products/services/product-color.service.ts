import { createClient } from "@/lib/supabase/client";

export interface ProductColor {
  id: string;
  label: string;
  hex: string;
  display_order: number;
  created_at: string;
  updated_at?: string;
}

export async function getProductColors(): Promise<ProductColor[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("product_colors")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    throw new Error(`Error al obtener colores: ${error.message}`);
  }

  return data || [];
}

