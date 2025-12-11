"use client";

import { useState } from "react";
import { useColorsQuery } from "../hooks/use-colors";
import {
  useDeleteColorMutation,
  useToggleColorAvailabilityMutation,
} from "../hooks/use-colors";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Palette, Trash2, X, Check } from "lucide-react";
import type { Color } from "../types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function ColorList() {
  const { data: colors, isLoading, error } = useColorsQuery();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);

  const deleteMutation = useDeleteColorMutation();
  const toggleMutation = useToggleColorAvailabilityMutation();

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteMutation.mutateAsync(id);
    } catch (err) {
      console.error("Error al eliminar color:", err);
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleAvailability = async (color: Color) => {
    setTogglingId(color.id);
    try {
      await toggleMutation.mutateAsync({
        id: color.id,
        available: !color.available,
      });
    } catch (err) {
      console.error("Error al cambiar disponibilidad:", err);
    } finally {
      setTogglingId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground theme-transition" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 rounded-md bg-destructive/10 border border-destructive text-destructive text-sm theme-transition">
        Error al cargar colores:{" "}
        {error instanceof Error ? error.message : "Error desconocido"}
      </div>
    );
  }

  if (!colors || colors.length === 0) {
    return (
      <div className="text-center py-12">
        <Palette className="h-12 w-12 mx-auto mb-4 text-muted-foreground theme-transition" />
        <p className="text-muted-foreground theme-transition">
          No hay colores registrados
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="bg-card border-border theme-transition">
        <CardHeader>
          <CardTitle className="text-foreground theme-transition">
            Colores Disponibles
          </CardTitle>
          <CardDescription className="text-muted-foreground theme-transition">
            Gestiona los colores disponibles en la página
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {colors.map((color) => (
              <div
                key={color.id}
                className={`border rounded-lg p-4 bg-card hover:border-accent/30 transition-colors duration-200 theme-transition ${
                  !color.available
                    ? "opacity-60 border-destructive/30"
                    : "border-border"
                }`}
              >
                <div className="flex items-start gap-3 mb-3">
                  {/* Vista previa del color */}
                  <div
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-md border-2 border-border shadow-sm theme-transition flex-shrink-0"
                    style={{
                      backgroundColor: color.hex_code,
                    }}
                    title={color.hex_code}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground theme-transition truncate">
                      {color.name}
                    </h3>
                    <p className="text-sm text-muted-foreground theme-transition font-mono">
                      {color.hex_code}
                    </p>
                  </div>
                </div>

                {/* Estado de disponibilidad */}
                <div className="flex items-center gap-2 mb-3">
                  <div
                    className={`flex items-center gap-2 px-2 py-1 rounded-md text-xs font-medium theme-transition ${
                      color.available
                        ? "bg-accent-support/10 dark:bg-accent-support/20 text-accent-support dark:text-accent-support/90 border border-accent-support/50 dark:border-accent-support/40"
                        : "bg-destructive/10 text-destructive border border-destructive/50"
                    }`}
                  >
                    {color.available ? (
                      <>
                        <Check className="h-3 w-3" />
                        <span>Disponible</span>
                      </>
                    ) : (
                      <>
                        <X className="h-3 w-3" />
                        <span>Sin stock</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleToggleAvailability(color)}
                    disabled={togglingId === color.id || deletingId === color.id}
                    className={`flex-1 border-border text-foreground hover:bg-muted theme-transition ${
                      color.available
                        ? "hover:text-destructive"
                        : "hover:text-accent-support"
                    }`}
                  >
                    {togglingId === color.id ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : color.available ? (
                      "Sin Stock"
                    ) : (
                      "Con Stock"
                    )}
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={deletingId === color.id || togglingId === color.id}
                        className="border-destructive/50 text-destructive hover:bg-destructive/10 hover:border-destructive theme-transition"
                      >
                        {deletingId === color.id ? (
                          <Loader2 className="h-3 w-3 animate-spin" />
                        ) : (
                          <Trash2 className="h-3 w-3" />
                        )}
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-card border-border theme-transition">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="text-foreground theme-transition">
                          ¿Eliminar color?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-muted-foreground theme-transition">
                          Esta acción no se puede deshacer. Se eliminará
                          permanentemente el color "{color.name}".
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="border-border text-foreground hover:bg-muted theme-transition">
                          Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(color.id)}
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90 theme-transition"
                        >
                          Eliminar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

