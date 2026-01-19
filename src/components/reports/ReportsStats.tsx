"use client";

import React from "react";
import { KPICard } from "@/components/dashboard/KPICard";
import { Banknote, Wrench, Users, Target } from "lucide-react";
import { reportKPIs } from "@/data/reportData";
import { formatCurrency } from "@/lib/utils";

export function ReportsStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {reportKPIs.map((kpi, index) => {
        const Icon =
          {
            banknote: Banknote,
            wrench: Wrench,
            users: Users,
            target: Target,
          }[kpi.icon] || Target;

        return (
          <KPICard
            key={index}
            title={kpi.title}
            value={
              kpi.title.includes("Revenue") || kpi.title.includes("Job Value")
                ? formatCurrency(kpi.value)
                : kpi.value
            }
            trend={{ value: kpi.trend, isPositive: kpi.isPositive }}
            icon={Icon}
            variant={kpi.variant as any}
          />
        );
      })}
    </div>
  );
}
