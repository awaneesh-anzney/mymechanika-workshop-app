"use client"
import { useState } from 'react';
import { Plus, Search, Filter, Download } from 'lucide-react'
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { bookings } from '@/data/mockData';
import { BookingStatusBadge, Status } from '@/components/bookings/BookingStatusBadge';
import { BookingsTable } from '@/components/bookings/BookingsTable';

const STATUS_OPTIONS: { label: string; value: Status }[] = [
  { label: 'New', value: 'new' },
  { label: 'Assigned', value: 'assigned' },
  { label: 'In Progress', value: 'in_progress' },
  { label: 'Completed', value: 'completed' },
  { label: 'Issue', value: 'issue' },
  { label: 'Cancelled', value: 'cancelled' },
];

const page = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatuses, setSelectedStatuses] = useState<Status[]>([]);

  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.carPlate.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatuses.length === 0 || selectedStatuses.includes(booking.status as Status);

    return matchesSearch && matchesStatus;
  });

  const toggleStatus = (status: Status) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

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
    <div className='flex flex-col flex-1 overflow-hidden min-h-0'>
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
          <Popover modal={true}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2 h-9">
                <Filter className="w-4 h-4" />
                <span>Status</span>
                {selectedStatuses.length > 0 && (
                  <>
                    <Separator orientation="vertical" className="mx-2 h-4" />
                    <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                      {selectedStatuses.length}
                    </Badge>
                    <div className="hidden space-x-1 lg:flex">
                      {selectedStatuses.length > 2 ? (
                        <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                          {selectedStatuses.length} selected
                        </Badge>
                      ) : (
                        STATUS_OPTIONS.filter((option) =>
                          selectedStatuses.includes(option.value)
                        ).map((option) => (
                          <Badge
                            variant="secondary"
                            key={option.value}
                            className="rounded-sm px-1 font-normal"
                          >
                            {option.label}
                          </Badge>
                        ))
                      )}
                    </div>
                  </>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
              <div className="p-2">
                <div className="space-y-2">
                  {STATUS_OPTIONS.map((option) => (
                    <div
                      key={option.value}
                      className="flex items-center space-x-2 rounded-md p-2 hover:bg-accent transition-colors"
                    >
                      <Checkbox
                        id={option.value}
                        checked={selectedStatuses.includes(option.value)}
                        onCheckedChange={() => toggleStatus(option.value)}
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
                {selectedStatuses.length > 0 && (
                  <>
                    <Separator className="my-2" />
                    <Button
                      variant="ghost"
                      onClick={() => setSelectedStatuses([])}
                      className="w-full justify-center text-xs h-8"
                    >
                      Clear filters
                    </Button>
                  </>
                )}
              </div>
            </PopoverContent>
          </Popover>
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
