"use client";
import { useMounted } from "@/hooks/use-mounted";

const VetementClientWrapper = ({ children }: { children: React.ReactNode }) => {
  const mounted = useMounted();
  if (!mounted) return <div className="h-screen w-full bg-secondary"></div>;
  return <div>{children}</div>;
};

export default VetementClientWrapper;
