"use client";

import React from "react";
import Image from "next/image";
import MagnifyingGlass from "../../../../public/Svg/magnifying-glass.svg"
import { useGlobalContext } from "@/app/context/GlobalContext";

const NavBar = () => {
  const { handleSubmit, setSearchQuery } = useGlobalContext();
  return (
    <nav className="z-50 absolute flex items-center w-full justify-center py-7">
      <form action="" onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          className="text-white placeholder-white bg-transparent border-white border-2 rounded-md md:rounded-full md:py-2 px-2 md:w-[350px] "
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a movie"
        />
        <button type="submit" className="absolute top-1/2 transform -translate-y-1/2 right-0 px-2">
          <Image src={MagnifyingGlass} alt="" />
        </button>
      </form>
    </nav>
  );
};

export default NavBar;
