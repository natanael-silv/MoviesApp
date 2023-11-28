import Card from "@/app/components/Card";
import React from "react";

import { buildImageUrl } from "@/app/utils";
import Link from "next/link";
import { Movie } from "@/app/interfaces";
async function getData(id: string) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
    },
  };

  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${id}&include_adult=false&language=en-US&page=1`,
    options
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getData(params.id);
  const movieData: Movie[] = data.results;

  return (
    <main className="flex absolute top-32  flex-wrap items-center justify-center gap-6 max-w-[1440px]">
      {movieData.map((el) => (
        <Link href={`/movie/${el.id}`} key={el.id}>
          <Card
            title={el.original_title}
            vote_average={el.vote_average}
            backdrop_path={buildImageUrl(el.poster_path)}
          />
        </Link>
      ))}
    </main>
  );
}
