import { Stack } from "expo-router";
import { QueryProvider } from "@/lib/query-provider";
import { useOnlineManager } from "@/hooks/use-online-manager";

export default function RootLayout() {
  useOnlineManager();

  return (
    <QueryProvider>
      <Stack />
    </QueryProvider>
  );
}
