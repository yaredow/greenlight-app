import { request } from "@/lib/api";
import { useAuthStore } from "@/features/auth/store/auth.store";
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
  const token = useAuthStore.getState().token;

  return request<{ movie: Movie }>(`/v1/movies/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getMovies = async (filters?: MovieFilters) => {
  const token = useAuthStore.getState().token;

  return request<PaginatedResponse<Movie>>("/v1/movies", {
    method: "GET",
    params: filters,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createMovie = async (data: CreateMovieFormData) => {
  const token = useAuthStore.getState().token;

  return request<CreateMovieResponse>("/v1/movies", {
    method: "POST",
    body: data,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
