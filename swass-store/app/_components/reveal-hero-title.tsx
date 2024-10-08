"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface RevealProps {
  text: string;
  className?: string;
}

const defaultAnimations = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const RevealHeroTitle = ({ text, className }: RevealProps) => {
  return (
    <div className={cn("", className)}>
      <motion.div>
        <span className="sr-only">{text}</span>
        <motion.span
          initial="hidden"
          animate="visible"
          transition={{ staggerChildren: 0.2 }}
          aria-hidden
        >
          {text.split(" ").map((char, key) => (
            <span key={key}>
              <motion.span
                className="inline-block "
                variants={defaultAnimations}
                transition={{ type: "Inertia", stiffness: 100, duration: 0.2 }}
              >
                {char}
              </motion.span>{" "}
            </span>
          ))}
        </motion.span>
      </motion.div>
    </div>
  );
};

export default RevealHeroTitle;
