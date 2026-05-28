import { useMutation } from "@tanstack/react-query";
import { LoginFormData } from "../../schemas/auth.schema";
import { logIn } from "../../services/auth.service";
import { useAuthStore } from "../../store/auth.store";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

export const useLogin = () => {
  const router = useRouter();
  const setTokens = useAuthStore((s) => s.setTokens);

  return useMutation({
    mutationFn: (data: LoginFormData) => logIn(data),
    onSuccess: async (data) => {
      await setTokens(
        data.authentication_token.token,
        data.refresh_token.token,
      );

      Toast.show({
        type: "success",
        text1: "Login successful",
      });

      router.push("/(app)/(tabs)");
    },
    onError: (error: Error) => {
      Toast.show({
        type: "error",
        text1: "Login failed",
        text2: error.message,
      });
    },
  });
};
