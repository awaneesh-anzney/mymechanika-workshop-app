"use client";

import { useState } from "react";
import { Eye, Send, CheckCircle2, MoreHorizontal } from "lucide-react";
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
import { BookingStatusBadge } from "@/components/bookings/BookingStatusBadge";
import { Invoice } from "@/types";
import Pagination from "@/components/bookings/Pagination";
import { useRouter } from "next/navigation";

interface InvoicesTableProps {
  invoices: Invoice[];
  onView?: (invoice: Invoice) => void;
  onSend?: (invoice: Invoice) => void;
  onMarkPaid?: (invoice: Invoice) => void;
}

export function InvoicesTable({
  invoices,
  onView,
  onSend,
  onMarkPaid,
}: InvoicesTableProps) {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  const totalPages = Math.ceil(invoices.length / itemsPerPage);
  const startIndex = (page - 1) * itemsPerPage;
  const paginatedInvoices = invoices.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="flex flex-col flex-1 bg-card rounded-lg border border-border overflow-hidden">
      <Table
        containerClassName="flex-1 overflow-auto"
        className="border-separate border-spacing-0"
      >
        <TableHeader className="sticky top-0 z-10 bg-card shadow-sm">
          <TableRow className="hover:bg-transparent border-b">
            <TableHead className="bg-card">Invoice ID</TableHead>
            <TableHead className="bg-card">Customer</TableHead>
            <TableHead className="bg-card">Booking</TableHead>
            <TableHead className="bg-card">Amount</TableHead>
            <TableHead className="bg-card">Due Date</TableHead>
            <TableHead className="bg-card">Status</TableHead>
            <TableHead className="bg-card">Payment Method</TableHead>
            <TableHead className="text-right bg-card">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {paginatedInvoices.map((invoice, index) => (
            <TableRow
              key={invoice.id}
              className="animate-fade-in transition-all duration-200 hover:bg-muted/50 hover:shadow-sm"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <TableCell>
                <button
                  onClick={() => onView?.(invoice)}
                  className="font-medium hover:text-primary hover:underline transition-colors"
                >
                  {invoice.id}
                </button>
              </TableCell>

              <TableCell>
                <p className="font-medium">{invoice.customerName}</p>
              </TableCell>

              <TableCell>
                <button
                  onClick={() => router.push(`/bookings/${invoice.bookingId}`)}
                  className="font-medium text-primary hover:text-primary/80 hover:underline transition-colors"
                >
                  {invoice.bookingId}
                </button>
              </TableCell>

              <TableCell>
                <p className="font-medium">{formatCurrency(invoice.amount)}</p>
              </TableCell>

              <TableCell>
                <p className="text-sm text-foreground">{formatDate(invoice.dueDate)}</p>
              </TableCell>

              <TableCell>
                <BookingStatusBadge status={invoice.status} />
              </TableCell>

              <TableCell>
                {invoice.paymentMethod ? (
                  <span className="text-sm text-foreground">{invoice.paymentMethod}</span>
                ) : (
                  <span className="text-sm text-muted-foreground">—</span>
                )}
              </TableCell>

              <TableCell>
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onView?.(invoice)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>

                  {invoice.status !== 'paid' && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onSend?.(invoice)}
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => onMarkPaid?.(invoice)}
                      >
                        <CheckCircle2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => onView?.(invoice)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </DropdownMenuItem>
                      {invoice.status !== 'paid' && (
                        <>
                          <DropdownMenuItem
                            onClick={() => onSend?.(invoice)}
                          >
                            <Send className="h-4 w-4 mr-2" />
                            Send Invoice
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => onMarkPaid?.(invoice)}
                          >
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Mark as Paid
                          </DropdownMenuItem>
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}

          {paginatedInvoices.length === 0 && (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-10">
                No invoices found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

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