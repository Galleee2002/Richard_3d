import { createClient } from "@/lib/supabase/client";
import type { ColorFormData } from "../schemas/color.schema";
import type { Color } from "../types";

export async function createColor(data: ColorFormData): Promise<Color> {
  const supabase = createClient();

  const { data: color, error } = await supabase
    .from("colors")
    .insert([
      {
        name: data.name,
        hex_code: data.hex_code.toUpperCase(),
        available: data.available ?? true,
        created_at: new Date().toISOString(),
      },
    ])
    .select()
    .single();

  if (error) {
    throw new Error(`Error al crear el color: ${error.message}`);
  }

  return color;
}

export async function getColors(): Promise<Color[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("colors")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Error al obtener colores: ${error.message}`);
  }

  return data || [];
}

export async function updateColor(
  id: string,
  data: Partial<ColorFormData>
): Promise<Color> {
  const supabase = createClient();

  const updateData: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  if (data.name !== undefined) {
    updateData.name = data.name;
  }
  if (data.hex_code !== undefined) {
    updateData.hex_code = data.hex_code.toUpperCase();
  }
  if (data.available !== undefined) {
    updateData.available = data.available;
  }

  const { data: color, error } = await supabase
    .from("colors")
    .update(updateData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(`Error al actualizar el color: ${error.message}`);
  }

  return color;
}

export async function deleteColor(id: string): Promise<void> {
  const supabase = createClient();

  const { error } = await supabase.from("colors").delete().eq("id", id);

  if (error) {
    throw new Error(`Error al eliminar el color: ${error.message}`);
  }
}

export async function toggleColorAvailability(
  id: string,
  available: boolean
): Promise<Color> {
  const supabase = createClient();

  const { data: color, error } = await supabase
    .from("colors")
    .update({
      available,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select()
    .single();

  if (error) {
    throw new Error(
      `Error al actualizar la disponibilidad del color: ${error.message}`
    );
  }

  return color;
}

