import { useQuery } from "@tanstack/react-query";
import { ApiError } from "@/lib/api";
import { Movie } from "../../types/movies.type";
import { moviesKeys } from "../../consants/movies.keys";
import { getMovies } from "../../services/movie.service";

export const useGetMovies = () => {
  return useQuery<Movie[], ApiError>({
    queryKey: moviesKeys.list(),
    queryFn: () => getMovies(),
  });
};
