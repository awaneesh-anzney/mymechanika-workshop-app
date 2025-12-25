"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    LayoutDashboard,
    CalendarDays,
    Wrench,
    Users,
    Package,
    LogOut,
    Settings,
} from "lucide-react";

const sidebarItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Bookings",
        href: "/bookings",
        icon: CalendarDays,
    },
    {
        title: "Services",
        href: "/services",
        icon: Wrench,
    },
    {
        title: "Mechanics",
        href: "/mechanics",
        icon: Users,
    },
    {
        title: "Inventory",
        href: "/inventory",
        icon: Package,
    },
];

export function SideBar() {
    const pathname = usePathname();

    return (
        <div className="flex h-screen w-64 flex-col border-r bg-background">
            <div className="flex h-16 items-center border-b px-6">
                <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
                    <Wrench className="h-6 w-6 text-primary" />
                    <span className="text-lg font-bold">MyMechanika</span>
                </Link>
            </div>
            <div className="flex-1 overflow-auto py-4">
                <nav className="grid items-start px-2 text-sm font-medium gap-1">
                    {sidebarItems.map((item, index) => {
                        const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
                        return (
                            <Link
                                key={index}
                                href={item.href}
                            >
                                <Button
                                    variant={isActive ? "secondary" : "ghost"}
                                    className={cn(
                                        "w-full justify-start gap-3 px-3",
                                        isActive && "bg-secondary text-secondary-foreground"
                                    )}
                                >
                                    <item.icon className="h-4 w-4" />
                                    {item.title}
                                </Button>
                            </Link>
                        );
                    })}
                </nav>
            </div>
            <div className="mt-auto p-4">
                <Link href="/settings">
                    <Button variant="ghost" className="w-full justify-start gap-3 mb-2">
                        <Settings className="h-4 w-4" />
                        Settings
                    </Button>
                </Link>
                <Separator className="my-2" />
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </Button>
            </div>
        </div>
    );
}
