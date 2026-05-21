import { useMutation } from "@tanstack/react-query";
import { LoginFormData } from "../../schemas/auth.schema";
import { logIn } from "../../services/auth.service";
import { useRouter } from "expo-router";
import Toast from "react-native-toast-message";

export const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: LoginFormData) => logIn(data),
    onSuccess: (data) => {
      Toast.show({
        type: "success",
        text1: "Login successful",
      });

      router.push("/(app)");
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
