import { apiClient } from "./client";
import type { AuthResponse, LoginRequest, RegisterRequest } from "@/types/user";

export const authApi = {
  login: (data: LoginRequest) =>
    apiClient<AuthResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  register: (data: RegisterRequest) =>
    apiClient<AuthResponse>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  logout: () =>
    apiClient<{ message: string }>("/auth/logout", { method: "POST" }),

  verifyAuth: () => apiClient<AuthResponse>("/auth/me"),
};
