"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Calendar,
    Wrench,
    Users,
    Package,
    ChevronLeft,
    LogOut,
    Car,
    FileText,
    Truck,
    UserCircle,
    BarChart3,
    Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";
import { UserRole } from "@/types/auth";
import { useRouter } from "next/navigation";

interface NavItem {
    icon: React.ElementType;
    label: string;
    path: string;
    roles: UserRole[];
}

// Define your routes with RBAC
const menuItems: NavItem[] = [
    {
        icon: LayoutDashboard,
        label: "Dashboard",
        path: "/dashboard",
        roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPERVISOR],
    },
    {
        icon: Calendar,
        label: "Bookings",
        path: "/bookings",
        roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPERVISOR],
    },
    {
        icon: Wrench,
        label: "Services",
        path: "/services",
        roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPERVISOR],
    },
    {
        icon: Users,
        label: "Mechanics",
        path: "/mechanics",
        roles: [UserRole.ADMIN, UserRole.MANAGER],
    },
    {
        icon: Package,
        label: "Inventory",
        path: "/inventory",
        roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPERVISOR],
    },

     {
        icon: FileText,
        label: "Invoices & Payments",
        path: "/invoices",
        roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPERVISOR],
    },
     {
        icon: Truck,
        label: "Pickup & Delivery",
        path: "/delivery",
        roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPERVISOR],
    },
     {
        icon: UserCircle,
        label: "Customers",
        path: "/customers",
        roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPERVISOR],
    },
     {
        icon: BarChart3,
        label: "Reports",
        path: "/reports",
        roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPERVISOR],
    },
     {
        icon: Settings,
        label: "Settings",
        path: "/settings",
        roles: [UserRole.ADMIN, UserRole.MANAGER, UserRole.SUPERVISOR],
    },
];

interface SidebarProps {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
    mobileOpen: boolean;
    setMobileOpen: (open: boolean) => void;
}

const SideBar = ({
    collapsed,
    setCollapsed,
    mobileOpen,
    setMobileOpen,
}: SidebarProps) => {
    const pathname = usePathname();
    const router = useRouter();
    const { user, logout } = useAuthStore();

    // Filter menu items based on user role
    const filteredMenuItems = user
        ? menuItems.filter((item) => item.roles.includes(user.role))
        : [];

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    return (
        <>
            {/* Mobile Backdrop */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed left-0 top-0 h-screen bg-card border-r border-border flex flex-col transition-all duration-300 z-50",
                    // Mobile styles
                    "w-64 -translate-x-full md:translate-x-0",
                    mobileOpen && "translate-x-0",
                    // Desktop styles
                    collapsed ? "md:w-20" : "md:w-64"
                )}
            >
                {/* Logo */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-border">
                    <Link href="/dashboard" className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shrink-0">
                            <Car className="w-5 h-5 text-primary-foreground" />
                        </div>
                        {(!collapsed || mobileOpen) && (
                            <span className="font-display font-bold text-lg text-foreground">
                                <span className={cn("md:block", collapsed ? "hidden" : "block")}>
                                    My<span className="text-primary">Mechanika</span>
                                </span>
                                {/* Mobile always shows full logo */}
                                <span className="md:hidden block">
                                    My<span className="text-primary">Mechanika</span>
                                </span>
                            </span>
                        )}
                    </Link>

                    {/* Desktop Collapse Button */}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="p-1.5 rounded-lg hover:bg-muted transition-colors hidden md:block"
                        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
                    >
                        <ChevronLeft
                            className={cn(
                                "w-5 h-5 transition-transform",
                                collapsed && "rotate-180"
                            )}
                        />
                    </button>

                    {/* Mobile Close Button */}
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="p-1.5 rounded-lg hover:bg-muted transition-colors md:hidden"
                        aria-label="Close sidebar"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 py-4 px-3 overflow-y-auto">
                    <ul className="space-y-1">
                        {filteredMenuItems.map((item) => {
                            const isActive = pathname === item.path;
                            return (
                                <li key={item.path}>
                                    <Link
                                        href={item.path}
                                        onClick={() => setMobileOpen(false)}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                                            isActive
                                                ? "bg-primary text-primary-foreground shadow-sm"
                                                : "text-muted-foreground hover:text-foreground hover:bg-muted"
                                        )}
                                    >
                                        <item.icon
                                            className={cn(
                                                "w-5 h-5 shrink-0",
                                                isActive && "text-primary-foreground"
                                            )}
                                        />

                                        {/* Label: Hidden if collapsed on desktop, visible on mobile */}
                                        <span
                                            className={cn(
                                                "font-medium whitespace-nowrap transition-all duration-300",
                                                collapsed ? "md:hidden" : "md:block",
                                                "block" // Always visible on mobile
                                            )}
                                        >
                                            {item.label}
                                        </span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Footer - Logout */}
                <div className="p-4 border-t border-border">
                    <Button
                        variant="ghost"
                        onClick={handleLogout}
                        className={cn(
                            "w-full text-muted-foreground hover:text-destructive hover:bg-destructive/10",
                            collapsed ? "md:px-0 md:justify-center" : "md:justify-start",
                            "justify-start" // Always left align on mobile
                        )}
                    >
                        <LogOut className="w-5 h-5" />
                        <span
                            className={cn(
                                "ml-2 transition-all duration-300",
                                collapsed ? "md:hidden" : "md:block",
                                "block"
                            )}
                        >
                            Logout
                        </span>
                    </Button>
                </div>
            </aside>
        </>
    );
};

export default SideBar;
