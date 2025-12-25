"use client";

import { useState } from "react";
import SideBar from "@/components/common/SideBar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function WorkShop({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <SideBar
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content */}
      <div
        className={`transition-all duration-300 ${sidebarCollapsed ? "md:ml-20" : "md:ml-64"
          } ml-0`}
      >
        {/* Mobile Header */}
        <header className="sticky top-0 z-30 h-16 border-b border-border bg-card md:hidden flex items-center px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </Button>
          <h1 className="ml-4 font-display font-bold text-lg">
            My<span className="text-primary">Mechanika</span>
          </h1>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
