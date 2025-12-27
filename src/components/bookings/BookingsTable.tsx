"use client";

import { useState } from "react";
import { Eye, UserPlus, FileText, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BookingStatusBadge } from "./BookingStatusBadge";
import { Booking } from "@/types";
import Pagination from "./Pagination";

interface BookingsTableProps {
  bookings: Booking[];
  onView?: (booking: Booking) => void;
  onAssign?: (booking: Booking) => void;
  onInvoice?: (booking: Booking) => void;
}

export function BookingsTable({
  bookings,
  onView,
  onAssign,
  onInvoice,
}: BookingsTableProps) {
  const [page, setPage] = useState(1);
  const itemsPerPage = 15;

  const totalPages = Math.ceil(bookings.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedBookings = bookings.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="flex flex-col flex-1 bg-card rounded-lg border border-border overflow-hidden">
      
      {/* TABLE SCROLL AREA */}
      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-muted/50">
            <TableRow>
              <TableHead>Booking ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Car Details</TableHead>
              <TableHead>Services</TableHead>
              <TableHead>Mechanic</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginatedBookings.map((booking, index) => (
              <TableRow
                key={booking.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <TableCell>
                  <span className="font-medium">{booking.id}</span>
                </TableCell>

                <TableCell>
                  <div>
                    <p className="font-medium">{booking.customerName}</p>
                    <p className="text-xs text-muted-foreground">
                      {booking.customerPhone}
                    </p>
                  </div>
                </TableCell>

                <TableCell>
                  <div>
                    <p className="font-medium">
                      {booking.carMake} {booking.carModel}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {booking.carPlate}
                    </p>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {booking.services.slice(0, 2).map((service, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-secondary text-xs rounded-md"
                      >
                        {service}
                      </span>
                    ))}
                    {booking.services.length > 2 && (
                      <span className="px-2 py-0.5 bg-secondary text-xs rounded-md text-muted-foreground">
                        +{booking.services.length - 2}
                      </span>
                    )}
                  </div>
                </TableCell>

                <TableCell>
                  {booking.mechanicName ? (
                    <span>{booking.mechanicName}</span>
                  ) : (
                    <span className="text-muted-foreground italic">
                      Unassigned
                    </span>
                  )}
                </TableCell>

                <TableCell>
                  <BookingStatusBadge status={booking.status} />
                </TableCell>

                <TableCell>
                  <div className="flex justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onView?.(booking)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>

                    {!booking.mechanicId && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onAssign?.(booking)}
                      >
                        <UserPlus className="h-4 w-4" />
                      </Button>
                    )}

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem
                          onClick={() => onView?.(booking)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onAssign?.(booking)}
                        >
                          <UserPlus className="h-4 w-4 mr-2" />
                          Assign Mechanic
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onInvoice?.(booking)}
                        >
                          <FileText className="h-4 w-4 mr-2" />
                          Generate Invoice
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))}

            {paginatedBookings.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-10">
                  No bookings found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* PAGINATION FIXED BOTTOM */}
      <div className="border-t bg-card px-4 py-2">
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
  );
}
