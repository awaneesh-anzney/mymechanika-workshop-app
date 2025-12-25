/**
 * Dummy Users Database
 * Simulating a PostgreSQL user table with different roles
 * In production, this would be replaced with actual API calls
 */

import { User, UserRole } from "@/types/auth";

export const DUMMY_USERS: User[] = [
    {
        id: "1",
        email: "admin@mymechanika.com",
        name: "Admin User",
        role: UserRole.ADMIN,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
        createdAt: "2024-01-01T00:00:00Z",
        lastLogin: new Date().toISOString(),
    },
    {
        id: "2",
        email: "manager@mymechanika.com",
        name: "Manager User",
        role: UserRole.MANAGER,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Manager",
        createdAt: "2024-01-01T00:00:00Z",
        lastLogin: new Date().toISOString(),
    },
    {
        id: "3",
        email: "supervisor@mymechanika.com",
        name: "Supervisor User",
        role: UserRole.SUPERVISOR,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Supervisor",
        createdAt: "2024-01-01T00:00:00Z",
        lastLogin: new Date().toISOString(),
    },
];

// Default password for all dummy users (in production, use hashed passwords)
export const DUMMY_PASSWORD = "password123";

/**
 * Simulates authentication against dummy database
 * In production, replace with actual API call
 */
export const authenticateUser = async (
    email: string,
    password: string
): Promise<User | null> => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Find user by email
    const user = DUMMY_USERS.find((u) => u.email === email);

    // Validate credentials
    if (!user || password !== DUMMY_PASSWORD) {
        return null;
    }

    // Update last login
    return {
        ...user,
        lastLogin: new Date().toISOString(),
    };
};

/**
 * Get user credentials for testing
 */
export const getUserCredentials = () => {
    return DUMMY_USERS.map((user) => ({
        email: user.email,
        password: DUMMY_PASSWORD,
        role: user.role,
    }));
};
