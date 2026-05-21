import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8082";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // ✅ Cookies HTTP-only
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  date: string;
  time: string;
  phone?: string;
  state: number;
  profile_id?: number;
  profile?: { id: number; name: string } | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

// ✅ Esta interfaz representa la respuesta wrapper de la API Go
interface AuthWrapper {
  user: UserResponse;
}

// ✅ POST /auth/login → Retorna { user: {...} }
export const loginApi = async (credentials: LoginRequest): Promise<UserResponse> => {
  const response = await api.post<AuthWrapper>("/auth/login", credentials);
  return response.data.user; // Extraemos el objeto user interno
};

// ✅ GET /auth/me → También retorna { user: {...} }
export const getMeApi = async (): Promise<UserResponse> => {
  const response = await api.get<AuthWrapper>("/auth/me");
  return response.data.user; // ← ¡Aquí estaba el error! Extraer .user
};

// ✅ POST /auth/logout
export const logoutApi = async (): Promise<{ message: string }> => {
  const response = await api.post<{ message: string }>("/auth/logout");
  return response.data;
};