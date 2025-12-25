"use client";

import { useState } from "react";
import SideBar from "@/components/common/SideBar";
import { Header } from "@/components/common/Header";

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

      {/* Main Content Area */}
      <div
        className={`transition-all duration-300 ${sidebarCollapsed ? "md:ml-20" : "md:ml-64"
          } ml-0`}
      >
        {/* Header */}
        <Header onMenuToggle={() => setMobileOpen(true)} />

        {/* Page Content */}
        <main className="p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
