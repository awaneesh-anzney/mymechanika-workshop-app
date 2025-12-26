export interface User {
    id: string;
    name: string;
    role: 'owner' | 'manager' | 'receptionist' | 'mechanic';
    email: string;
}

export interface Workshop {
    id: string;
    name: string;
    location: string;
    phone: string;
}

export interface DashboardStats {
    totalBookingsToday: number;
    totalBookingsMonth: number;
    activeServices: number;
    completedServices: number;
    pendingPayments: number;
    revenueToday: number;
    revenueMonth: number;
}

export interface Booking {
    id: string;
    customerId: string;
    customerName: string;
    customerPhone: string;
    carMake: string;
    carModel: string;
    carYear: string;
    carPlate: string;
    services: string[];
    mechanicId?: string;
    mechanicName?: string;
    status: 'new' | 'assigned' | 'in_progress' | 'completed' | 'issue' | 'cancelled';
    scheduledDate: string;
    estimatedCompletion?: string;
    totalAmount: number;
    createdAt: string;
}

export interface Mechanic {
    id: string;
    name: string;
    specialization: string;
    status: 'busy' | 'free' | 'offline';
    currentJobId?: string;
    completedToday: number;
    rating: number;
}

export interface InventoryItem {
    id: string;
    name: string;
    sku: string;
    category: string;
    quantity: number;
    minStock: number;
    unitPrice: number;
    lastRestocked: string;
}

export interface Invoice {
    id: string;
    bookingId: string;
    customerName: string;
    amount: number;
    status: 'paid' | 'pending' | 'overdue';
    dueDate: string;
    paidDate?: string;
    paymentMethod?: string;
}

export interface LiveService {
    id: string;
    bookingId: string;
    customerName: string;
    carDetails: string;
    mechanicId: string;
    mechanicName: string;
    serviceName: string;
    startTime: string;
    estimatedMinutes: number;
    progress: number;
}

export interface Notification {
    id: string;
    type: 'booking' | 'stock' | 'payment' | 'approval';
    title: string;
    message: string;
    timestamp: string;
    read: boolean;
}
