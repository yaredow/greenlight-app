import { request } from "@/lib/api";
import { LoginFormData, RegisterFormData } from "../schemas/auth.schema";

export const logIn = async (data: LoginFormData) => {
  return request("/v1/token/authentication", {
    method: "POST",
    body: data,
  });
};

export const register = async (data: RegisterFormData) => {
  return request("/v1/users", {
    method: "POST",
    body: data,
  });
};
