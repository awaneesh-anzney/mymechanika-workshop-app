"use client";

import { useAuthStore } from "@/store/auth-store";
import { UserMenu } from "@/components/auth/UserMenu";
import { Car, Package } from "lucide-react";
import Link from "next/link";

const InventoryPage = () => {
  const { user } = useAuthStore();

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
              <p className="text-xs text-muted-foreground">Inventory Management</p>
            </div>
          </div>
          <UserMenu />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/dashboard"
            className="text-sm text-primary hover:text-primary/80 flex items-center gap-2"
          >
            ← Back to Dashboard
          </Link>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <div className="h-16 w-16 rounded-xl bg-primary/10 flex items-center justify-center">
            <Package className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h2 className="text-3xl font-display font-bold text-foreground">
              Inventory Management
            </h2>
            <p className="text-muted-foreground">
              Manage parts, tools, and workshop inventory
            </p>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-8 text-center">
          <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            Inventory Page
          </h3>
          <p className="text-muted-foreground mb-4">
            This page is only accessible to <strong>Admin</strong> role.
          </p>
          <p className="text-sm text-muted-foreground">
            Current user: <strong className="text-foreground">{user?.name}</strong> ({user?.role})
          </p>
        </div>
      </main>
    </div>
  );
};

export default InventoryPage;
