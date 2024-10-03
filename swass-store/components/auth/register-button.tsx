"use client";
import { useRouter } from "next/navigation";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { RegisterForm } from "./register-form";
import { DialogTitle } from "@radix-ui/react-dialog";

interface RegisterButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
  className?: string;
}

export const RegisterButton = ({
  children,
  mode = "redirect",
  asChild,
  className,
}: RegisterButtonProps) => {
  const router = useRouter();

  const onClick = () => {
    router.push("/auth/register");
  };

  if (mode === "modal") {
    return (
      <Dialog>
        <DialogTrigger asChild={asChild} className={className}>
          {children}
        </DialogTrigger>
        <DialogTitle></DialogTitle>
        <DialogContent className="p-0 w-auto bg-transparent border-none">
          <RegisterForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <span
      onClick={onClick}
      className={cn("cursor-pointer text-center ", className)}
    >
      {children}
    </span>
  );
};
