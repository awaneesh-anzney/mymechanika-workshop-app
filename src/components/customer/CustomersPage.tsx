"use client";

import { useMemo, useState } from "react";
import { bookings } from "@/data/mockData";
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
import { Card } from "@/components/ui/card";
import { Phone, Mail, History } from "lucide-react";
import Link from "next/link";

interface AggregatedCustomer {
  id: string;
  name: string;
  phone: string;
  totalVisits: number;
  totalSpent: number;
  vehicles: string[];
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function CustomersPage() {
  const [search, setSearch] = useState("");

  const { customers, totalCustomers, totalBookings, totalRevenue } = useMemo(() => {
    const map = new Map<string, AggregatedCustomer>();
    let revenue = 0;

    for (const b of bookings) {
      revenue += b.totalAmount ?? 0;
      const key = b.customerId ?? b.customerName;
      const existing = map.get(key);
      const vehicleLabel = `${b.carMake} ${b.carModel}`;

      if (!existing) {
        map.set(key, {
          id: b.customerId ?? key,
          name: b.customerName,
          phone: b.customerPhone,
          totalVisits: 1,
          totalSpent: b.totalAmount ?? 0,
          vehicles: vehicleLabel ? [vehicleLabel] : [],
        });
      } else {
        existing.totalVisits += 1;
        existing.totalSpent += b.totalAmount ?? 0;
        if (vehicleLabel && !existing.vehicles.includes(vehicleLabel)) {
          existing.vehicles.push(vehicleLabel);
        }
      }
    }

    const customers = Array.from(map.values());

    return {
      customers,
      totalCustomers: customers.length,
      totalBookings: bookings.length,
      totalRevenue: revenue,
    };
  }, []);

  const filteredCustomers = useMemo(
    () =>
      customers.filter((c) => {
        const term = search.toLowerCase();
        return (
          c.name.toLowerCase().includes(term) ||
          c.phone.toLowerCase().includes(term)
        );
      }),
    [customers, search]
  );

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-2">
        {/* Stats + Add button */}
        <div className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card className="px-4 py-3 flex flex-col justify-between bg-card border-border transition-all duration-200 hover:shadow-md hover:border-accent/60 hover:-translate-y-0.5">
              <p className="text-xs text-muted-foreground">Total Customers</p>
              <p className="mt-1 text-2xl font-semibold">{totalCustomers}</p>
            </Card>
            <Card className="px-4 py-3 flex flex-col justify-between bg-card border-border transition-all duration-200 hover:shadow-md hover:border-accent/60 hover:-translate-y-0.5">
              <p className="text-xs text-muted-foreground">Total Bookings</p>
              <p className="mt-1 text-2xl font-semibold">{totalBookings}</p>
            </Card>
            <Card className="px-4 py-3 flex flex-col justify-between bg-card border-border transition-all duration-200 hover:shadow-md hover:border-accent/60 hover:-translate-y-0.5">
              <p className="text-xs text-muted-foreground">Total Revenue</p>
              <p className="mt-1 text-2xl font-semibold text-emerald-600">
                {formatCurrency(totalRevenue)}
              </p>
            </Card>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Input
              placeholder="Search by name or phone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="sm:w-1/3 bg-card border border-border transition-all duration-200 hover:shadow-sm hover:border-accent/60 focus-visible:ring-accent focus-visible:ring-1"
            />
            <div className="flex-1 flex justify-end">
              <Button className="gap-2">
                + Add Customer
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Customers table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/40">
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Total Visits</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead>Registered Vehicles</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCustomers.map((c) => (
              <TableRow key={c.id} className="hover:bg-muted/40">
                {/* ID column */}
                <TableCell className="w-[10%] align-middle">
                  <Link
                    href={`/customers/${c.id}`}
                    className="text-xs font-medium text-accent hover:underline truncate max-w-[80px]"
                  >
                    {c.id}
                  </Link>
                </TableCell>
                {/* Customer name */}
                <TableCell className="w-[24%] align-middle">
                  <span className="font-medium text-foreground truncate max-w-[220px]">
                    {c.name}
                  </span>
                </TableCell>
                {/* Phone */}
                <TableCell className="w-[20%] align-middle">
                  <span className="text-sm text-foreground truncate max-w-[220px]">
                    {c.phone}
                  </span>
                </TableCell>
                {/* Visits */}
                <TableCell className="w-[12%] text-right align-middle">
                  <span className="font-semibold">{c.totalVisits}</span>
                </TableCell>
                {/* Spent */}
                <TableCell className="w-[14%] text-right align-middle">
                  <span className="font-semibold text-emerald-600">
                    {formatCurrency(c.totalSpent)}
                  </span>
                </TableCell>
                {/* Vehicles */}
                <TableCell className="w-[20%] align-middle">
                  <div className="flex flex-wrap gap-1">
                    {c.vehicles.map((v) => (
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
                    <Button variant="outline" size="sm" className="gap-1">
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
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default CustomersPage;
