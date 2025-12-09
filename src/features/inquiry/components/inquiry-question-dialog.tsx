"use client";

import { useState, useEffect } from "react";
import { useInquiry } from "../inquiry-context";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function InquiryQuestionDialog() {
  const { productForQuestion, closeQuestionDialog } = useInquiry();
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Resetear formulario cuando se cierra el dialog
  useEffect(() => {
    if (!productForQuestion) {
      setEmail("");
      setMessage("");
    }
  }, [productForQuestion]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForQuestion) return;

    const formData = {
      productId: productForQuestion.id,
      productName: productForQuestion.name,
      email: email || undefined,
      message,
    };

    console.log("Consulta enviada:", formData);

    // Resetear y cerrar
    setEmail("");
    setMessage("");
    closeQuestionDialog();
  };

  const isOpen = productForQuestion !== null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeQuestionDialog()}>
      <DialogContent className="theme-transition">
        <DialogHeader>
          <DialogTitle className="text-foreground theme-transition">
            Consulta sobre el producto
          </DialogTitle>
          <DialogDescription className="text-muted-foreground theme-transition">
            {productForQuestion?.name}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-foreground theme-transition"
            >
              Email (opcional)
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="theme-transition"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="message"
              className="text-sm font-medium text-foreground theme-transition"
            >
              Tu consulta
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ej: ¿Qué tamaño tiene? ¿Qué incluye exactamente?"
              className="min-h-[120px] theme-transition"
              required
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={closeQuestionDialog}
              className="theme-transition"
            >
              Cancelar
            </Button>
            <Button type="submit" className="theme-transition">
              Enviar consulta
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

