import { useMutation } from "@tanstack/react-query";
import { logout } from "../../services/auth.service";
import { useRouter } from "expo-router";
import { useAuthStore } from "../../store/auth.store";
import Toast from "react-native-toast-message";

export const useLogout = () => {
  const router = useRouter();
  const { logout: clearTokens } = useAuthStore();

  return useMutation({
    mutationFn: () => logout(),
    onSuccess: async () => {
      await clearTokens();
      router.replace("/(auth)/login");
    },
    onError: (error) => {
      Toast.show({
        type: "error",
        text1: "Logout failed",
        text2: error.message,
      });
    },
  });
};
