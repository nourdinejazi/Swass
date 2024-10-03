import type { Metadata } from "next";
import { Barlow } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { cn } from "@/lib/utils";
import Footer from "@/components/footer";
import NavBar from "@/components/nav-bar";
import CartSheet from "./_components/cart-sheet";
const barlo = Barlow({ subsets: ["latin"], weight: ["400", "500", "800"] });

export const metadata: Metadata = {
  title: "SWASS FASHION",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <head>
          <head>
            <link rel="icon" href="/favicon.ico" sizes="any" />
          </head>
        
        </head>
        <body className={cn(barlo.className, "min-w-[350px]")}>
          <Toaster />
          <NavBar />
          <CartSheet />
          {children}
          <Footer />
        </body>
      </html>
    </SessionProvider>
  );
}