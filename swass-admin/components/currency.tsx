"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export const formatter = new Intl.NumberFormat("fr-TN", {
  style: "currency",
  currency: "TND",
  minimumFractionDigits: 2,
});

interface currencyProps {
  value: number;
  promotion?: number;
  className?: string;
}

const Currency: React.FC<currencyProps> = ({ value, promotion, className }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  if (!isMounted) {
    return null;
  }
  if (!value) return null;

  if (promotion) {
    return (
      <span className={cn("text-neutral-500 text-sm", className)}>
        {formatter.format(Number(value - value * (promotion / 100)))}
      </span>
    );
  } else
    return (
      <span className={cn("text-neutral-500 text-sm", className)}>
        {formatter.format(Number(value))}
      </span>
    );
};

export default Currency;
