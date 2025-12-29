"use client";
import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Car,
  User,
  Phone,
  Calendar,
  Clock,
  Wrench,
  CreditCard,
  FileText,
  UserPlus,
  CheckCircle2,
  AlertCircle,
  Package,
  Receipt
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BookingStatusBadge } from './BookingStatusBadge';
import { bookings, mechanics, invoices } from '@/data/mockData';
import dayjs from 'dayjs';

const BookingDetails = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const booking = bookings.find(b => b.id === id);
  const assignedMechanic = booking?.mechanicId
    ? mechanics.find(m => m.id === booking.mechanicId)
    : null;
  const relatedInvoice = invoices.find(inv => inv.bookingId === id);

  if (!booking) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-muted-foreground" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Booking Not Found</h1>
          <p className="text-muted-foreground">The booking with ID {id} could not be found.</p>
        </div>
        <Button onClick={() => router.push('/bookings')} variant="outline" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Bookings
        </Button>
      </div>
    );
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return dayjs(dateString).format('MMM DD, YYYY');
  };

  const formatTime = (dateString: string) => {
    return dayjs(dateString).format('hh:mm A');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20';
      case 'pending': return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
      case 'overdue': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push('/bookings')}
            className="shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">{booking.id}</h1>
              <BookingStatusBadge status={booking.status} />
            </div>
            <p className="text-muted-foreground mt-1">
              Created on {formatDate(booking.createdAt)} at {formatTime(booking.createdAt)}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {!booking.mechanicId && (
            <Button variant="outline" className="gap-2">
              <UserPlus className="w-4 h-4" />
              Assign Mechanic
            </Button>
          )}
          <Button className="gap-2">
            <FileText className="w-4 h-4" />
            Generate Invoice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer & Vehicle Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <User className="w-4 h-4 text-primary" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium text-foreground">{booking.customerName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium text-foreground flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    {booking.customerPhone}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Customer ID</p>
                  <p className="font-medium text-foreground">{booking.customerId}</p>
                </div>
              </CardContent>
            </Card>

            {/* Vehicle Card */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Car className="w-4 h-4 text-primary" />
                  Vehicle Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Vehicle</p>
                  <p className="font-medium text-foreground">
                    {booking.carMake} {booking.carModel} ({booking.carYear})
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">License Plate</p>
                  <p className="font-medium text-foreground font-mono">{booking.carPlate}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Schedule Info */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Calendar className="w-4 h-4 text-primary" />
                Schedule
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Scheduled Date</p>
                    <p className="font-medium text-foreground">{formatDate(booking.scheduledDate)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Scheduled Time</p>
                    <p className="font-medium text-foreground">{formatTime(booking.scheduledDate)}</p>
                  </div>
                </div>
                {booking.estimatedCompletion && (
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg md:col-span-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Estimated Completion</p>
                      <p className="font-medium text-foreground">
                        {formatDate(booking.estimatedCompletion)} at {formatTime(booking.estimatedCompletion)}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Services & Line Items */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Wrench className="w-4 h-4 text-primary" />
                Services & Parts
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Services Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {booking.services.map((service, index) => (
                  <Badge key={index} variant="secondary" className="px-3 py-1">
                    {service}
                  </Badge>
                ))}
              </div>

              <Separator className="my-4" />

              {/* Line Items Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Item</th>
                      <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Type</th>
                      <th className="text-center py-3 px-2 text-sm font-medium text-muted-foreground">Qty</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Unit Price</th>
                      <th className="text-right py-3 px-2 text-sm font-medium text-muted-foreground">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {booking.lineItems.map((item) => (
                      <tr key={item.id} className="border-b border-border/50 last:border-0">
                        <td className="py-3 px-2">
                          <p className="font-medium text-foreground">{item.name}</p>
                          {item.description && (
                            <p className="text-xs text-muted-foreground">{item.description}</p>
                          )}
                        </td>
                        <td className="py-3 px-2">
                          <Badge
                            variant="outline"
                            className={`capitalize text-xs ${item.type === 'service'
                              ? 'border-blue-500/30 text-blue-600 bg-blue-500/10'
                              : item.type === 'part'
                                ? 'border-amber-500/30 text-amber-600 bg-amber-500/10'
                                : 'border-purple-500/30 text-purple-600 bg-purple-500/10'
                              }`}
                          >
                            {item.type}
                          </Badge>
                        </td>
                        <td className="py-3 px-2 text-center text-foreground">{item.quantity}</td>
                        <td className="py-3 px-2 text-right text-foreground">{formatCurrency(item.unitPrice)}</td>
                        <td className="py-3 px-2 text-right font-medium text-foreground">
                          {formatCurrency(item.quantity * item.unitPrice)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Payment Summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <CreditCard className="w-4 h-4 text-primary" />
                Payment Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="text-foreground">{formatCurrency(booking.subtotal)}</span>
              </div>
              {booking.discountAmount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Discount</span>
                  <span className="text-emerald-600">-{formatCurrency(booking.discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (GST 18%)</span>
                <span className="text-foreground">{formatCurrency(booking.taxAmount)}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="font-semibold text-foreground">Total Amount</span>
                <span className="font-bold text-lg text-primary">{formatCurrency(booking.totalAmount)}</span>
              </div>

              {relatedInvoice && (
                <>
                  <Separator />
                  <div className="p-3 bg-muted/50 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Invoice</span>
                      <Badge variant="outline" className={getStatusColor(relatedInvoice.status)}>
                        {relatedInvoice.status}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{relatedInvoice.id}</span>
                      <span className="text-sm text-muted-foreground">
                        Due: {formatDate(relatedInvoice.dueDate)}
                      </span>
                    </div>
                    {relatedInvoice.paidDate && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Paid on</span>
                        <span className="text-emerald-600">{formatDate(relatedInvoice.paidDate)}</span>
                      </div>
                    )}
                    {relatedInvoice.paymentMethod && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">Payment Method</span>
                        <span className="text-foreground">{relatedInvoice.paymentMethod}</span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Assigned Mechanic */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Wrench className="w-4 h-4 text-primary" />
                Assigned Mechanic
              </CardTitle>
            </CardHeader>
            <CardContent>
              {assignedMechanic ? (
                <div className="flex items-center gap-4 p-3 bg-muted/50 rounded-lg">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg">
                    {assignedMechanic.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{assignedMechanic.name}</p>
                    <p className="text-sm text-muted-foreground">{assignedMechanic.specialization}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant="outline"
                        className={`capitalize text-xs ${assignedMechanic.status === 'free'
                          ? 'border-emerald-500/30 text-emerald-600 bg-emerald-500/10'
                          : assignedMechanic.status === 'busy'
                            ? 'border-amber-500/30 text-amber-600 bg-amber-500/10'
                            : 'border-gray-500/30 text-gray-600 bg-gray-500/10'
                          }`}
                      >
                        {assignedMechanic.status}
                      </Badge>
                      <span className="text-xs text-muted-foreground">⭐ {assignedMechanic.rating}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="w-12 h-12 rounded-full bg-muted mx-auto flex items-center justify-center mb-3">
                    <UserPlus className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground text-sm mb-3">No mechanic assigned yet</p>
                  <Button variant="outline" size="sm" className="gap-2">
                    <UserPlus className="w-4 h-4" />
                    Assign Mechanic
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start gap-2">
                <Receipt className="w-4 h-4" />
                Print Receipt
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Package className="w-4 h-4" />
                Add Parts
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Phone className="w-4 h-4" />
                Contact Customer
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
