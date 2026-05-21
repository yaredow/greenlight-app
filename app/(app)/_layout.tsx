import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";

export default function AppLayout() {
  const theme = useTheme();

  return <Stack screenOptions={{ contentStyle: { backgroundColor: theme.colors.background } }} />;
}
