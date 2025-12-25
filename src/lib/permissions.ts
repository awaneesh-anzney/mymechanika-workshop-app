/**
 * Role-Based Access Control (RBAC) System
 * Defines permissions for each role and route access
 */

import { UserRole } from "@/types/auth";

// Define all available routes in the system
export enum Route {
    DASHBOARD = "/dashboard",
    BOOKINGS = "/bookings",
    SERVICES = "/services",
    INVENTORY = "/inventory",
    MECHANICS = "/mechanics",
}

// Define permissions for each role
export const ROLE_PERMISSIONS: Record<UserRole, Route[]> = {
    [UserRole.ADMIN]: [
        Route.DASHBOARD,
        Route.BOOKINGS,
        Route.SERVICES,
        Route.INVENTORY,
        Route.MECHANICS,
    ],
    [UserRole.MANAGER]: [
        Route.DASHBOARD,
        Route.BOOKINGS,
        Route.SERVICES,
        Route.MECHANICS,
    ],
    [UserRole.SUPERVISOR]: [
        Route.DASHBOARD,
        Route.BOOKINGS,
        Route.SERVICES,
    ],
};

/**
 * Check if a user role has permission to access a route
 */
export function hasRoutePermission(role: UserRole, pathname: string): boolean {
    // Get allowed routes for this role
    const allowedRoutes = ROLE_PERMISSIONS[role];

    if (!allowedRoutes) {
        console.error(`[Permissions] No permissions found for role: ${role}`);
        return false;
    }

    // Check if the pathname starts with any of the allowed routes
    const hasPermission = allowedRoutes.some((route) => pathname.startsWith(route));

    // Debug log
    console.log('[Permissions] Check:', {
        role,
        pathname,
        allowedRoutes,
        hasPermission
    });

    return hasPermission;
}

/**
 * Get all accessible routes for a role
 */
export function getAccessibleRoutes(role: UserRole): Route[] {
    return ROLE_PERMISSIONS[role];
}

/**
 * Get route metadata for navigation
 */
export interface RouteMetadata {
    path: Route;
    label: string;
    icon: string;
    description: string;
    requiredRoles: UserRole[];
}

export const ROUTE_METADATA: RouteMetadata[] = [
    {
        path: Route.DASHBOARD,
        label: "Dashboard",
        icon: "LayoutDashboard",
        description: "Overview and statistics",
        requiredRoles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPERVISOR],
    },
    {
        path: Route.BOOKINGS,
        label: "Bookings",
        icon: "Calendar",
        description: "Manage customer bookings",
        requiredRoles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPERVISOR],
    },
    {
        path: Route.SERVICES,
        label: "Services",
        icon: "Wrench",
        description: "Service management",
        requiredRoles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPERVISOR],
    },
    {
        path: Route.INVENTORY,
        label: "Inventory",
        icon: "Package",
        description: "Parts and inventory",
        requiredRoles: [UserRole.ADMIN],
    },
    {
        path: Route.MECHANICS,
        label: "Mechanics",
        icon: "Users",
        description: "Mechanic management",
        requiredRoles: [UserRole.ADMIN, UserRole.MANAGER],
    },
];

/**
 * Get accessible route metadata for a role
 */
export function getAccessibleRouteMetadata(role: UserRole): RouteMetadata[] {
    return ROUTE_METADATA.filter((route) =>
        route.requiredRoles.includes(role)
    );
}

/**
 * Check if user can access a specific route
 */
export function canAccessRoute(role: UserRole, route: Route): boolean {
    const routeMetadata = ROUTE_METADATA.find((r) => r.path === route);
    return routeMetadata ? routeMetadata.requiredRoles.includes(role) : false;
}
