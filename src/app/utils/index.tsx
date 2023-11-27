export const buildImageUrl = (dynamicUrl: string | undefined) => {
  const baseUrl = "https://image.tmdb.org/t/p/original";
  return `${baseUrl}/${dynamicUrl}`;
};

