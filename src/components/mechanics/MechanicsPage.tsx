"use client";

import { useMemo, useState } from "react";
import { mechanics } from "@/data/mockData";
import { Mechanic } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Plus, Phone, Mail, MoreHorizontal, Star, Wrench } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function getInitials(name: string) {
  const parts = name.split(" ");
  const first = parts[0]?.[0] ?? "";
  const last = parts[1]?.[0] ?? "";
  return (first + last).toUpperCase();
}

function getStatusBadge(status: Mechanic["status"]) {
  switch (status) {
    case "free":
      return (
        <Badge className="bg-status-completed/10 text-status-completed border-0">
          Available
        </Badge>
      );
    case "busy":
      return (
        <Badge className="bg-status-progress/10 text-status-progress border-0">
          Busy
        </Badge>
      );
    case "offline":
      return (
        <Badge className="bg-muted text-muted-foreground border-0">
          Offline
        </Badge>
      );
    default:
      return null;
  }
}

export function MechanicsPage() {
  const [search, setSearch] = useState("");

const router = useRouter();
   
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
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead className="w-[80px]">ID</TableHead>
              <TableHead>Mechanic</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Jobs Today</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMechanics.map((m, index) => (
              <TableRow
                key={m.id}
                className="animate-fade-in transition-colors duration-150 hover:bg-muted/40"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <TableCell 
                onClick={() => router.push(`/mechanics/${m.id}`)}
                  className="text-xs font-medium text-accent hover:underline"
                >
                   
                    {m.id}
                  
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-semibold">
                      {getInitials(m.name)}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{m.name}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Wrench className="w-4 h-4" />
                    <span>{m.specialization}</span>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(m.status)}</TableCell>
                <TableCell>
                  <div className="inline-flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="font-medium">{m.rating.toFixed(1)}</span>
                  </div>
                </TableCell>
                <TableCell>{m.completedToday}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8" title="Call">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" title="Message">
                      <Mail className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" title="More">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default MechanicsPage;
