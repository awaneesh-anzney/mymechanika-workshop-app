"use client"
import { useState } from 'react';
import { Plus, Search, Filter, Download } from 'lucide-react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { bookings } from '@/data/mockData';
import { BookingStatusBadge, Status } from '@/components/bookings/BookingStatusBadge';
import { BookingsTable } from '@/components/bookings/BookingsTable';

const page = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all');

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.carPlate.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleViewBooking = (booking: any) => {
    toast('View Booking', {
      description: `Opening details for ${booking.id}`,
    });
  };

  const handleAssignMechanic = (booking: any) => {
    toast('Assign Mechanic', {
      description: `Opening mechanic assignment for ${booking.id}`,
    });
  };

  const handleGenerateInvoice = (booking: any) => {
    toast('Generate Invoice', {
      description: `Creating invoice for ${booking.id}`,
    });
  };
  return (
    <div>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search by customer, booking ID, or plate..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Select
            value={statusFilter}
            onValueChange={(value) => setStatusFilter(value as Status | 'all')}
          >
            <SelectTrigger className="w-40">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="assigned">Assigned</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="issue">Issue</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>

        <div className="ml-auto">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Booking
          </Button>
        </div>
      </div>

      {/* Booking Table List  */}
      <BookingsTable
        bookings={filteredBookings}
        onView={handleViewBooking}
        onAssign={handleAssignMechanic}
        onInvoice={handleGenerateInvoice}
      />
    </div>
  )
}

export default page
