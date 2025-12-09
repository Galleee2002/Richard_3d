"use client";

import { useInquiry } from "../inquiry-context";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { X } from "lucide-react";

export function InquirySidebar() {
  const {
    items,
    isSidebarOpen,
    toggleSidebar,
    removeItem,
    openQuestionDialog,
  } = useInquiry();

  return (
    <>
      {/* Botón flotante para abrir el sidebar */}
      <Button
        variant="outline"
        onClick={toggleSidebar}
        className="fixed bottom-4 right-4 z-40 shadow-lg theme-transition"
      >
        Lista de consulta ({items.length})
      </Button>

      {/* Sheet (Sidebar) */}
      <Sheet open={isSidebarOpen} onOpenChange={toggleSidebar}>
        <SheetContent className="w-full sm:max-w-sm theme-transition">
          <SheetHeader>
            <SheetTitle className="text-foreground theme-transition">
              Productos para consulta
            </SheetTitle>
            <SheetDescription className="text-muted-foreground theme-transition">
              Lista de productos para hacer preguntas. No es un carrito de
              compras.
            </SheetDescription>
          </SheetHeader>

          <ScrollArea className="mt-6 h-[calc(100vh-12rem)] pr-4">
            {items.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-muted-foreground theme-transition">
                  Todavía no agregaste productos. Desde cada producto podés usar
                  el botón &quot;Agregar a consultas&quot;.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {items.map((product) => (
                  <div
                    key={product.id}
                    className="border border-border rounded-lg p-3 space-y-2 bg-card theme-transition"
                  >
                    <div className="flex items-start gap-3">
                      {product.imageUrl && (
                        <div className="relative h-10 w-10 rounded overflow-hidden flex-shrink-0">
                          <Image
                            src={product.imageUrl}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground theme-transition truncate">
                          {product.name}
                        </p>
                        {product.price !== undefined && (
                          <p className="text-xs text-muted-foreground theme-transition mt-1">
                            {new Intl.NumberFormat("es-AR", {
                              style: "currency",
                              currency: "ARS",
                            }).format(product.price)}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openQuestionDialog(product)}
                        className="flex-1 text-xs theme-transition"
                      >
                        Preguntar
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(product.id)}
                        className="flex-1 text-xs theme-transition"
                      >
                        Quitar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </>
  );
}

