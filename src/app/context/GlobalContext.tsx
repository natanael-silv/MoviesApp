"use client";

import { useRouter } from "next/navigation";
import React, { ReactNode, createContext, useState, useContext } from "react";
import { getTrailers } from "../services";
import { Movie } from "../interfaces";

interface GlobalContextProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  trailerSrc: string;
  setTrailerSrc: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => void;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  playTrailer: (movie?: Movie) => void;
}
const defaultContextValues: GlobalContextProps = {
  searchQuery: "",
  setSearchQuery: () => {},
  trailerSrc: "",
  setTrailerSrc: () => {},
  handleSubmit: () => {},
  isOpen: false,
  setOpen: () => {},
  playTrailer: () => {},
};
interface GlobalContextProviderProps {
  children: ReactNode;
}
const GlobalContext = createContext<GlobalContextProps>(defaultContextValues);

export const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({
  children,
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [trailerSrc, setTrailerSrc] = useState<string>("");
  const [isOpen, setOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (searchQuery === "") {
      return;
    }

    router.push(`/search/${searchQuery}`);
  };

  const playTrailer = async (movie?: Movie) => {
    const trailers = await getTrailers(movie?.id);
    setTrailerSrc(trailers[0].key);
    setOpen(true);
  };

  return (
    <GlobalContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        handleSubmit,
        trailerSrc,
        setTrailerSrc,
        isOpen,
        setOpen,
        playTrailer,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
