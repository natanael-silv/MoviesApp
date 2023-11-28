"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Rate from "../Rate";
import fallbackImage from "../../../../public/Images/poster_fallback_img.png";
type CardProps = {
  cardType?: string;
  name?: string;
  backdrop_path: string;
  title?: string;
  vote_average?: number;
};
const Card = ({
  backdrop_path,
  title,
  vote_average,

  cardType,
  name,
}: CardProps) => {
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
  }, []);

  return (
    <div>
      <div className="relative text-sm  md:h-[268px] md:w-[178px] w-[128px] h-[180px] bg-[#232323] rounded-lg my-0 mx-auto overflow-hidden">
        <Image
          fill
          sizes="(min-width: 768px) 178px, (max-width: 767px) 128px"
          src={error ? fallbackImage : backdrop_path}
          onError={() => setError(true)}
          alt=""
        />

        <div className="absolute bottom-3 left-1  w-full justify-between pr-2 z-10">
          {cardType !== "actors" && <Rate vote={vote_average} />}

          <h3 className="whitespace-nowrap overflow-hidden text-ellipsis">
            {cardType === "actors" ? name : title}
          </h3>
        </div>
        <span className="absolute bottom-0 w-full h-16 bg-gradient-to-b from-transparent via-black to-black opacity-80"></span>
      </div>
    </div>
  );
};

export default Card;
