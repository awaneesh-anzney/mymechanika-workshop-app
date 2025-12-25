/**
 * Authentication Types
 * Following industry standards for role-based access control (RBAC)
 */

export enum UserRole {
    ADMIN = "ADMIN",
    MANAGER = "MANAGER",
    SUPERVISOR = "SUPERVISOR",
}

export interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    avatar?: string;
    createdAt: string;
    lastLogin?: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

export interface AuthActions {
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    clearError: () => void;
    setUser: (user: User | null) => void;
    checkAuth: () => void;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface AuthResponse {
    user: User;
    token: string;
    refreshToken?: string;
}
