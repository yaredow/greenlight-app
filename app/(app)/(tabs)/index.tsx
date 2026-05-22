import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, useTheme } from "react-native-paper";
import { useGetMovies } from "@/features/movies/hooks/query/use-get-movies";
import { MovieCard } from "@/features/movies/components/movie-card";

export default function Index() {
  const { colors } = useTheme();
  const { data, isPending } = useGetMovies();

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      {isPending ? (
        <View style={styles.centered}>
          <Text>Loading...</Text>
        </View>
      ) : (
        <FlatList
          data={data?.movies}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <MovieCard movie={item} />}
          numColumns={3}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.list}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    padding: 8,
  },
  row: {
    gap: 8,
  },
});
