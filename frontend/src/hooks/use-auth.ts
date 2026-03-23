import { useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authApi } from "@/api/auth";
import { useAuthStore } from "@/stores/auth.store";
import type { LoginRequest, RegisterRequest } from "@/types/user";

export function useAuth() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setUser, reset } = useAuthStore();

  const verifyAuthQuery = useQuery({
    queryKey: ["auth", "verify"],
    queryFn: authApi.verifyAuth,
    retry: false,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (verifyAuthQuery.data) {
      const u = verifyAuthQuery.data.user;
      setUser({ ...u, createdAt: new Date(u.createdAt) });
    }
  }, [verifyAuthQuery.data]);

  const loginMutation = useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (response) => {
      setUser({ ...response.user, createdAt: new Date(response.user.createdAt) });
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate("/auth/protected");
    },
  });

  const registerMutation = useMutation({
    mutationFn: (data: RegisterRequest) => authApi.register(data),
    onSuccess: (response) => {
      setUser({ ...response.user, createdAt: new Date(response.user.createdAt) });
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      navigate("/auth/protected");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      reset();
      queryClient.clear();
      navigate("/auth/login");
    },
    onError: () => {
      reset();
      queryClient.clear();
      navigate("/auth/login");
    },
  });

  return {
    verifyAuth: verifyAuthQuery.refetch,
    isVerifying: verifyAuthQuery.isLoading,
    login: loginMutation.mutate,
    loginError: loginMutation.error,
    isLoggingIn: loginMutation.isPending,
    register: registerMutation.mutate,
    registerError: registerMutation.error,
    isRegistering: registerMutation.isPending,
    logout: logoutMutation.mutate,
  };
}
