# RBAC Troubleshooting Guide

## Issue: Routes Redirect Back to Dashboard

If you're experiencing redirects back to the dashboard when trying to access other routes, follow these steps:

### Step 1: Check Browser Console

1. Open your browser's Developer Tools (F12)
2. Go to the **Console** tab
3. Look for these log messages:
   - `[Middleware] Auth State:` - Shows authentication status and role
   - `[Permissions] Check:` - Shows permission check results

### Step 2: Use the Debug Panel

A debug panel has been added to the dashboard (bottom-right corner):

1. Login to the dashboard
2. Look for the **🔍 RBAC Debug Info** panel
3. Check:
   - ✅ User email is correct
   - ✅ Role is set (ADMIN, MANAGER, or SUPERVISOR)
   - ✅ Authenticated shows "✅ Yes"
   - ✅ Accessible Routes list shows expected routes
   - ✅ Cookie Data is properly formatted

### Step 3: Common Issues & Solutions

#### Issue 1: Role is `null` or `undefined`
**Symptom**: Debug panel shows no role, or console shows `No user role found`

**Solution**:
1. Logout completely
2. Clear browser cookies
3. Login again
4. Check if role is now set

**Code Fix** (if issue persists):
Check `src/store/auth-store.ts` - ensure the login function properly sets the user object with role.

#### Issue 2: Cookie Not Being Set
**Symptom**: Cookie Data shows "No cookie found"

**Solution**:
1. Check `src/components/providers/auth-provider.tsx`
2. Ensure it's wrapped around your app in `src/app/layout.tsx`
3. Refresh the page after login

#### Issue 3: Permission Check Failing
**Symptom**: Console shows `hasPermission: false` for routes you should access

**Solution**:
1. Check `src/lib/permissions.ts`
2. Verify your role is in `ROLE_PERMISSIONS`
3. Ensure the route path matches exactly (e.g., `/bookings` not `/booking`)

#### Issue 4: Middleware Not Reading Cookie
**Symptom**: Middleware logs show `userRole: null` even though you're logged in

**Solution**:
The cookie might not be syncing properly. Check:
1. Browser cookies (DevTools → Application → Cookies)
2. Look for `mymechanika-auth` cookie
3. Decode the value (it's URL-encoded JSON)
4. Verify it contains `state.user.role`

### Step 4: Manual Cookie Check

Run this in browser console:
```javascript
// Get the auth cookie
const cookies = document.cookie.split(';');
const authCookie = cookies.find(c => c.trim().startsWith('mymechanika-auth='));
if (authCookie) {
  const value = authCookie.split('=')[1];
  const decoded = decodeURIComponent(value);
  console.log('Auth Cookie:', JSON.parse(decoded));
}
```

Expected output:
```json
{
  "state": {
    "isAuthenticated": true,
    "user": {
      "id": "1",
      "email": "admin@mymechanika.com",
      "name": "Admin User",
      "role": "ADMIN",
      ...
    }
  }
}
```

### Step 5: Check Middleware Logs

In the terminal where Next.js is running, you should see:
```
[Middleware] Auth State: { isAuthenticated: true, userRole: 'ADMIN', pathname: '/bookings' }
[Permissions] Check: { role: 'ADMIN', pathname: '/bookings', allowedRoutes: [...], hasPermission: true }
```

If you see `hasPermission: false`, check the `allowedRoutes` array.

### Step 6: Verify Route Paths

Ensure your route paths match exactly:
- ✅ `/dashboard` - Correct
- ✅ `/bookings` - Correct
- ❌ `/Bookings` - Wrong (case-sensitive)
- ❌ `/booking` - Wrong (missing 's')

### Step 7: Clear Everything and Start Fresh

If nothing works:
```bash
# 1. Stop the dev server
# 2. Clear browser data
#    - Cookies
#    - Local Storage
#    - Session Storage
# 3. Clear Next.js cache
rm -rf .next
# 4. Restart dev server
npm run dev
# 5. Login again
```

### Step 8: Test with Different Roles

Test each role systematically:

**Admin Test**:
```
Login: admin@mymechanika.com / password123
Try: /dashboard, /bookings, /services, /inventory, /mechanics
Expected: All should work ✅
```

**Manager Test**:
```
Login: manager@mymechanika.com / password123
Try: /dashboard, /bookings, /services, /mechanics
Expected: All should work ✅
Try: /inventory
Expected: Redirect to dashboard with error ❌
```

**Supervisor Test**:
```
Login: supervisor@mymechanika.com / password123
Try: /dashboard, /bookings, /services
Expected: All should work ✅
Try: /inventory, /mechanics
Expected: Redirect to dashboard with error ❌
```

## Debug Logs Reference

### Normal Flow (Access Granted)
```
[Middleware] Auth State: { isAuthenticated: true, userRole: 'ADMIN', pathname: '/bookings' }
[Permissions] Check: { role: 'ADMIN', pathname: '/bookings', allowedRoutes: ['/dashboard', '/bookings', ...], hasPermission: true }
```

### Access Denied Flow
```
[Middleware] Auth State: { isAuthenticated: true, userRole: 'SUPERVISOR', pathname: '/inventory' }
[Permissions] Check: { role: 'SUPERVISOR', pathname: '/inventory', allowedRoutes: ['/dashboard', '/bookings', '/services'], hasPermission: false }
[Middleware] Redirecting to dashboard with error
```

### Session Invalid Flow
```
[Middleware] Auth State: { isAuthenticated: true, userRole: null, pathname: '/bookings' }
[Middleware] No user role found, redirecting to login
```

## Removing Debug Code (Production)

Once everything works, remove debug code:

1. **Remove debug logs** from `src/middleware.ts`:
   - Remove all `console.log` statements

2. **Remove debug logs** from `src/lib/permissions.ts`:
   - Remove all `console.log` statements

3. **Remove debug panel** from `src/app/(work-shop)/dashboard/page.tsx`:
   - Remove `<RBACDebugger />` component
   - Remove the import

4. **Delete debug component**:
   - Delete `src/components/debug/RBACDebugger.tsx`

## Still Having Issues?

If you've tried everything above and it still doesn't work:

1. **Check the exact error** in browser console
2. **Share the middleware logs** from terminal
3. **Share the cookie value** (remove sensitive data)
4. **Share which role** you're testing with
5. **Share which route** is failing

The issue is likely one of:
- Cookie not being set/read correctly
- Role not being stored in the cookie
- Path mismatch in permissions
- Middleware not running (check `middleware.ts` location)

## Quick Fix Checklist

- [ ] User is logged in
- [ ] Role is visible in debug panel
- [ ] Cookie `mymechanika-auth` exists in browser
- [ ] Cookie contains `state.user.role`
- [ ] Route path matches exactly (case-sensitive)
- [ ] Role has permission for the route (check permission matrix)
- [ ] Middleware logs show correct role
- [ ] Permission check returns true for allowed routes
- [ ] No console errors
- [ ] AuthProvider is wrapping the app

If all checkboxes are ✅ and it still doesn't work, there might be a caching issue - try hard refresh (Ctrl+Shift+R).
