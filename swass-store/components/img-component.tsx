"use client";

import Image from "next/image";
import { useState } from "react";

interface ImgcompProps {
  url: string;
}

const ImgComponent = ({ url }: ImgcompProps) => {
  const [isImageReady, setIsImageReady] = useState(false);

  const onLoadCallBack = (e: any) => {
    setIsImageReady(true);
  };

  return (
    <div>
      {!isImageReady && (
        <div className="w-full sm:h-[200px] md:h-[300px] text-center gap-5 flex flex-col justify-center items-center">
          <div
            className="w-12 h-12
                        border-8 
                        border-t-gray-200  
                        border-r-gray-200 
                        border-b-gray-200 
                        border-l-purple-600 
                        rounded-full 
                        animate-spin"
          ></div>
          <span className="">Loading...</span>
        </div>
      )}
      <Image
        onLoad={onLoadCallBack}
        src={url}
        width={1000}
        height={2000}
        quality={100}
        className=" "
        alt="image"
      ></Image>
    </div>
  );
};

export default ImgComponent;
