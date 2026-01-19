"use client";

import React from "react";
import { ReportsStats } from "./ReportsStats";
import { RevenueTrendChart } from "./RevenueTrendChart";
import { WeeklyBookingsChart } from "./WeeklyBookingsChart";
import { ServiceBreakdownChart } from "./ServiceBreakdownChart";
import { TopMechanicsList } from "./TopMechanicsList";

export function ReportsDashboard() {
  return (
    <div className="flex flex-col gap-6 p-4">
      {/* KPI Stats Grid */}
      <ReportsStats />

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <RevenueTrendChart />
        <WeeklyBookingsChart />
        <ServiceBreakdownChart />
        <TopMechanicsList />
      </div>
    </div>
  );
}
