"use client";

import { FileText, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InvoiceSummaryCardsProps {
  totalInvoices: number;
  paidAmount: number;
  pendingAmount: number;
  overdueAmount: number;
}

export function InvoiceSummaryCards({
  totalInvoices,
  paidAmount,
  pendingAmount,
  overdueAmount,
}: InvoiceSummaryCardsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Invoices */}
      <div className="group relative overflow-hidden rounded-xl border border-border bg-card px-4 py-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 hover:shadow-lg">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              Total Invoices
            </p>
            <p className="text-2xl font-bold text-foreground">{totalInvoices}</p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary shrink-0">
            <FileText className="h-5 w-5" />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-primary/40 via-primary/40 to-primary/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      </div>

      {/* Paid */}
      <div className="group relative overflow-hidden rounded-xl border border-border bg-card px-4 py-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-status-completed/40 hover:bg-status-completed/5 hover:shadow-lg">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              Paid
            </p>
            <p className="text-2xl font-bold text-status-completed">
              {formatCurrency(paidAmount)}
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-status-completed/10 text-status-completed shrink-0">
            <CheckCircle2 className="h-5 w-5" />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-status-completed/40 via-status-completed/40 to-status-completed/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      </div>

      {/* Pending */}
      <div className="group relative overflow-hidden rounded-xl border border-border bg-card px-4 py-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-status-progress/40 hover:bg-status-progress/5 hover:shadow-lg">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              Pending
            </p>
            <p className="text-2xl font-bold text-status-progress">
              {formatCurrency(pendingAmount)}
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-status-progress/10 text-status-progress shrink-0">
            <Clock className="h-5 w-5" />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-status-progress/40 via-status-progress/40 to-status-progress/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      </div>

      {/* Overdue */}
      <div className="group relative overflow-hidden rounded-xl border border-border bg-card px-4 py-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-status-issue/40 hover:bg-status-issue/5 hover:shadow-lg">
        <div className="flex items-center justify-between gap-2">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">
              Overdue
            </p>
            <p className="text-2xl font-bold text-status-issue">
              {formatCurrency(overdueAmount)}
            </p>
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-status-issue/10 text-status-issue shrink-0">
            <AlertCircle className="h-5 w-5" />
          </div>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-status-issue/40 via-status-issue/40 to-status-issue/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
      </div>
    </div>
  );
}