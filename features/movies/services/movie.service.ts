import { api } from "@/lib/api";
import {
  Movie,
  type MovieFilters,
  type PaginatedResponse,
} from "../types/movies.type";
import { CreateMovieFormData } from "../schema/movie.schema";

type CreateMovieResponse = {
  movie: Movie;
};

export const getMovie = async (id: number) => {
  return api.get(`v1/movies/${id}`).json<{ movie: Movie }>();
};

export const getMovies = async (filters?: MovieFilters) => {
  return api
    .get("v1/movies", {
      searchParams: filters as Record<string, string | undefined>,
    })
    .json<PaginatedResponse<Movie>>();
};

export const createMovie = async (data: CreateMovieFormData) => {
  return api.post("v1/movies", { json: data }).json<CreateMovieResponse>();
};
