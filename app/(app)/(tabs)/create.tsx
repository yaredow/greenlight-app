import { useEffect } from "react";
import { router } from "expo-router";

export default function CreateTab() {
  useEffect(() => {
    router.replace("/(app)/movies/create");
  }, []);

  return null;
}
