import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateMovieFormData } from "../../schema/movie.schema";
import { createMovie } from "../../services/movie.service";
import Toast from "react-native-toast-message";
import { moviesKeys } from "../../consants/movies.keys";
import { useRouter } from "expo-router";
import type { Movie } from "../../types/movies.type";

export const useCreateMovie = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: CreateMovieFormData) => createMovie(data),
    onSuccess: (data) => {
      const movie = data.movie;

      Toast.show({
        type: "success",
        text1: "Movie created",
        text2: movie.title,
      });

      queryClient.invalidateQueries({ queryKey: moviesKeys.list() });
      queryClient.setQueryData(moviesKeys.movie(movie.id), movie as Movie);

      router.push(`/(app)/movies/${movie.id}`);
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Failed to create movie",
        text2: error.message,
      });
    },
  });
};
