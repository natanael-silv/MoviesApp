import { useGlobalContext } from "@/app/context/GlobalContext";
import { buildImageUrl } from "@/app/utils";
import React from "react";
import Image from "next/image";
import { Movie } from "@/app/interfaces";

type HeroProps = {
  backdrop_path?: string ;
  title?: string;
  element?: Movie;
};
export default function Hero({ backdrop_path, title, element }: HeroProps) {
  const { playTrailer } = useGlobalContext();
  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    playTrailer(element);
  };
  return (
    <>
      <div className="w-full h-[450px] lg:h-[700px] relative">
        <Image
          src={buildImageUrl(backdrop_path)}
          alt=""
          className="h-full w-full object-cover opacity-50  "
          fill
          priority
        />
      </div>
      <div className="absolute w-[240px] z-10 left-1/2 bottom-10 transform -translate-x-1/2 ">
        <h1 className="text-3xl ">{title}</h1>
        <button className="mt-32 px-4 py-4" onClick={handleClick}>
          WATCH TRAILER
        </button>
      </div>
      <span className="absolute bottom-0 w-full h-16 bg-gradient-to-b from-transparent via-black to-black "></span>
    </>
  );
}
