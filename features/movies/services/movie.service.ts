import { request } from "@/lib/api";
import { Movie } from "../types/movies.type";

export const getMovies = async () => {
  return request<Movie[]>("/v1/movies");
};
