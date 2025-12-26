import { cn } from '@/lib/utils';
import { Booking, Invoice, Mechanic } from '@/types';

export type Status = Booking['status'] | Invoice['status'] | Mechanic['status'];

interface StatusBadgeProps {
    status: Status;
    className?: string;
}

const statusConfig: Record<Status, { label: string; className: string }> = {
    // Booking statuses
    new: { label: 'New', className: 'status-new' },
    assigned: { label: 'Assigned', className: 'status-assigned' },
    in_progress: { label: 'In Progress', className: 'status-progress' },
    completed: { label: 'Completed', className: 'status-completed' },
    issue: { label: 'Issue', className: 'status-issue' },
    cancelled: { label: 'Cancelled', className: 'bg-muted text-muted-foreground' },
    // Payment statuses
    paid: { label: 'Paid', className: 'status-completed' },
    pending: { label: 'Pending', className: 'status-pending' },
    overdue: { label: 'Overdue', className: 'status-issue' },
    // Mechanic statuses
    free: { label: 'Available', className: 'status-completed' },
    busy: { label: 'Busy', className: 'status-progress' },
    offline: { label: 'Offline', className: 'bg-muted text-muted-foreground' },
};

export function BookingStatusBadge({ status, className }: StatusBadgeProps) {
    const config = statusConfig[status] || { label: status, className: 'bg-muted text-muted-foreground' };

    return (
        <span className={cn('status-badge', config.className, className)}>
            {config.label}
        </span>
    );
}
