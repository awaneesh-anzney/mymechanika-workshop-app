"use client";

export interface AggregatedCustomer {
  id: string;
  name: string;
  phone: string;
  totalVisits: number;
  totalSpent: number;
  vehicles: string[];
}
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Phone, Mail, History } from "lucide-react";
 
import { useRouter } from "next/navigation";

export interface CustomersTableProps {
  customers: AggregatedCustomer[];
  onViewCustomer?: (customer: AggregatedCustomer) => void;
}

export function CustomersTable({ customers, onViewCustomer }: CustomersTableProps) {
  const router = useRouter();


  return (
    <div className="flex flex-col flex-1 bg-card rounded-lg border border-border overflow-hidden">
      <Table
        containerClassName="flex-1 overflow-auto"
        className="border-separate border-spacing-0"
      >
        {/* <TableHeader className="sticky top-0 z-10 bg-card shadow-sm">
          <TableRow className="hover:bg-transparent border-b">
            <TableHead className="bg-card w-[10%]">ID</TableHead>
            <TableHead className="bg-card w-[24%]">Customer</TableHead>
            <TableHead className="bg-card w-[20%]">Phone</TableHead>
            <TableHead className="bg-card w-[12%] text-right">Total Visits</TableHead>
            <TableHead className="bg-card w-[14%] text-right">Total Spent</TableHead>
            <TableHead className="bg-card w-[20%]">Registered Vehicles</TableHead>
            <TableHead className="bg-card w-[10%] text-right">Actions</TableHead>
          </TableRow>
        </TableHeader> */}

         <TableHeader className="sticky top-0 z-10 bg-card shadow-sm">
          <TableRow className="hover:bg-transparent border-b">
            <TableHead className="bg-card"> Customer ID</TableHead>
            <TableHead className="bg-card"> Name</TableHead>
            <TableHead className="bg-card"> Phone</TableHead>
            <TableHead className="bg-card"> Total Visits</TableHead>
            <TableHead className="bg-card"> Total Spent</TableHead>
            <TableHead className="bg-card"> Vehicles</TableHead>
            <TableHead className="text-right bg-card">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {customers.map((c, index) => (
            <TableRow
              key={c.id}
              className="hover:bg-muted/40 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* ID column */}
              <TableCell>
                <button
                  onClick={() => router.push(`/customers/${c.id}`)}
                  className="font-medium hover:text-primary hover:underline transition-colors"
                >
                  {c.id}
                </button>
              </TableCell>

              {/* Customer name */}
              <TableCell>
                <span  className=" font-semibold text-xs text-primary text-muted-foreground">
                  {c.name}
                </span>
              </TableCell>

              {/* Phone */}
              <TableCell>
                <span className="text-sm text-foreground truncate ">
                  {c.phone}
                </span>
              </TableCell>

              {/* Visits */}
              <TableCell>
                <span className="font-semibold  text-center">{c.totalVisits}</span>
              </TableCell>

              {/* Spent */}
              <TableCell>
                <span className="font-semibold text-emerald-600 text-center">
                  {c.totalSpent.toLocaleString("en-IN")}
                </span>
              </TableCell>

              {/* Vehicles */}
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {c.vehicles.map((v: string) => (
                    <span
                      key={v}
                      className="px-2 py-0.5 rounded-full border border-border bg-muted/60 text-xs"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </TableCell>

              {/* Actions */}
              <TableCell className="w-[10%] align-middle">
                <div className="flex items-center justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1"
                    onClick={() => onViewCustomer?.(c)}
                  >
                    <History className="w-4 h-4" />
                    History
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" title="Call">
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8" title="Email">
                    <Mail className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}

          {customers.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center py-10">
                No customers found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

