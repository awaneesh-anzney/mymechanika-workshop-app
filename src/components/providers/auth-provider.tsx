/**
 * Auth Provider Component
 * Initializes authentication state on app load
 * Syncs auth state with cookies for middleware access
 */

"use client";

import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const checkAuth = useAuthStore((state) => state.checkAuth);
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const user = useAuthStore((state) => state.user);

    useEffect(() => {
        // Check authentication on mount
        checkAuth();
    }, [checkAuth]);

    useEffect(() => {
        // Sync auth state to cookies for middleware access
        if (typeof window !== "undefined") {
            const authState = JSON.stringify({
                state: {
                    isAuthenticated,
                    user,
                },
            });

            // Set cookie for middleware
            document.cookie = `mymechanika-auth=${encodeURIComponent(authState)}; path=/; max-age=${60 * 60 * 24 * 7}`; // 7 days

            // Set auth token cookie
            const token = localStorage.getItem("auth-token");
            if (token) {
                document.cookie = `auth-token=${token}; path=/; max-age=${60 * 60 * 24 * 7}`;
            } else {
                // Clear cookie if no token
                document.cookie = "auth-token=; path=/; max-age=0";
            }
        }
    }, [isAuthenticated, user]);

    return <>{children}</>;
}
