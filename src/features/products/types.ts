export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images?: string[];
  videos?: string[];
  measurements: string;
  featured?: boolean;
  category: string;
  stock?: number;
  created_at: string;
  updated_at?: string;
}
