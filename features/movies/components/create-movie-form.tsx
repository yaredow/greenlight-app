import { useForm } from "@tanstack/react-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import { useCreateMovie } from "../hooks/mutations/use-create-movie";
import { GenresMultiSelect } from "./genres-multi-select";
import {
  CreateMovieFormInput,
  createMovieSchema,
} from "../schema/movie.schema";

export const CreateMovieForm = () => {
  const { mutate: createMovie, isPending } = useCreateMovie();
  const defaultValues: CreateMovieFormInput = {
    title: "",
    year: undefined,
    runtime: "",
    genres: [],
  };

  const form = useForm({
    defaultValues: defaultValues,
    onSubmit: async ({ value }) => {
      createMovie({
        ...value,
        runtime: value.runtime ? `${value.runtime} mins` : undefined,
      });
    },
    validators: {
      onSubmit: createMovieSchema,
    },
  });

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.form}
      >
        <Text variant="headlineLarge" style={styles.title}>
          Create Movie
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          Fill in the details below to add a new movie to the catalog
        </Text>
        <form.Field name="title">
          {(field) => (
            <View style={styles.field}>
              <TextInput
                label="Title"
                mode="outlined"
                value={field.state.value}
                onChangeText={field.handleChange}
                onBlur={field.handleBlur}
              />
            </View>
          )}
        </form.Field>

        <form.Field name="year">
          {(field) => (
            <View style={styles.field}>
              <TextInput
                label="Year"
                mode="outlined"
                value={field.state.value?.toString() ?? ""}
                onChangeText={(text) =>
                  field.handleChange(text ? parseInt(text, 10) : undefined)
                }
                onBlur={field.handleBlur}
                keyboardType="number-pad"
              />
            </View>
          )}
        </form.Field>

        <form.Field name="runtime">
          {(field) => (
            <View style={styles.field}>
              <TextInput
                label="Runtime (minutes)"
                mode="outlined"
                value={field.state.value ?? ""}
                onChangeText={(text) => field.handleChange(text)}
                onBlur={field.handleBlur}
                keyboardType="number-pad"
                placeholder="e.g. 148"
              />
            </View>
          )}
        </form.Field>

        <form.Field name="genres">
          {(field) => (
            <View style={styles.field}>
              <GenresMultiSelect
                value={field.state.value ?? []}
                onChange={field.handleChange}
                disabled={isPending}
              />
            </View>
          )}
        </form.Field>

        <Button
          mode="contained"
          onPress={() => form.handleSubmit()}
          loading={isPending}
          disabled={isPending}
          style={styles.button}
        >
          Create Movie
        </Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 24,
    flexGrow: 1,
    justifyContent: "center",
  },
  title: {
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    textAlign: "center",
    marginBottom: 32,
    opacity: 0.7,
  },
  field: {
    marginBottom: 20,
  },
  button: {
    marginTop: 8,
  },
});
