"use client";

import { useRouter } from "next/navigation";
import React, { ReactNode, createContext, useState, useContext } from "react";
import { getTrailers } from "../services";
import { Film } from "../interfaces";

interface GlobalContextProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  trailerSrc: string;
  setTrailerSrc: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.MouseEvent) => void;
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const defaultContextValues: GlobalContextProps = {
  searchQuery: '',
  setSearchQuery: () => {},
  trailerSrc: '',
  setTrailerSrc: () => {},
  handleSubmit: () => {},
  isOpen: false,
  setOpen: () => {},
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

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
   
    if (searchQuery === "") {
      return;
    }

    router.push(`/search/${searchQuery}`);
  };

  const playTrailer = async (film: Film) => {
    const trailers = await getTrailers(film.id);
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
