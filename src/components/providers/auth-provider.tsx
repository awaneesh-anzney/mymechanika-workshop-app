"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, LoginCredentials } from "@/types/auth";
import { authenticateUser } from "@/lib/dummy-users";

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    hydrated: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [hydrated, setHydrated] = useState(false);

    // Initial Hydration from LocalStorage
    useEffect(() => {
        const storedAuth = localStorage.getItem("mymechanika-auth-context");
        if (storedAuth) {
            try {
                const parsed = JSON.parse(storedAuth);
                if (parsed.user) {
                    setUser(parsed.user);
                    setIsAuthenticated(true);
                }
            } catch (e) {
                console.error("Failed to parse auth storage", e);
            }
        }
        setHydrated(true);
    }, []);

    // Persistence Effect
    useEffect(() => {
        if (!hydrated) return;
        localStorage.setItem(
            "mymechanika-auth-context",
            JSON.stringify({ user, isAuthenticated })
        );

        // Sync to cookies for middleware (legacy behavior preserved)
        if (typeof window !== "undefined") {
            const authState = JSON.stringify({ state: { isAuthenticated, user } });
            document.cookie = `mymechanika-auth=${encodeURIComponent(authState)}; path=/; max-age=${60 * 60 * 24 * 7}`;
        }
    }, [user, isAuthenticated, hydrated]);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const authenticatedUser = await authenticateUser(email, password);
            if (authenticatedUser) {
                setUser(authenticatedUser);
                setIsAuthenticated(true);
            } else {
                throw new Error("Invalid credentials");
            }
        } catch (error) {
            console.error(error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        setIsAuthenticated(false);
        document.cookie = "mymechanika-auth=; path=/; max-age=0";
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isLoading,
                hydrated,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}
