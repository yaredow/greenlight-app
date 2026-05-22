import { Stack, useLocalSearchParams } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Card,
  Chip,
  Divider,
  Text,
} from "react-native-paper";
import { useGetMovie } from "@/features/movies/hooks/query/use-get-movie";

export default function MovieDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const movieId = Number.parseInt(String(id), 10);

  const { data, isPending, isError, error, refetch } = useGetMovie(
    Number.isFinite(movieId) ? movieId : 0,
  );

  const movie = data?.movie;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Stack.Screen
        options={{
          title: movie?.title ?? "Movie",
        }}
      />

      {isPending ? (
        <View style={styles.center}>
          <ActivityIndicator />
          <Text style={styles.muted}>Loading movie…</Text>
        </View>
      ) : isError ? (
        <View style={styles.center}>
          <Text variant="titleMedium">Couldn’t load movie</Text>
          <Text style={styles.muted}>{error?.message}</Text>
          <Button mode="contained" onPress={() => refetch()}>
            Retry
          </Button>
        </View>
      ) : !movie ? (
        <View style={styles.center}>
          <Text variant="titleMedium">Movie not found</Text>
        </View>
      ) : (
        <Card mode="elevated" style={styles.card}>
          <Card.Content>
            <Text variant="headlineMedium" style={styles.title}>
              {movie.title}
            </Text>

            <View style={styles.metaRow}>
              {movie.year ? (
                <Text style={styles.metaText}>{movie.year}</Text>
              ) : null}
              {movie.runtime ? (
                <Text style={styles.metaText}>{movie.runtime}</Text>
              ) : null}
            </View>

            {movie.genres && movie.genres.length > 0 ? (
              <View style={styles.genres}>
                {movie.genres.map((g) => (
                  <Chip key={g} compact>
                    {g}
                  </Chip>
                ))}
              </View>
            ) : null}

            <Divider style={styles.divider} />

            <View style={styles.detailsGrid}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>ID</Text>
                <Text>{movie.id}</Text>
              </View>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Version</Text>
                <Text>{movie.version}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: "center",
  },
  center: {
    alignItems: "center",
    gap: 10,
  },
  muted: {
    opacity: 0.7,
  },
  card: {
    borderRadius: 16,
    overflow: "hidden",
  },
  title: {
    marginBottom: 8,
  },
  metaRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  metaText: {
    opacity: 0.8,
  },
  genres: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  divider: {
    marginVertical: 16,
    opacity: 0.6,
  },
  detailsGrid: {
    flexDirection: "row",
    gap: 24,
  },
  detailItem: {
    gap: 4,
  },
  detailLabel: {
    opacity: 0.7,
  },
});
