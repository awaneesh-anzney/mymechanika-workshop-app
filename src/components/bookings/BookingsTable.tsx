import { Eye, UserPlus, FileText, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { BookingStatusBadge } from './BookingStatusBadge';
import { Booking } from '@/types';

interface BookingsTableProps {
    bookings: Booking[];
    onView?: (booking: Booking) => void;
    onAssign?: (booking: Booking) => void;
    onInvoice?: (booking: Booking) => void;
}

export function BookingsTable({ bookings, onView, onAssign, onInvoice }: BookingsTableProps) {
    return (
        <div className="bg-card rounded-lg border border-border overflow-hidden">
            <Table>
                <TableHeader className="bg-muted/50">
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
                    {bookings.map((booking, index) => (
                        <TableRow
                            key={booking.id}
                            className="animate-fade-in"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <TableCell>
                                <span className="font-medium text-foreground">{booking.id}</span>
                            </TableCell>
                            <TableCell>
                                <div>
                                    <p className="font-medium text-foreground">{booking.customerName}</p>
                                    <p className="text-xs text-muted-foreground">{booking.customerPhone}</p>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div>
                                    <p className="font-medium text-foreground">
                                        {booking.carMake} {booking.carModel}
                                    </p>
                                    <p className="text-xs text-muted-foreground">{booking.carPlate}</p>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className="flex flex-wrap gap-1">
                                    {booking.services.slice(0, 2).map((service, i) => (
                                        <span
                                            key={i}
                                            className="inline-block px-2 py-0.5 bg-secondary text-xs rounded-md text-secondary-foreground"
                                        >
                                            {service}
                                        </span>
                                    ))}
                                    {booking.services.length > 2 && (
                                        <span className="inline-block px-2 py-0.5 bg-secondary text-xs rounded-md text-muted-foreground">
                                            +{booking.services.length - 2}
                                        </span>
                                    )}
                                </div>
                            </TableCell>
                            <TableCell>
                                {booking.mechanicName ? (
                                    <span className="text-foreground">{booking.mechanicName}</span>
                                ) : (
                                    <span className="text-muted-foreground italic">Unassigned</span>
                                )}
                            </TableCell>
                            <TableCell>
                                <BookingStatusBadge status={booking.status} />
                            </TableCell>
                            <TableCell>
                                <div className="flex items-center justify-end gap-1">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8"
                                        onClick={() => onView?.(booking)}
                                        title="View details"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </Button>
                                    {!booking.mechanicId && (
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8"
                                            onClick={() => onAssign?.(booking)}
                                            title="Assign mechanic"
                                        >
                                            <UserPlus className="w-4 h-4" />
                                        </Button>
                                    )}
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={() => onView?.(booking)}>
                                                <Eye className="w-4 h-4 mr-2" />
                                                View Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => onAssign?.(booking)}>
                                                <UserPlus className="w-4 h-4 mr-2" />
                                                Assign Mechanic
                                            </DropdownMenuItem>
                                            <DropdownMenuItem onClick={() => onInvoice?.(booking)}>
                                                <FileText className="w-4 h-4 mr-2" />
                                                Generate Invoice
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}