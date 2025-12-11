"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "theme";
const THEME_CHANGE_EVENT = "app:theme-change";

function getSystemTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function readThemeFromStorage(): Theme | null {
  const raw = localStorage.getItem(THEME_STORAGE_KEY);
  return raw === "dark" || raw === "light" ? raw : null;
}

function readThemeFromDom(): Theme {
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const applyTheme = useCallback((newTheme: Theme) => {
    const root = document.documentElement;
    if (newTheme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, []);

  const initialTheme = useMemo<Theme>(() => {
    // Preferimos el DOM si ya fue seteado por otra parte (evita “flash” al hidratar).
    // Si aún no hay clase, caemos a localStorage y luego a preferencia del sistema.
    try {
      const fromDom = readThemeFromDom();
      const fromStorage = readThemeFromStorage();
      return fromStorage ?? fromDom ?? getSystemTheme();
    } catch {
      return "light";
    }
  }, []);

  useEffect(() => {
    setMounted(true);

    // Inicializar coherente con DOM/localStorage/sistema
    setTheme(initialTheme);
    applyTheme(initialTheme);

    const onThemeChange = (event: Event) => {
      const next =
        event instanceof CustomEvent && (event.detail === "dark" || event.detail === "light")
          ? (event.detail as Theme)
          : readThemeFromDom();

      setTheme(next);
      applyTheme(next);
    };

    const onStorage = (e: StorageEvent) => {
      if (e.key !== THEME_STORAGE_KEY) return;
      const next = readThemeFromStorage() ?? readThemeFromDom();
      setTheme(next);
      applyTheme(next);
    };

    const root = document.documentElement;
    const observer = new MutationObserver(() => {
      const next = readThemeFromDom();
      setTheme(next);
    });

    window.addEventListener(THEME_CHANGE_EVENT, onThemeChange as EventListener);
    window.addEventListener("storage", onStorage);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    return () => {
      window.removeEventListener(
        THEME_CHANGE_EVENT,
        onThemeChange as EventListener
      );
      window.removeEventListener("storage", onStorage);
      observer.disconnect();
    };
  }, [applyTheme, initialTheme]);

  const toggleTheme = () => {
    const newTheme: Theme = theme === "light" ? "dark" : "light";
    
    // Activar estado de transición
    setIsTransitioning(true);
    
    // Aplicar el tema
    setTheme(newTheme);
    localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    applyTheme(newTheme);
    window.dispatchEvent(new CustomEvent<Theme>(THEME_CHANGE_EVENT, { detail: newTheme }));
    
    // Desactivar estado de transición después de la animación
    setTimeout(() => {
      setIsTransitioning(false);
    }, 400); // Duración de la transición CSS
  };

  return {
    theme,
    toggleTheme,
    mounted,
    isTransitioning,
  };
}

