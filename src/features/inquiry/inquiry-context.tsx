"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Product } from "./types";

interface InquiryContextType {
  items: Product[];
  isSidebarOpen: boolean;
  productForQuestion: Product | null;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleSidebar: () => void;
  openQuestionDialog: (product: Product) => void;
  closeQuestionDialog: () => void;
}

const InquiryContext = createContext<InquiryContextType | undefined>(undefined);

export function InquiryProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [productForQuestion, setProductForQuestion] = useState<Product | null>(
    null
  );

  const addItem = (product: Product) => {
    setItems((prev) => {
      // Evitar duplicados por id
      if (prev.some((item) => item.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });
    // Abrir el sidebar al agregar un item
    setIsSidebarOpen(true);
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const openQuestionDialog = (product: Product) => {
    setProductForQuestion(product);
  };

  const closeQuestionDialog = () => {
    setProductForQuestion(null);
  };

  return (
    <InquiryContext.Provider
      value={{
        items,
        isSidebarOpen,
        productForQuestion,
        addItem,
        removeItem,
        toggleSidebar,
        openQuestionDialog,
        closeQuestionDialog,
      }}
    >
      {children}
    </InquiryContext.Provider>
  );
}

export function useInquiry() {
  const context = useContext(InquiryContext);
  if (context === undefined) {
    throw new Error("useInquiry debe usarse dentro de InquiryProvider");
  }
  return context;
}

