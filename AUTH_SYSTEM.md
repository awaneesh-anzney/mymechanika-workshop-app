# Authentication System Documentation

## Overview
This authentication system follows industry-standard patterns for Next.js applications with Zustand state management, ready for API integration.

## Architecture

### 1. **State Management (Zustand)**
- **Location**: `src/store/auth-store.ts`
- **Features**:
  - Persistent storage using localStorage
  - TypeScript typed state and actions
  - Separation of concerns (state vs actions)
  - Ready for API integration

### 2. **Type Definitions**
- **Location**: `src/types/auth.ts`
- **Includes**:
  - User interface with role-based access control (RBAC)
  - UserRole enum (ADMIN, MANAGER, SUPERVISOR)
  - Auth state and action interfaces

### 3. **Dummy Users Database**
- **Location**: `src/lib/dummy-users.ts`
- **Purpose**: Simulates PostgreSQL database
- **Users**:
  ```
  Admin:      admin@mymechanika.com      / password123
  Manager:    manager@mymechanika.com    / password123
  Supervisor: supervisor@mymechanika.com / password123
  ```

### 4. **Route Protection**

#### Server-Side (Middleware)
- **Location**: `src/middleware.ts`
- **Protects**: All routes under (work-shop) group
- **Redirects**:
  - Unauthenticated users → Home page (login)
  - Authenticated users on home page → Dashboard

#### Client-Side (Protected Route)
- **Location**: `src/components/providers/protected-route.tsx`
- **Features**:
  - Double-layer protection
  - Loading state during auth check
  - Automatic redirect to login

### 5. **Auth Provider**
- **Location**: `src/components/providers/auth-provider.tsx`
- **Purpose**:
  - Initialize auth state on app load
  - Sync auth state with cookies for middleware access
  - Global auth context

## Usage

### Login Component
The Login component (`src/components/auth/Login.tsx`) includes:
- Form validation
- Error handling
- Test credentials helper
- Automatic redirect after login
- Remember me functionality

### Accessing Auth State
```typescript
import { useAuthStore } from "@/store/auth-store";

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuthStore();
  
  // Use auth state and actions
}
```

### Protecting Routes
Routes under `(work-shop)` group are automatically protected:
- `/dashboard`
- `/bookings`
- `/services`
- `/inventory`
- `/mechanics`

## Migration to Real API

When ready to connect to a real API, update these files:

### 1. Update Auth Store (`src/store/auth-store.ts`)
Replace the `login` action:
```typescript
login: async (email: string, password: string) => {
  set({ isLoading: true, error: null });

  try {
    // Replace with actual API call
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) throw new Error("Login failed");

    const { user, token } = await response.json();

    // Store token securely (httpOnly cookie recommended)
    document.cookie = `auth-token=${token}; path=/; secure; samesite=strict`;

    set({
      user,
      isAuthenticated: true,
      isLoading: false,
      error: null,
    });
  } catch (error) {
    // Error handling...
  }
}
```

### 2. Add Token Refresh Logic
```typescript
refreshToken: async () => {
  const response = await fetch("/api/auth/refresh", {
    method: "POST",
    credentials: "include",
  });
  
  if (!response.ok) {
    // Logout user
    get().logout();
    return;
  }
  
  const { user, token } = await response.json();
  set({ user, isAuthenticated: true });
}
```

### 3. Update Middleware
Add token validation in `src/middleware.ts`:
```typescript
// Verify JWT token
const token = request.cookies.get("auth-token")?.value;
if (token) {
  try {
    const decoded = await verifyJWT(token);
    isAuthenticated = !!decoded;
  } catch {
    isAuthenticated = false;
  }
}
```

## Security Best Practices

✅ **Implemented**:
- Persistent auth state
- Route protection (server + client)
- Error handling
- TypeScript type safety
- Separation of concerns

🔄 **For Production**:
- Use httpOnly cookies for tokens
- Implement JWT token refresh
- Add CSRF protection
- Use secure password hashing (bcrypt)
- Implement rate limiting
- Add 2FA support
- Use environment variables for secrets

## Testing

Use the test credentials helper on the login page:
1. Click "Test Credentials"
2. Select a role (Admin, Manager, or Supervisor)
3. Click "Use" to auto-fill credentials
4. Click "Sign in"

## File Structure
```
src/
├── app/
│   ├── (work-shop)/          # Protected routes group
│   │   ├── layout.tsx        # Wrapped with ProtectedRoute
│   │   ├── dashboard/
│   │   ├── bookings/
│   │   ├── services/
│   │   ├── inventory/
│   │   └── mechanics/
│   ├── layout.tsx            # Root layout with AuthProvider
│   └── page.tsx              # Login page
├── components/
│   ├── auth/
│   │   └── Login.tsx         # Login component
│   └── providers/
│       ├── auth-provider.tsx # Auth initialization
│       └── protected-route.tsx # Route protection
├── lib/
│   └── dummy-users.ts        # Dummy database
├── store/
│   └── auth-store.ts         # Zustand auth store
├── types/
│   └── auth.ts               # TypeScript types
└── middleware.ts             # Next.js middleware
```

## Notes
- All protected routes require authentication
- Authenticated users cannot access the login page
- Auth state persists across page refreshes
- Logout clears all auth data
- Ready for seamless API integration
