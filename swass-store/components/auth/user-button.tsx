"use client";
import { FaUser } from "react-icons/fa";
import { ExitIcon } from "@radix-ui/react-icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LogoutButton } from "@/components/auth/logout-button";
import { AuthButton } from "./auth-button";
import { UserRound } from "lucide-react";

export const UserButton = ({
  className,
  authMode,
  redirectUrl,
}: {
  className?: string;
  authMode?: "login" | "register";
  redirectUrl?: string;
}) => {
  const user = useCurrentUser();
  if (!user) {
    return (
      <AuthButton
        className={className}
        authMode={authMode}
        redirectUrl={redirectUrl}
      >
        <UserRound strokeWidth={1} size={22} />
      </AuthButton>
    );
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className=" ">
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className="bg-accent/80">
            <FaUser className="text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="" align="end">
        <div className="flex flex-col text-sm p-3">
          <span className="mb-2 text-accent font-medium">SWASS FASHION ✦</span>
          <span>{user.name}</span>
          <span className="text-xs text-neutral-500">{user.email}</span>
        </div>
        <LogoutButton>
          <DropdownMenuItem className="cursor-pointer">
            <ExitIcon className="h-4 w-4 mr-2 " />
            Logout
          </DropdownMenuItem>
        </LogoutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
