"use client";

import { useState } from 'react';
import { Plus, Search, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';
import { invoices } from '@/data/mockData';
import { Invoice } from '@/types';
import { InvoiceSummaryCards } from './InvoiceSummaryCards';
import { InvoicesTable } from './InvoicesTable';

const STATUS_OPTIONS: { label: string; value: Invoice['status'] }[] = [
  { label: 'Paid', value: 'paid' },
  { label: 'Pending', value: 'pending' },
  { label: 'Overdue', value: 'overdue' },
];

export function InvoicesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<Invoice['status'] | 'all'>('all');

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.bookingId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatus === 'all' || invoice.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  // Calculate summary statistics
  const totalInvoices = invoices.length;
  const paidAmount = invoices
    .filter((inv) => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);
  const pendingAmount = invoices
    .filter((inv) => inv.status === 'pending')
    .reduce((sum, inv) => sum + inv.amount, 0);
  const overdueAmount = invoices
    .filter((inv) => inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const handleView = (invoice: Invoice) => {
    toast('View Invoice', {
      description: `Opening invoice ${invoice.id}`,
    });
  };

  const handleSend = (invoice: Invoice) => {
    toast('Send Invoice', {
      description: `Sending invoice ${invoice.id} to customer`,
    });
  };

  const handleMarkPaid = (invoice: Invoice) => {
    toast('Mark as Paid', {
      description: `Marking invoice ${invoice.id} as paid`,
    });
  };

  const handleCreateInvoice = () => {
    toast('Create Invoice', {
      description: 'Opening invoice creation form',
    });
  };

  const handleExport = () => {
    toast('Export', {
      description: 'Exporting invoices data',
    });
  };

  return (
    <div className='flex flex-col flex-1 overflow-hidden min-h-0'>
      {/* Summary Cards */}
      <InvoiceSummaryCards
        totalInvoices={totalInvoices}
        paidAmount={paidAmount}
        pendingAmount={pendingAmount}
        overdueAmount={overdueAmount}
      />

      {/* Search and Filter Section */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className=" absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground hover:border-accent hover:ring-accent hover:ring-1" />
          <Input
            placeholder="Search by customer or invoice ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Popover modal={true}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2 h-9">
                <Filter className="w-4 h-4" />
                <span>
                  {selectedStatus === 'all' 
                    ? 'All Status' 
                    : STATUS_OPTIONS.find((opt) => opt.value === selectedStatus)?.label || 'All Status'}
                </span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
              <div className="p-2">
                <div className="space-y-2">
                  <div
                    className="flex items-center space-x-2 rounded-md p-2 hover:bg-accent transition-colors cursor-pointer"
                    onClick={() => setSelectedStatus('all')}
                  >
                    <Checkbox
                      id="all-status"
                      checked={selectedStatus === 'all'}
                      onCheckedChange={() => setSelectedStatus('all')}
                    />
                    <label
                      htmlFor="all-status"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                    >
                      All Status
                    </label>
                  </div>
                  {STATUS_OPTIONS.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2 rounded-md p-2 hover:bg-accent transition-colors cursor-pointer"
                      onClick={() => setSelectedStatus(option.value)}
                    >
                      <Checkbox
                        id={option.value}
                        checked={selectedStatus === option.value}
                        onCheckedChange={() => setSelectedStatus(option.value)}
                      />
                      <label
                        htmlFor={option.value}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer flex-1"
                      >
                        {option.label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Button variant="outline" className="gap-2 h-9" onClick={handleExport}>
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
        <div className="ml-auto">
          <Button onClick={handleCreateInvoice} className="gap-2">
            <Plus className="w-4 h-4" />
            Create Invoice
          </Button>
        </div>
      </div>

      {/* Invoices Table */}
      <InvoicesTable
        invoices={filteredInvoices}
        onView={handleView}
        onSend={handleSend}
        onMarkPaid={handleMarkPaid}
      />
    </div>
  );
}