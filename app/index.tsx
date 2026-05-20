import { useGetMovies } from "@/features/movies/hooks/query/use-get-movies";
import { Text, View } from "react-native";

export default function Index() {
  const { data: movies, isLoading } = useGetMovies();
  console.log("movies", movies);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>{JSON.stringify(movies)}</Text>
    </View>
  );
}
