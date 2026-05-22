import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Text, useTheme } from "react-native-paper";
import { useAuthStore } from "@/features/auth/store/auth.store";

export default function Profile() {
  const { colors } = useTheme();
  const logout = useAuthStore((s) => s.logout);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <Text variant="headlineSmall">Profile</Text>
      </View>

      <View style={styles.footer}>
        <Button
          mode="outlined"
          onPress={logout}
          textColor={colors.error}
          style={styles.logout}
        >
          Logout
        </Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    padding: 24,
  },
  footer: {
    padding: 24,
  },
  logout: {
    borderColor: "#CF6679",
  },
});
