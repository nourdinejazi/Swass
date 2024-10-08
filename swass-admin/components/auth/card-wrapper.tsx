"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Header } from "@/components/auth/header";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel?: string;
  backButtonHref?: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerLabel,

  showSocial,
}: CardWrapperProps) => {
  return (
    <Card className="md:w-[400px] sm:w-[88%] border-[3px]  border-primary rounded-[30px]   ">
      <CardHeader>
        <Header label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      {showSocial && <CardFooter>{/* <Social /> */}</CardFooter>}
    </Card>
  );
};
