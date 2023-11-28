import React from "react";
import Image from "next/image";
import starImage from "../../../../public/Svg/star.svg";
interface RateProps {
  vote?: number;
}
export default function Rate({ vote }: RateProps) {
  return (
    <>
      <span className="inline-flex items-baseline ">
        <Image
          src={starImage}
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
