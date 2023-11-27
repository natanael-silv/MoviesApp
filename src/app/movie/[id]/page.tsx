"use client";
import ModalVideo from "react-modal-video";
import "react-modal-video/css/modal-video.min.css";

import Carroussel from "@/app/components/Carroussel";
import Hero from "@/app/components/Hero";
import Rate from "@/app/components/Rate";
import Skeleton from "@/app/components/Skeleton";

import React, { useState, useEffect } from "react";
import { useGlobalContext } from "@/app/context/GlobalContext";
import { Actor, Movie } from "@/app/interfaces";
import Card from "@/app/components/Card";
import { buildImageUrl } from "@/app/utils";

export default function Page({ params }: { params: { id: string } }) {
  const [data, setData] = useState<Movie>();
  const [actors, setActors] = useState<Actor[]>([]);
  const [loading, setLoading] = useState(true);

  const { trailerSrc, isOpen, setOpen } = useGlobalContext();
  useEffect(() => {
    const fetchMovieData = async () => {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
        },
      };

      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${params.id}?append_to_response=videos%2Ccredits&language=en-US`,
        options
      );

      if (!res.ok) {
        throw new Error("Failed to fetch data");
      }

      const movieData = await res.json();
      setData(movieData);
      setActors(
        movieData.credits.cast.filter(
          (actor: Actor) => actor.known_for_department === "Acting"
        )
      );
    };

    fetchMovieData();
    setLoading(false);
  }, []);

  return (
    <main className="mx-8">
      <section className="relative mb-10">
        <Hero
          backdrop_path={data?.backdrop_path}
          title={data?.title}
          element={data}
        />
      </section>
      <section className="mb-10">
        <Rate vote={data?.vote_average} />
        <div>{data?.overview}</div>
      </section>
      <section className="mb-10">
        <h2>Top Cast</h2>
        {loading ? (
          <Skeleton number={19} />
        ) : (
          <Carroussel>
            {actors.map((el) => (
              <Card
                key={el.id}
                backdrop_path={buildImageUrl(el.profile_path)}
                cardType="actors"
                name={el.name}
              />
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
}
