"use client";

import { useState, useEffect } from "react";
import SideBar from "@/components/common/SideBar";
import { Header } from "@/components/common/Header";

interface WorkshopShellProps {
    children: React.ReactNode;
}

export function WorkshopShell({ children }: WorkshopShellProps) {
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const storedCollapsed = localStorage.getItem("mymechanika-sidebar-collapsed");
        if (storedCollapsed) {
            try {
                setSidebarCollapsed(JSON.parse(storedCollapsed));
            } catch (e) {
                console.error(e);
            }
        }
    }, []);

    const handleSetCollapsed = (collapsed: boolean) => {
        setSidebarCollapsed(collapsed);
        localStorage.setItem("mymechanika-sidebar-collapsed", JSON.stringify(collapsed));
    };

    // Default to false (expanded) for SSR matching
    const isCollapsed = mounted ? sidebarCollapsed : false;

    return (
        <div className="flex h-screen bg-background overflow-hidden relative">
            <SideBar
                collapsed={isCollapsed}
                setCollapsed={handleSetCollapsed}
                mobileOpen={mobileOpen}
                setMobileOpen={setMobileOpen}
            />

            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                <Header onMenuToggle={() => setMobileOpen(true)} />

                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
