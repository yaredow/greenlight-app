import { request } from "@/lib/api";
import { LoginFormData, RegisterFormData } from "../schemas/auth.schema";
import { LoginResponse } from "../types/auth.type";

export const logIn = async (data: LoginFormData): Promise<LoginResponse> => {
  return request<LoginResponse>("/v1/tokens/authentication", {
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
