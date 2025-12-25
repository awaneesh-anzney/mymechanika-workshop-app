/**
 * Next.js Middleware for Route Protection
 * Works with NestJS backend authentication
 * 
 * Features:
 * - Client-side route protection (UX layer)
 * - Role-Based Access Control (RBAC)
 * - Prevents unauthorized access to protected routes
 * - Redirects based on authentication state and permissions
 * 
 * Note: This does NOT replace backend authentication.
 * Your NestJS backend should still validate JWT tokens with Guards.
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { hasRoutePermission } from "@/lib/permissions";
import { UserRole } from "@/types/auth";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Skip middleware for static files and API routes
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.includes('.')
    ) {
        return NextResponse.next();
    }

    // Get JWT token from cookies
    const accessToken = request.cookies.get("access_token")?.value ||
        request.cookies.get("auth-token")?.value;

    // Check Zustand auth state from cookie
    const authState = request.cookies.get("mymechanika-auth")?.value;

    let isAuthenticated = false;
    let userRole: UserRole | null = null;

    // Primary check: JWT token exists
    if (accessToken) {
        isAuthenticated = true;
    }

    // Get user role and auth state from Zustand cookie
    if (authState) {
        try {
            const parsed = JSON.parse(decodeURIComponent(authState));
            isAuthenticated = parsed.state?.isAuthenticated || false;
            userRole = parsed.state?.user?.role || null;
        } catch (error) {
            console.error('[Middleware] Error parsing auth state');
            isAuthenticated = false;
            userRole = null;
        }
    }

    // Define protected routes - all routes under (work-shop) group
    const isProtectedRoute = pathname.startsWith("/dashboard") ||
        pathname.startsWith("/bookings") ||
        pathname.startsWith("/services") ||
        pathname.startsWith("/inventory") ||
        pathname.startsWith("/mechanics");

    // Redirect unauthenticated users trying to access protected routes
    if (isProtectedRoute && !isAuthenticated) {
        const url = request.nextUrl.clone();
        url.pathname = "/";
        url.searchParams.set("redirect", pathname);
        return NextResponse.redirect(url);
    }

    // Check role-based permissions for authenticated users on protected routes
    if (isProtectedRoute && isAuthenticated) {
        // If no role found, redirect to login (session might be corrupted)
        if (!userRole) {
            console.warn('[Middleware] No user role found');
            const url = request.nextUrl.clone();
            url.pathname = "/";
            url.searchParams.set("error", "session_invalid");
            return NextResponse.redirect(url);
        }

        // Check if user has permission for this route
        const hasPermission = hasRoutePermission(userRole, pathname);

        if (!hasPermission) {
            // User doesn't have permission - redirect to dashboard with error
            const url = request.nextUrl.clone();
            url.pathname = "/dashboard";
            url.searchParams.set("error", "unauthorized");
            url.searchParams.set("message", "You don't have permission to access this page");
            return NextResponse.redirect(url);
        }
    }

    // Redirect authenticated users away from login page
    if (pathname === "/" && isAuthenticated) {
        const url = request.nextUrl.clone();

        // Check if there's a redirect parameter
        const redirect = request.nextUrl.searchParams.get("redirect");

        // Validate redirect URL has permission
        if (redirect && userRole && hasRoutePermission(userRole, redirect)) {
            url.pathname = redirect;
        } else {
            url.pathname = "/dashboard";
        }

        url.search = ""; // Clear search params
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico
         * - Files with extensions (images, etc)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
