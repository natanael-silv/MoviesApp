import { MovieTrailer } from "../interfaces";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
  },
};
export const getTrailers = async (id: number) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    );
    const data = await response.json();
    const results: MovieTrailer[] = data.results;

    return (
      results
        .filter((res) => res.site.toLowerCase() === "youtube")
        .map((res) => ({
          id: res.id,
          key: res.key,
        })) || []
    );
  } catch (error) {
    console.error(error);
    return [];
  }
};
