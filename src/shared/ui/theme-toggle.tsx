"use client";

import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/shared/hooks/use-theme";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const { theme, toggleTheme, mounted, isTransitioning } = useTheme();

  // Evitar flash de contenido no estilizado
  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Cambiar tema"
        className="flex items-center justify-center h-8 w-8 sm:h-9 sm:w-9 rounded-full hover:bg-muted/50 transition-colors"
        disabled
      >
        <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground opacity-50" />
      </button>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "light" ? "Cambiar a tema oscuro" : "Cambiar a tema claro"}
      disabled={isTransitioning}
      className={cn(
        "flex items-center justify-center",
        "h-8 w-8 sm:h-9 sm:w-9",
        "rounded-full",
        "hover:bg-muted/50",
        "transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "relative overflow-hidden"
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === "light" ? (
          <motion.div
            key="moon"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1],
            }}
          >
            <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}

