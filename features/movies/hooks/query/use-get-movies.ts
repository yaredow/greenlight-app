import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { ApiError } from "@/lib/api";
import {
  Movie,
  type MovieFilters,
  type PaginatedResponse,
} from "../../types/movies.type";
import { moviesKeys } from "../../consants/movies.keys";
import { getMovies } from "../../services/movie.service";

export const useGetMovies = (filters?: MovieFilters) => {
  return useQuery<PaginatedResponse<Movie>, ApiError>({
    queryKey: moviesKeys.list(filters),
    queryFn: () => getMovies(filters),
    placeholderData: keepPreviousData,
  });
};
