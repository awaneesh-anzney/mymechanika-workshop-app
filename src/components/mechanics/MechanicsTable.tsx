"use client";

import { Mechanic } from "@/types";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, MoreHorizontal, Star, Wrench } from "lucide-react";

export interface MechanicsTableProps {
  mechanics: Mechanic[];
}

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

export function MechanicsTable({ mechanics }: MechanicsTableProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col flex-1 bg-card rounded-lg border border-border overflow-hidden">
      <Table
        containerClassName="flex-1 overflow-auto"
        className="border-separate border-spacing-0"
      >
        <TableHeader className="sticky top-0 z-10 bg-card shadow-sm">
          <TableRow className="hover:bg-transparent border-b">
            <TableHead className="bg-card w-[80px]">ID</TableHead>
            <TableHead className="bg-card">Mechanic</TableHead>
            <TableHead className="bg-card">Specialization</TableHead>
            <TableHead className="bg-card">Status</TableHead>
            <TableHead className="bg-card">Rating</TableHead>
            <TableHead className="bg-card">Jobs Today</TableHead>
            <TableHead className="bg-card text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {mechanics.map((m, index) => (
            <TableRow
              key={m.id}
              className="animate-fade-in cursor-pointer"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => router.push(`/mechanics/${m.id}`)}
            >
              <TableCell className="text-xs font-medium text-accent hover:underline">
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
                <div
                  className="flex items-center justify-end gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
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

          {mechanics.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-10">
                No mechanics found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default MechanicsTable;
