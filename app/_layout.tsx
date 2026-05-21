import { Inter_900Black, useFonts } from "@expo-google-fonts/inter";
import { Stack } from "expo-router";
import { QueryProvider } from "@/lib/query-provider";
import { useOnlineManager } from "@/hooks/use-online-manager";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { PaperProvider } from "react-native-paper";
import { netflixTheme } from "@/lib/colors";

SplashScreen.preventAutoHideAsync();

const isLoggedIn = false;

export default function RootLayout() {
  useOnlineManager();
  const [loaded, error] = useFonts({
    Inter_900Black,
  });

  useEffect(() => {
    SplashScreen.hideAsync();
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <QueryProvider>
      <PaperProvider theme={netflixTheme}>
        <RootNavigator />
      </PaperProvider>
    </QueryProvider>
  );
}

function RootNavigator() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={isLoggedIn}>
        <Stack.Screen name="(app)" />
      </Stack.Protected>
      <Stack.Protected guard={!isLoggedIn}>
        <Stack.Screen name="(auth)" />
      </Stack.Protected>
    </Stack>
  );
}
