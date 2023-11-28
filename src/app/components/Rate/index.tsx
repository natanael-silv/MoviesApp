import React from "react";
import Image from "next/image";

interface RateProps {
  vote?: number;
}
export default function Rate({ vote }: RateProps) {
  return (
    <>
      <span className="inline-flex items-baseline ">
        <Image
          src="/Svg/stars.svg"
          alt=""
          width={15}
          height={15}
          className={"mr-1"}
        />
        {Number(vote?.toFixed(1))}
      </span>
    </>
  );
}
