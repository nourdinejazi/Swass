import BigSpinner from "@/components/big-spinner";
import Image from "next/image";

const Loading = () => {
  return (
    <main className="bg-secondary gap-10    w-full    min-h-[100dvh]  flex items-center justify-center  ">
      <div className="relative size-[200px]">
        <Image
          src={"/logo.png"}
          fill
          alt="logo"
          sizes="100"
          priority
          className="  object-contain"
        ></Image>
      </div>
      <BigSpinner />
    </main>
  );
};

export default Loading;
