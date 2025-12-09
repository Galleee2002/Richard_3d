"use client";

import { motion } from "framer-motion";
import { useTheme } from "@/shared/hooks/use-theme";
import { ReactNode } from "react";

interface ThemeTransitionWrapperProps {
  children: ReactNode;
  className?: string;
}

export function ThemeTransitionWrapper({
  children,
  className,
}: ThemeTransitionWrapperProps) {
  const { isTransitioning } = useTheme();

  return (
    <motion.div
      className={className}
      animate={{
        opacity: isTransitioning ? 0.95 : 1,
      }}
      transition={{
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

