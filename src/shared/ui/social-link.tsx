"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface SocialLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
}

export const SocialLink: React.FC<SocialLinkProps> = ({ href, icon: Icon, label }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border/10 bg-secondary/5 text-foreground transition-colors hover:bg-secondary/20"
      aria-label={label}
    >
      <motion.div
        initial="initial"
        whileHover="hover"
        className="relative flex h-full w-full flex-col items-center"
      >
        {/* Icono estado normal */}
        <motion.div
          variants={{
            initial: { y: 0 },
            hover: { y: "-100%" },
          }}
          transition={{ type: "tween", ease: [0.33, 1, 0.68, 1], duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Icon size={18} />
        </motion.div>

        {/* Icono estado hover (entra desde abajo) */}
        <motion.div
          variants={{
            initial: { y: "100%" },
            hover: { y: 0 },
          }}
          transition={{ type: "tween", ease: [0.33, 1, 0.68, 1], duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center text-primary"
        >
          <Icon size={18} />
        </motion.div>
      </motion.div>
    </a>
  );
};

