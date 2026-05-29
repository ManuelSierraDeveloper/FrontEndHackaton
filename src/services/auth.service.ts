import { api } from "@/lib/api-client";
import type {
  CreateUserRequest,
  UserResponse,
  LoginRequest,
  LoginResponse,
} from "@/types/api";

export const authService = {
  register: (data: CreateUserRequest) =>
    api.post<UserResponse>("/users", data),

  login: (data: LoginRequest) =>
    api.post<LoginResponse>("/auth/login", data),

  getMe: (token: string) =>
    api.get<UserResponse>("/auth/me", token),

  getUserById: (id: string) =>
    api.get<UserResponse>(`/users/${id}`),

  getUserByEmail: (email: string) =>
    api.get<UserResponse>(`/users/email/${email}`),
};
