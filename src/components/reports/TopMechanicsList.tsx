"use client";

import React from "react";
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { topMechanicsData } from "@/data/reportData";
import { formatCurrency } from "@/lib/utils";

export function TopMechanicsList() {
  return (
    <Card className="lg:col-span-6">
      <CardHeader>
        <CardTitle className="text-base font-semibold">
          Top Mechanics This Month
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          {topMechanicsData.map((mechanic, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  {index + 1}
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold">{mechanic.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {mechanic.jobs} jobs completed
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="font-bold">
                  {formatCurrency(mechanic.revenue)}
                </span>
                <div className="flex items-center gap-1 text-xs text-yellow-500">
                  <Star className="h-3 w-3 fill-current" />
                  <span>{mechanic.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
