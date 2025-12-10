// ProductColorId ahora es dinámico, viene de la base de datos
export type ProductColorId = string;

export interface ProductColorOption {
  id: ProductColorId;
  label: string;
  hex: string;
}
