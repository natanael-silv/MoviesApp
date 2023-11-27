"use client";

import React from "react";

import { useState, useEffect } from "react";

import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.min.css";

import { Movie } from "./interfaces";

import Slider from "./components/Slider";
import Carroussel from "./components/Carroussel";
import Skeleton from "./components/Skeleton";

import { useGlobalContext } from "./context/GlobalContext";
import Card from "./components/Card";
import { buildImageUrl } from "./utils";
import Link from "next/link";

const Home = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [realesedMovies, setRealeasedMovies] = useState<Movie[]>([]);

  const [loading, setLoading] = useState(true);

  const { trailerSrc, isOpen, setOpen } = useGlobalContext();

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
  };
  const fetchMovieData = async () => {
    try {
      // Use Promise.all to fetch popular and top-rated movies concurrently
      setLoading(true);
      const [popularRes, topRatedRes, realeasedRes] = await Promise.all([
        fetch(
          `${process.env.NEXT_PUBLIC_TMDB_API_URL}trending/movie/day?language=en-US`,
          options
        ),
        fetch(
          `${process.env.NEXT_PUBLIC_TMDB_API_URL}movie/top_rated?language=en-US&page=1`,
          options
        ),
        fetch(
          `${process.env.NEXT_PUBLIC_TMDB_API_URL}movie/now_playing?language=en-US&page=1`,
          options
        ),
      ]);

      // Check if any request failed
      if (!popularRes.ok || !topRatedRes.ok) {
        throw new Error("Failed to fetch one or more sets of data");
      }

      // Extract data from responses
      const [popularData, topRatedData, realeasedData] = await Promise.all([
        popularRes.json(),
        topRatedRes.json(),
        realeasedRes.json(),
      ]);

      // Update state with the respective data
      setMovies(popularData.results);
      setTopRatedMovies(topRatedData.results);
      setRealeasedMovies(realeasedData.results);
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      // Set loading state to false after the fetch is complete (whether successful or not)
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchMovieData();
  }, []);

  return (
    <main className="">
      <div className="relative mb-12 h-[450px] lg:h-[700px]">
        <Slider movies={movies} />
      </div>

      <section className="mb-6 mx-10">
        <h2 className="mb-10">Top Rate Movies</h2>
        {loading ? (
          <Skeleton number={19} />
        ) : (
          <Carroussel>
            {topRatedMovies.map((el) => (
              <Link href={`/movie/${el.id}`} key={el.id}>
                <Card
                  backdrop_path={buildImageUrl(el.poster_path)}
                  title={el.original_title}
                  vote_average={el.vote_average}
                />
              </Link>
            ))}
          </Carroussel>
        )}
      </section>

      <section className="mx-10 mb-6 ">
        <h2 className="mb-10">Now Playing</h2>
        {loading ? (
          <Skeleton number={19} />
        ) : (
          <Carroussel>
            {realesedMovies.map((el) => (
              <Link href={`/movie/${el.id}`} key={el.id}>
                <Card
                  backdrop_path={buildImageUrl(el.poster_path)}
                  title={el.original_title}
                  vote_average={el.vote_average}
                />
              </Link>
            ))}
          </Carroussel>
        )}
      </section>
      <React.Fragment>
        <ModalVideo
          channel="youtube"
          youtube={{ mute: 0, autoplay: 0 }}
          isOpen={isOpen}
          videoId={trailerSrc}
          onClose={() => setOpen(false)}
        />
      </React.Fragment>
    </main>
  );
};

export default Home;
