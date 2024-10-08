"use client";
import { cn } from "@/lib/utils";
import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

interface revealProps {
  children: JSX.Element;
  delay?: number;

  className?: string;
  hidden?: { opacity: number; y: number; x: number };
  visible?: { opacity: number; y: number; x: number };
  transition?: {
    duration: number;
    delay?: number;
    type?: string;
    stiffness?: number;
    damping?: number;
    mass?: number;
    ease?: string;
  };
}

const Reveal = ({
  children,
  delay,
  className,
  hidden,
  visible,
  transition,
}: revealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const mainControls = useAnimation();
  useEffect(() => {
    if (isInView) {
      mainControls.start("visible");
    }
  }, [isInView, mainControls]);

  return (
    <div className={cn("", className)}>
      <motion.div
        ref={ref}
        variants={{
          hidden: hidden || { opacity: 0, y: 20 },
          visible: visible || { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={transition || { duration: 0.5, delay: delay || 0 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Reveal;
