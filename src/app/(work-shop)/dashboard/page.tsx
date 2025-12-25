"use client";

import { useAuthStore } from "@/store/auth-store";
import { UserMenu } from "@/components/auth/UserMenu";
import { Car, Shield, Users, Wrench, AlertCircle, CheckCircle2 } from "lucide-react";
import { getAccessibleRouteMetadata } from "@/lib/permissions";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

const DashboardPage = () => {
  const { user } = useAuthStore();
  const searchParams = useSearchParams();
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const error = searchParams.get("error");
    const message = searchParams.get("message");

    if (error === "unauthorized" && message) {
      setErrorMessage(message);
      setShowError(true);

      // Auto-hide after 5 seconds
      const timer = setTimeout(() => setShowError(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  // Get accessible routes for current user
  const accessibleRoutes = user ? getAccessibleRouteMetadata(user.role) : [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-primary flex items-center justify-center">
              <Car className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-foreground">
                MyMechanika
              </h1>
              <p className="text-xs text-muted-foreground">Workshop Dashboard</p>
            </div>
          </div>
          <UserMenu />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Permission Error Alert */}
        {showError && (
          <div className="mb-6 bg-destructive/10 border border-destructive/50 rounded-lg p-4 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-destructive">Access Denied</p>
              <p className="text-sm text-destructive/80 mt-1">{errorMessage}</p>
            </div>
            <button
              onClick={() => setShowError(false)}
              className="text-destructive/60 hover:text-destructive"
            >
              ✕
            </button>
          </div>
        )}

        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-display font-bold text-foreground mb-2">
            Welcome back, {user?.name}! 👋
          </h2>
          <p className="text-muted-foreground">
            Here's what's happening with your workshop today.
          </p>
        </div>

        {/* Role Badge */}
        <div className="mb-8 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
          <Shield className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-primary">
            Logged in as: {user?.role}
          </span>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Car className="h-6 w-6 text-primary" />
              </div>
              <span className="text-2xl font-bold text-foreground">24</span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Active Bookings
            </h3>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Wrench className="h-6 w-6 text-secondary" />
              </div>
              <span className="text-2xl font-bold text-foreground">12</span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Services Today
            </h3>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <span className="text-2xl font-bold text-foreground">8</span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Mechanics Available
            </h3>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-secondary" />
              </div>
              <span className="text-2xl font-bold text-foreground">98%</span>
            </div>
            <h3 className="text-sm font-medium text-muted-foreground">
              Customer Satisfaction
            </h3>
          </div>
        </div>

        {/* Accessible Routes Section */}
        <div className="mb-8">
          <h3 className="text-xl font-display font-bold text-foreground mb-4">
            Your Accessible Routes
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {accessibleRoutes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className="bg-card border border-border rounded-lg p-4 hover:border-primary hover:shadow-md transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <CheckCircle2 className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                      {route.label}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {route.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 border border-primary/20 rounded-xl p-8">
          <h3 className="text-xl font-display font-bold text-foreground mb-4">
            🎉 Authentication & RBAC System Active
          </h3>
          <div className="space-y-3 text-sm text-muted-foreground">
            <p>
              ✅ You are successfully logged in as <strong className="text-foreground">{user?.email}</strong>
            </p>
            <p>
              ✅ Your role is <strong className="text-foreground">{user?.role}</strong>
            </p>
            <p>
              ✅ Role-Based Access Control (RBAC) is active - you can only access routes permitted for your role
            </p>
            <p>
              ✅ Try accessing a restricted route (e.g., {user?.role === "SUPERVISOR" ? "/inventory" : "/bookings"}) - you'll be redirected with an error
            </p>
            <p>
              ✅ Click the user menu in the top-right corner to logout
            </p>
            <div className="mt-4 p-4 bg-background/50 rounded-lg border border-border/50">
              <p className="font-semibold text-foreground mb-2">Permission Matrix:</p>
              <ul className="space-y-1 text-xs">
                <li>• <strong>Admin</strong>: All routes (Dashboard, Bookings, Services, Inventory, Mechanics)</li>
                <li>• <strong>Manager</strong>: Dashboard, Bookings, Services, Mechanics</li>
                <li>• <strong>Supervisor</strong>: Dashboard, Bookings, Services</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
