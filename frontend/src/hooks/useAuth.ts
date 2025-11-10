import { create } from "zustand";

type AuthState = {
  isAuthenticated: boolean;
  username: string | null;
  setAuth: (payload: { isAuthenticated: boolean; username: string | null }) => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  username: null,
  setAuth: (payload) => set(payload)
}));

