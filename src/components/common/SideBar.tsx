"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    LayoutDashboard,
    CalendarDays,
    Wrench,
    Users,
    Package,
    LogOut,
    Settings,
    Briefcase,
    FileText,
    Truck,
    BarChart3,
    ChevronLeft,
    ChevronRight,
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
    {
        title: "Live Jobs",
        href: "/live-jobs",
        icon: Briefcase,
    },
    {
        title: "Invoices",
        href: "/invoices",
        icon: FileText,
    },
    {
        title: "Pickup & Delivery",
        href: "/pickup-delivery",
        icon: Truck,
    },
    {
        title: "Customers",
        href: "/customers",
        icon: Users,
    },
    {
        title: "Reports",
        href: "/reports",
        icon: BarChart3,
    },
    {
        title: "Settings",
        href: "/settings",
        icon: Settings,
    },
];

export function SideBar() {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    return (
        <TooltipProvider>
            <div
                className={cn(
                    "relative flex h-screen flex-col border-r bg-background transition-all duration-300",
                    isCollapsed ? "w-[70px]" : "w-64"
                )}
            >
                <div className="flex h-16 items-center justify-between border-b px-4">
                    <Link
                        href="/dashboard"
                        className={cn(
                            "flex items-center gap-2 font-semibold overflow-hidden transition-all",
                            isCollapsed ? "w-0 px-0 opacity-0" : "w-auto opacity-100"
                        )}
                    >
                        <Wrench className="h-6 w-6 text-primary shrink-0" />
                        <span className="text-lg font-bold whitespace-nowrap">
                            MyMechanika
                        </span>
                    </Link>
                    <Button
                        variant="ghost"
                        size="icon"
                        className={cn("h-8 w-8", isCollapsed && "ml-auto")}
                        onClick={() => setIsCollapsed(!isCollapsed)}
                    >
                        {isCollapsed ? (
                            <ChevronRight className="h-4 w-4" />
                        ) : (
                            <ChevronLeft className="h-4 w-4" />
                        )}
                    </Button>
                </div>
                <div className="flex-1 overflow-auto py-4">
                    <nav className="grid items-start px-2 text-sm font-medium gap-1">
                        {sidebarItems.map((item, index) => {
                            const isActive =
                                pathname === item.href || pathname.startsWith(`${item.href}/`);

                            if (isCollapsed) {
                                return (
                                    <Tooltip key={index} delayDuration={0}>
                                        <TooltipTrigger asChild>
                                            <Link href={item.href}>
                                                <Button
                                                    variant={isActive ? "secondary" : "ghost"}
                                                    size="icon"
                                                    className={cn(
                                                        "w-full justify-center",
                                                        isActive && "bg-secondary text-secondary-foreground"
                                                    )}
                                                >
                                                    <item.icon className="h-4 w-4" />
                                                    <span className="sr-only">{item.title}</span>
                                                </Button>
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent side="right">
                                            {item.title}
                                        </TooltipContent>
                                    </Tooltip>
                                );
                            }

                            return (
                                <Link key={index} href={item.href}>
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
                    <Separator className="my-2" />
                    {isCollapsed ? (
                        <Tooltip delayDuration={0}>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="w-full justify-center text-destructive hover:text-destructive hover:bg-destructive/10"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span className="sr-only">Sign Out</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right">Sign Out</TooltipContent>
                        </Tooltip>
                    ) : (
                        <Button
                            variant="ghost"
                            className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                        </Button>
                    )}
                </div>
            </div>
        </TooltipProvider>
    );
}
