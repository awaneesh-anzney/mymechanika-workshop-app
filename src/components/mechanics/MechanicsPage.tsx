"use client";

import { useMemo, useState } from "react";
import { mechanics } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MechanicsTable } from "./MechanicsTable";
import { Plus } from "lucide-react";

export function MechanicsPage() {
  const [search, setSearch] = useState("");

  const filteredMechanics = useMemo(
    () =>
      mechanics.filter((m) =>
        `${m.name} ${m.specialization}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [search]
  );

  const total = mechanics.length;
  const available = mechanics.filter((m) => m.status === "free").length;
  const busy = mechanics.filter((m) => m.status === "busy").length;
  const offline = mechanics.filter((m) => m.status === "offline").length;

  return (
    <div className="flex flex-col gap-6">
      {/* Header section with KPI cards and controls */}
      <div className="flex flex-col gap-4">
        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-card rounded-xl border border-border px-4 py-3 transition-all duration-200 hover:shadow-md hover:border-accent/60 hover:-translate-y-0.5">
            <p className="text-xs text-muted-foreground">Total Mechanics</p>
            <p className="mt-1 text-2xl font-semibold">{total}</p>
          </div>
          <div className="bg-card rounded-xl border border-border px-4 py-3 transition-all duration-200 hover:shadow-md hover:border-accent/60 hover:-translate-y-0.5">
            <p className="text-xs text-muted-foreground">Available</p>
            <p className="mt-1 text-2xl font-semibold text-status-completed">{available}</p>
          </div>
          <div className="bg-card rounded-xl border border-border px-4 py-3 transition-all duration-200 hover:shadow-md hover:border-accent/60 hover:-translate-y-0.5">
            <p className="text-xs text-muted-foreground">Busy</p>
            <p className="mt-1 text-2xl font-semibold text-status-progress">{busy}</p>
          </div>
          <div className="bg-card rounded-xl border border-border px-4 py-3 transition-all duration-200 hover:shadow-md hover:border-accent/60 hover:-translate-y-0.5">
            <p className="text-xs text-muted-foreground">Offline</p>
            <p className="mt-1 text-2xl font-semibold text-muted-foreground">{offline}</p>
          </div>
        </div>

        {/* Search + Add button row */}
        <div className="flex justify-between gap-4">
          <Input
            placeholder="Search mechanics..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-1/3 bg-card border border-border transition-all duration-200 focus-visible:ring-accent focus-visible:ring-1 hover:shadow-sm hover:border-accent/60"
          />
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add Mechanic
          </Button>
        </div>
      </div>

      {/* Table */}
      <MechanicsTable mechanics={filteredMechanics} />
    </div>
  );
}

export default MechanicsPage;
