import { createClient } from "@/lib/supabase/client";
import type { ProductFormData } from "../schemas/product.schema";
import type { Product } from "../types";

export async function createProduct(data: ProductFormData) {
  const supabase = createClient();

  const { data: product, error } = await supabase
    .from("products")
    .insert([
      {
        name: data.name,
        description: data.description,
        price: data.price,
        images: data.images || [],
        videos: data.videos || [],
        measurements: data.measurements,
        featured: data.featured || false,
        category: data.category,
        stock: data.stock || 0,
        created_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(`Error al crear el producto: ${error.message}`);
  }

  return product;
}

export async function getProducts(): Promise<Product[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Error al obtener productos: ${error.message}`);
  }

  return data || [];
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("featured", true)
    .order("created_at", { ascending: false })
    .limit(4);

  if (error) {
    throw new Error(`Error al obtener productos destacados: ${error.message}`);
  }

  return data || [];
}

export async function getProductById(id: string): Promise<Product> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(`Error al obtener el producto: ${error.message}`);
  }

  return data;
}

export async function updateProduct(id: string, data: ProductFormData): Promise<Product> {
  const supabase = createClient();

  const { data: product, error } = await supabase
    .from("products")
    .update({
      name: data.name,
      description: data.description,
      price: data.price,
      images: data.images || [],
      videos: data.videos || [],
      measurements: data.measurements,
      featured: data.featured || false,
      category: data.category,
      stock: data.stock || 0,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(`Error al actualizar el producto: ${error.message}`);
  }

  return product;
}

