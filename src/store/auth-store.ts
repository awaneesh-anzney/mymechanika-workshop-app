/**
 * Authentication Store using Zustand
 * Following industry-standard patterns for state management
 * - Persistent storage using localStorage
 * - Proper TypeScript typing
 * - Separation of state and actions
 * - Ready for API integration
 */

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User, AuthState, AuthActions } from "@/types/auth";
import { authenticateUser } from "@/lib/dummy-users";

type AuthStore = AuthState & AuthActions;

const STORAGE_KEY = "mymechanika-auth";

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            // Initial State
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,

            // Actions
            login: async (email: string, password: string) => {
                set({ isLoading: true, error: null });

                try {
                    // In production, replace with actual API call
                    const user = await authenticateUser(email, password);

                    if (!user) {
                        throw new Error("Invalid email or password");
                    }

                    // Store token in localStorage (in production, use httpOnly cookies)
                    if (typeof window !== "undefined") {
                        localStorage.setItem("auth-token", `dummy-token-${user.id}`);
                    }

                    set({
                        user,
                        isAuthenticated: true,
                        isLoading: false,
                        error: null,
                    });
                } catch (error) {
                    const errorMessage =
                        error instanceof Error ? error.message : "Login failed";
                    set({
                        user: null,
                        isAuthenticated: false,
                        isLoading: false,
                        error: errorMessage,
                    });
                    throw error;
                }
            },

            logout: () => {
                // Clear token from localStorage
                if (typeof window !== "undefined") {
                    localStorage.removeItem("auth-token");
                }

                set({
                    user: null,
                    isAuthenticated: false,
                    isLoading: false,
                    error: null,
                });
            },

            clearError: () => {
                set({ error: null });
            },

            setUser: (user: User | null) => {
                set({
                    user,
                    isAuthenticated: !!user,
                });
            },

            checkAuth: () => {
                // Check if user is authenticated on app load
                const { user } = get();
                const token =
                    typeof window !== "undefined"
                        ? localStorage.getItem("auth-token")
                        : null;

                if (!user || !token) {
                    set({
                        user: null,
                        isAuthenticated: false,
                    });
                }
            },
        }),
        {
            name: STORAGE_KEY,
            storage: createJSONStorage(() => localStorage),
            // Only persist user and isAuthenticated
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);

// Selectors for better performance
export const selectUser = (state: AuthStore) => state.user;
export const selectIsAuthenticated = (state: AuthStore) => state.isAuthenticated;
export const selectIsLoading = (state: AuthStore) => state.isLoading;
export const selectError = (state: AuthStore) => state.error;
