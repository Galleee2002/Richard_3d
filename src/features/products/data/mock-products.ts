import type { Product } from "../types";

export const mockProducts: Product[] = [
  {
    id: "mock-1",
    name: "Silla Ergonómica Premium",
    description: "Silla de diseño moderno con soporte lumbar ajustable, perfecta para espacios de trabajo y oficinas. Fabricada con materiales de alta calidad y acabados elegantes.",
    price: 299.99,
    colors: ["Negro", "Gris", "Blanco"],
    images: [
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop"
    ],
    videos: [],
    measurements: "60cm x 55cm x 120cm",
    featured: true,
    category: "Sillas",
    stock: 15,
    created_at: new Date().toISOString(),
  },
  {
    id: "mock-2",
    name: "Mesa de Centro Minimalista",
    description: "Mesa de centro con diseño minimalista y líneas limpias. Ideal para complementar cualquier espacio moderno. Disponible en múltiples acabados.",
    price: 189.50,
    colors: ["Nogal", "Blanco", "Negro mate"],
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=800&h=800&fit=crop"
    ],
    videos: [],
    measurements: "120cm x 60cm x 45cm",
    featured: true,
    category: "Mesas",
    stock: 8,
    created_at: new Date().toISOString(),
  },
  {
    id: "mock-3",
    name: "Sofá Modular Contemporáneo",
    description: "Sofá modular de 3 plazas con diseño contemporáneo. Tapizado en tela de alta resistencia, cómodo y elegante. Perfecto para salas de estar espaciosas.",
    price: 899.99,
    colors: ["Gris claro", "Beige", "Azul marino"],
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=800&h=800&fit=crop"
    ],
    videos: [],
    measurements: "220cm x 95cm x 85cm",
    featured: true,
    category: "Sofás",
    stock: 5,
    created_at: new Date().toISOString(),
  }
];

export const mockFeaturedProducts = mockProducts.filter(p => p.featured);

