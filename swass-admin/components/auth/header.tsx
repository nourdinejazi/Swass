import { Poppins } from "next/font/google";
import Image from "next/image";

import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface HeaderProps {
  label: string;
}

export const Header = ({ label }: HeaderProps) => {
  return (
    <div className=" w-full flex flex-col gap-y-4 items-center justify-center ">
      <Link href="/">
        <Image
          src={"/images/logo.png"}
          width={200}
          height={200}
          priority
          alt="logo"
        ></Image>
      </Link>
      <p className="text-muted-foreground text-sm">{label}</p>
    </div>
  );
};
