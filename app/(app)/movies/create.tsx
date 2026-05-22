import { View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { CreateMovieForm } from "../../../features/movies/components/create-movie-form";

export default function MovieCreate() {
  const { colors } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <CreateMovieForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
