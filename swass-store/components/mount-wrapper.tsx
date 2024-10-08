"use client";

import { useMounted } from "@/hooks/use-mounted";

const MountWrapper = ({ children }: { children: React.ReactNode }) => {
  const mounted = useMounted();
  if (!mounted) return null;
  return <>{children}</>;
};

export default MountWrapper;
