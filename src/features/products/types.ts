import type { ProductColorId } from "./types/product-color";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  colors: ProductColorId[];
  images?: string[];
  videos?: string[];
  measurements: string;
  featured?: boolean;
  category: string;
  stock?: number;
  created_at: string;
  updated_at?: string;
}
