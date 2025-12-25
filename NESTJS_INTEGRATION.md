# Integrating Next.js Frontend with NestJS Backend

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    NEXT.JS FRONTEND                         │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Next.js Middleware (middleware.ts)                  │  │
│  │  - Checks for JWT token in cookies                   │  │
│  │  - Redirects unauthorized users                      │  │
│  │  - UX Layer (prevents seeing protected pages)        │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Zustand Store (auth-store.ts)                       │  │
│  │  - Manages auth state                                │  │
│  │  - Calls NestJS API for login/logout                 │  │
│  │  - Stores JWT token in cookies                       │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Protected Routes (work-shop group)                  │  │
│  │  - Dashboard, Bookings, Services, etc.               │  │
│  │  - Makes API calls to NestJS with JWT token          │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                          ↓ HTTP/HTTPS
                    (JWT in Cookie/Header)
                          ↓
┌─────────────────────────────────────────────────────────────┐
│                    NESTJS BACKEND                           │
│                                                             │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Auth Guard (JWT Strategy)                           │  │
│  │  - Validates JWT token                               │  │
│  │  - Checks token expiration                           │  │
│  │  - Security Layer (protects data)                    │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Controllers & Services                              │  │
│  │  - Business logic                                    │  │
│  │  - Database operations                               │  │
│  └──────────────────────────────────────────────────────┘  │
│                          ↓                                  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  PostgreSQL Database                                 │  │
│  │  - Users table with roles                            │  │
│  │  - Workshop data                                     │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## Why Both Layers Are Needed

### Frontend Middleware (Next.js)
**Purpose**: User Experience & Performance
- ✅ Instant redirects (no API call needed)
- ✅ Prevents flash of protected content
- ✅ Reduces unnecessary backend requests
- ✅ Better UX (immediate feedback)
- ❌ NOT secure (can be bypassed with dev tools)

### Backend Guards (NestJS)
**Purpose**: Security & Data Protection
- ✅ Validates JWT cryptographically
- ✅ Protects actual data and business logic
- ✅ Cannot be bypassed
- ✅ Source of truth for authentication
- ❌ Slower (requires API call)

## Integration Steps

### Step 1: Update Zustand Store to Call NestJS API

Update `src/store/auth-store.ts`:

```typescript
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { User, AuthState, AuthActions } from "@/types/auth";

type AuthStore = AuthState & AuthActions;

const STORAGE_KEY = "mymechanika-auth";
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          // Call your NestJS login endpoint
          const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include", // Important: sends cookies
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || "Login failed");
          }

          const data = await response.json();
          const { user, access_token } = data;

          // Store JWT token in cookie (httpOnly recommended from backend)
          // If backend doesn't set httpOnly cookie, set it here:
          if (access_token) {
            document.cookie = `access_token=${access_token}; path=/; max-age=${60 * 60 * 24 * 7}; secure; samesite=strict`;
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

      logout: async () => {
        try {
          // Call NestJS logout endpoint
          await fetch(`${API_BASE_URL}/auth/logout`, {
            method: "POST",
            credentials: "include",
          });
        } catch (error) {
          console.error("Logout error:", error);
        }

        // Clear cookies
        document.cookie = "access_token=; path=/; max-age=0";
        document.cookie = "mymechanika-auth=; path=/; max-age=0";

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

      checkAuth: async () => {
        // Verify token with backend on app load
        try {
          const response = await fetch(`${API_BASE_URL}/auth/me`, {
            credentials: "include",
          });

          if (response.ok) {
            const user = await response.json();
            set({ user, isAuthenticated: true });
          } else {
            set({ user: null, isAuthenticated: false });
          }
        } catch (error) {
          set({ user: null, isAuthenticated: false });
        }
      },
    }),
    {
      name: STORAGE_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
```

### Step 2: NestJS Backend Setup

Your NestJS backend should have these endpoints:

#### Auth Controller (`auth.controller.ts`)

```typescript
import { Controller, Post, Get, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: { email: string; password: string }) {
    const user = await this.authService.validateUser(
      loginDto.email,
      loginDto.password,
    );
    
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Req() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout() {
    // Handle logout logic (e.g., blacklist token)
    return { message: 'Logged out successfully' };
  }
}
```

#### Auth Service (`auth.service.ts`)

```typescript
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    
    if (user && await bcrypt.compare(password, user.password)) {
      const { password, ...result } = user;
      return result;
    }
    
    return null;
  }

  async login(user: any) {
    const payload = { 
      email: user.email, 
      sub: user.id, 
      role: user.role 
    };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }
}
```

#### JWT Strategy (`jwt.strategy.ts`)

```typescript
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req) => req?.cookies?.access_token, // Extract from cookie
      ]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return { 
      id: payload.sub, 
      email: payload.email, 
      role: payload.role 
    };
  }
}
```

### Step 3: API Client Setup

Create an API client to handle authenticated requests:

`src/lib/api-client.ts`:

```typescript
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function apiClient(
  endpoint: string,
  options: RequestInit = {}
) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    credentials: "include", // Send cookies
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      // Token expired or invalid - redirect to login
      window.location.href = "/";
    }
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
}

// Usage example:
// const bookings = await apiClient("/bookings");
```

### Step 4: Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Cookie vs Header for JWT

### Option 1: httpOnly Cookie (Recommended)
**Set by NestJS backend**

```typescript
// NestJS: Set httpOnly cookie
@Post('login')
async login(@Res({ passthrough: true }) response: Response, @Body() loginDto) {
  const { access_token, user } = await this.authService.login(loginDto);
  
  response.cookie('access_token', access_token, {
    httpOnly: true,  // Cannot be accessed by JavaScript
    secure: true,    // HTTPS only
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  
  return { user };
}
```

### Option 2: Authorization Header
**Set by frontend**

```typescript
// Frontend: Send token in header
const response = await fetch(`${API_BASE_URL}/bookings`, {
  headers: {
    "Authorization": `Bearer ${token}`,
  },
});
```

## Security Checklist

- [ ] Use httpOnly cookies for JWT tokens
- [ ] Enable HTTPS in production
- [ ] Set CORS properly in NestJS
- [ ] Implement token refresh mechanism
- [ ] Add CSRF protection
- [ ] Validate tokens on every backend request
- [ ] Use environment variables for secrets
- [ ] Implement rate limiting
- [ ] Hash passwords with bcrypt
- [ ] Add role-based access control (RBAC)

## Summary

**Frontend Middleware**:
- Checks for token existence
- Provides instant UX feedback
- Reduces backend load
- NOT a security measure

**Backend Guards**:
- Validates token cryptographically
- Source of truth
- Actual security layer
- Protects your data

Both layers work together for optimal security and user experience!
