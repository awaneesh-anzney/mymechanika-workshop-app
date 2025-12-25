# Role-Based Access Control (RBAC) Documentation

## Overview

The authentication system now includes **Role-Based Access Control (RBAC)** that restricts access to routes based on user roles.

## Permission Matrix

| Route | Admin | Manager | Supervisor |
|-------|-------|---------|------------|
| `/dashboard` | ✅ | ✅ | ✅ |
| `/bookings` | ✅ | ✅ | ✅ |
| `/services` | ✅ | ✅ | ✅ |
| `/inventory` | ✅ | ❌ | ❌ |
| `/mechanics` | ✅ | ✅ | ❌ |

## Role Descriptions

### Admin (Full Access)
- **Access**: All routes
- **Permissions**: Complete system access
- **Use Case**: System administrators, workshop owners
- **Test Credentials**: `admin@mymechanika.com` / `password123`

### Manager (Limited Management)
- **Access**: Dashboard, Bookings, Services, Mechanics
- **Restrictions**: Cannot access Inventory
- **Use Case**: Workshop managers, team leads
- **Test Credentials**: `manager@mymechanika.com` / `password123`

### Supervisor (Basic Access)
- **Access**: Dashboard, Bookings, Services
- **Restrictions**: Cannot access Inventory or Mechanics
- **Use Case**: Service supervisors, customer service
- **Test Credentials**: `supervisor@mymechanika.com` / `password123`

## How It Works

### 1. Middleware Layer (Server-Side)
Location: `src/middleware.ts`

```typescript
// Checks user role from cookie
const userRole = parsed.state?.user?.role;

// Validates permission
const hasPermission = hasRoutePermission(userRole, pathname);

// Redirects if no permission
if (!hasPermission) {
  redirect to dashboard with error
}
```

### 2. Permission System
Location: `src/lib/permissions.ts`

```typescript
// Define permissions for each role
export const ROLE_PERMISSIONS: Record<UserRole, Route[]> = {
  [UserRole.ADMIN]: [/* all routes */],
  [UserRole.MANAGER]: [/* limited routes */],
  [UserRole.SUPERVISOR]: [/* basic routes */],
};

// Check permission
export function hasRoutePermission(role: UserRole, pathname: string): boolean {
  const allowedRoutes = ROLE_PERMISSIONS[role];
  return allowedRoutes.some((route) => pathname.startsWith(route));
}
```

### 3. Dashboard Display
Location: `src/app/(work-shop)/dashboard/page.tsx`

- Shows only accessible routes for the user's role
- Displays permission error when redirected from unauthorized route
- Shows permission matrix for reference

## Testing RBAC

### Test Scenario 1: Supervisor Accessing Inventory
1. Login as Supervisor: `supervisor@mymechanika.com` / `password123`
2. Try to access `/inventory`
3. **Result**: Redirected to dashboard with error message

### Test Scenario 2: Manager Accessing Mechanics
1. Login as Manager: `manager@mymechanika.com` / `password123`
2. Access `/mechanics`
3. **Result**: Access granted

### Test Scenario 3: Admin Accessing Everything
1. Login as Admin: `admin@mymechanika.com` / `password123`
2. Access any route
3. **Result**: Access granted to all routes

## User Experience Flow

### Unauthorized Access Attempt
```
User tries to access /inventory
         ↓
Middleware checks role
         ↓
User is Supervisor (no permission)
         ↓
Redirect to /dashboard?error=unauthorized&message=...
         ↓
Dashboard shows error alert
         ↓
Error auto-hides after 5 seconds
```

### Successful Access
```
User tries to access /bookings
         ↓
Middleware checks role
         ↓
User has permission
         ↓
Page loads successfully
```

## Customizing Permissions

### Adding a New Route

1. **Add route to enum** (`src/lib/permissions.ts`):
```typescript
export enum Route {
  // ... existing routes
  REPORTS = "/reports",
}
```

2. **Add to role permissions**:
```typescript
export const ROLE_PERMISSIONS: Record<UserRole, Route[]> = {
  [UserRole.ADMIN]: [
    // ... existing routes
    Route.REPORTS,
  ],
  [UserRole.MANAGER]: [
    // ... existing routes
    Route.REPORTS, // if managers should access
  ],
  // ...
};
```

3. **Add route metadata**:
```typescript
export const ROUTE_METADATA: RouteMetadata[] = [
  // ... existing routes
  {
    path: Route.REPORTS,
    label: "Reports",
    icon: "FileText",
    description: "Analytics and reports",
    requiredRoles: [UserRole.ADMIN, UserRole.MANAGER],
  },
];
```

4. **Update middleware** (if needed):
```typescript
const isProtectedRoute = pathname.startsWith("/dashboard") ||
  pathname.startsWith("/bookings") ||
  // ... existing routes
  pathname.startsWith("/reports");
```

### Adding a New Role

1. **Add to UserRole enum** (`src/types/auth.ts`):
```typescript
export enum UserRole {
  ADMIN = "ADMIN",
  MANAGER = "MANAGER",
  SUPERVISOR = "SUPERVISOR",
  TECHNICIAN = "TECHNICIAN", // new role
}
```

2. **Add permissions** (`src/lib/permissions.ts`):
```typescript
export const ROLE_PERMISSIONS: Record<UserRole, Route[]> = {
  // ... existing roles
  [UserRole.TECHNICIAN]: [
    Route.DASHBOARD,
    Route.SERVICES,
  ],
};
```

3. **Add dummy user** (`src/lib/dummy-users.ts`):
```typescript
{
  id: "4",
  email: "technician@mymechanika.com",
  name: "Technician User",
  role: UserRole.TECHNICIAN,
  // ...
}
```

## Security Considerations

### Frontend Protection (Middleware)
- ✅ Provides immediate UX feedback
- ✅ Prevents unauthorized page views
- ✅ Reduces backend load
- ❌ Can be bypassed with dev tools
- ❌ NOT a security measure

### Backend Protection (Required)
When integrating with NestJS, add role guards:

```typescript
// NestJS Guard Example
@Controller('inventory')
export class InventoryController {
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @Get()
  findAll() {
    // Only accessible by Admin
  }
}
```

**Important**: Always validate permissions on the backend. Frontend protection is for UX only!

## API Integration

When connecting to NestJS backend:

1. **Send role in JWT payload**:
```typescript
// NestJS auth.service.ts
async login(user: any) {
  const payload = { 
    email: user.email, 
    sub: user.id, 
    role: user.role // Include role
  };
  
  return {
    access_token: this.jwtService.sign(payload),
    user: { ...user },
  };
}
```

2. **Validate role in guards**:
```typescript
// NestJS roles.guard.ts
@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<UserRole[]>(
      'roles',
      context.getHandler(),
    );
    
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.includes(user.role);
  }
}
```

## Files Modified/Created

### New Files
- ✅ `src/lib/permissions.ts` - RBAC system
- ✅ `RBAC_DOCUMENTATION.md` - This file

### Modified Files
- ✅ `src/middleware.ts` - Added role checking
- ✅ `src/app/(work-shop)/dashboard/page.tsx` - Added accessible routes display
- ✅ `src/app/(work-shop)/inventory/page.tsx` - Updated placeholder

## Summary

✅ **RBAC System Active**: Routes are now restricted based on user roles
✅ **Three Roles**: Admin (full), Manager (limited), Supervisor (basic)
✅ **Middleware Protection**: Automatic redirect for unauthorized access
✅ **User Feedback**: Error messages when access is denied
✅ **Dashboard Integration**: Shows only accessible routes
✅ **Ready for Backend**: Easy to integrate with NestJS role guards

**Test it now**: Login with different roles and try accessing restricted routes!
