import { buildImageUrl } from "@/app/utils";
import Link from "next/link";
import React, { CSSProperties } from "react";

import { register } from "swiper/element/bundle";
import Hero from "../Hero";
import { Movie } from "@/app/interfaces";

register();

interface SliderProps {
  movies: Movie[];
}
const Slider = ({ movies }: SliderProps) => {
  return (
    <swiper-container
      pagination={true}
      space-between="30"
      centered-slides={true}
      autoplay-delay="2500"
      autoplay-disable-on-interaction="false"
      style={
        {
          "--swiper-navigation-color": "white",
          "--swiper-pagination-color": "#F2C94C",
          "--swiper-pagination-bullet-inactive-color": "#ffff",
        } as CSSProperties
      }
    >
      {movies.map((el) => (
        <swiper-slide key={el.id}>
          <Link href={`/movie/${el.id}`} key={el.id}>
            <Hero
              backdrop_path={el.backdrop_path}
              title={el.title}
              element={el}
            />
          </Link>
        </swiper-slide>
      ))}
    </swiper-container>
  );
};

export default Slider;
