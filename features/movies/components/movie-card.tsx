import { StyleSheet, View, Dimensions } from "react-native";
import { Card, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Movie } from "../types/movies.type";

const CARD_WIDTH = (Dimensions.get("window").width - 32) / 3;

export const MovieCard = ({ movie }: { movie: Movie }) => {
  return (
    <Card
      style={styles.card}
      onPress={() => router.push(`/(app)/movies/${movie.id}`)}
    >
      <View style={styles.poster}>
        <MaterialCommunityIcons name="filmstrip" size={28} color="#666" />
      </View>
      <View style={styles.info}>
        <Text variant="labelSmall" numberOfLines={2}>
          {movie.title}
        </Text>
        {movie.year && <Text style={styles.year}>{movie.year}</Text>}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    marginBottom: 8,
    overflow: "hidden",
  },
  poster: {
    height: CARD_WIDTH * 1.3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
  },
  info: {
    padding: 6,
  },
  year: {
    fontSize: 11,
    color: "#666",
    marginTop: 2,
  },
});
