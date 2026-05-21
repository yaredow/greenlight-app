import { StyleSheet } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { useForm } from "@tanstack/react-form";
import { loginSchema, type LoginForm } from "@/lib/schemas";

export default function Login() {
  const theme = useTheme();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    } as LoginForm,
    validators: {
      onChange: loginSchema,
    },
    onSubmit: ({ value }) => {
      console.log(value);
    },
  });

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text variant="headlineLarge" style={styles.title}>
        Login
      </Text>

      <form.Field name="email">
        {(field) => (
          <>
            <TextInput
              label="Email"
              mode="outlined"
              value={field.state.value}
              onChangeText={field.handleChange}
              onBlur={field.handleBlur}
              keyboardType="email-address"
              autoCapitalize="none"
              style={styles.input}
            />
            {field.state.meta.errors ? (
              <Text variant="bodySmall" style={{ color: theme.colors.error }}>
                {field.state.meta.errors.join(", ")}
              </Text>
            ) : null}
          </>
        )}
      </form.Field>

      <form.Field name="password">
        {(field) => (
          <>
            <TextInput
              label="Password"
              mode="outlined"
              value={field.state.value}
              onChangeText={field.handleChange}
              onBlur={field.handleBlur}
              secureTextEntry
              style={styles.input}
            />
            {field.state.meta.errors ? (
              <Text variant="bodySmall" style={{ color: theme.colors.error }}>
                {field.state.meta.errors.join(", ")}
              </Text>
            ) : null}
          </>
        )}
      </form.Field>

      <Button
        mode="contained"
        onPress={() => form.handleSubmit()}
        style={styles.button}
      >
        Sign In
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  title: {
    textAlign: "center",
    marginBottom: 32,
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
  },
});
