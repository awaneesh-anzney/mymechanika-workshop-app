"use client";

import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Car,
  FileText,
  Plus,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { bookings } from "@/data/mockData";

interface VehicleInfo {
  label: string;
  year?: string;
  plate?: string;
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(dateString: string | undefined) {
  if (!dateString) return "-";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
}

const CustomerDetails = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const customerBookings = bookings.filter((b) => (b.customerId ?? b.customerName) === id);

  if (customerBookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
          <FileText className="w-8 h-8 text-muted-foreground" />
        </div>
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Customer Not Found</h1>
          <p className="text-muted-foreground">The customer with ID {id} could not be found.</p>
        </div>
        <Button onClick={() => router.push("/customers")} variant="outline" className="gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Customers
        </Button>
      </div>
    );
  }

  const first = customerBookings[0];
  const customerName = first.customerName;
  const customerPhone = first.customerPhone;

  const totalBookings = customerBookings.length;
  const totalSpent = customerBookings.reduce((sum, b) => sum + (b.totalAmount ?? 0), 0);

  const vehiclesMap = new Map<string, VehicleInfo>();
  for (const b of customerBookings) {
    const key = b.carPlate ?? `${b.carMake} ${b.carModel}`;
    if (!vehiclesMap.has(key)) {
      vehiclesMap.set(key, {
        label: `${b.carMake} ${b.carModel}`,
        year: b.carYear,
        plate: b.carPlate,
      });
    }
  }
  const vehicles = Array.from(vehiclesMap.values());

  const memberSince = customerBookings
    .map((b) => b.createdAt)
    .filter(Boolean)
    .sort()[0];

  const lastVisit = customerBookings
    .map((b) => b.scheduledDate)
    .filter(Boolean)
    .sort()
    .slice(-1)[0];

  const averagePerVisit = totalBookings > 0 ? Math.round(totalSpent / totalBookings) : 0;

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.push("/customers")}
            className="shrink-0"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground">{customerName}</h1>
              <Badge variant="outline" className="text-xs font-semibold tracking-wide">
                {id}
              </Badge>
            </div>
            <p className="text-muted-foreground mt-1">
              Customer since {formatDate(memberSince)}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Phone className="w-4 h-4" />
            Call
          </Button>
          <Button variant="outline" className="gap-2">
            <Mail className="w-4 h-4" />
            Email
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            New Booking
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact & Address */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Contact Information */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <Phone className="w-4 h-4 text-primary" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Full Name</p>
                  <p className="font-medium text-foreground mt-1">{customerName}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Phone Number</p>
                  <p className="mt-1 font-medium text-foreground flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    {customerPhone}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Email Address</p>
                  <p className="mt-1 text-foreground">
                    {/* Email not in mock data; placeholder based on name */}
                    {customerName.toLowerCase().replace(/\s+/g, ".")}@email.com
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Address */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <MapPin className="w-4 h-4 text-primary" />
                  Address
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Location</p>
                  <p className="mt-1 text-foreground">
                    123, MG Road, Bangalore - 560001
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Last Visit</p>
                  <p className="mt-1 text-foreground flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    {formatDate(lastVisit)}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Registered Vehicles */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Car className="w-4 h-4 text-primary" />
                Registered Vehicles ({vehicles.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {vehicles.map((v, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 rounded-lg bg-muted/60 px-4 py-3"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Car className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{v.label}</p>
                    {v.year && (
                      <p className="text-xs text-muted-foreground">Year: {v.year}</p>
                    )}
                    {v.plate && (
                      <p className="text-xs text-muted-foreground font-mono">
                        {v.plate}
                      </p>
                    )}
                  </div>
                </div>
              ))}

              {vehicles.length === 0 && (
                <p className="text-sm text-muted-foreground">
                  No registered vehicles for this customer yet.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Service History */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="w-4 h-4 text-primary" />
                Service History
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-10 text-sm text-muted-foreground gap-3">
              <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <p>No service history available</p>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar summary */}
        <div className="space-y-6">
          {/* Customer Summary */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Customer Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total Bookings</span>
                <span className="font-semibold text-foreground">{totalBookings}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total Spent</span>
                <span className="font-semibold text-emerald-600">
                  {formatCurrency(totalSpent)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Vehicles Registered</span>
                <span className="font-semibold text-foreground">{vehicles.length}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Average per Visit</span>
                <span className="font-semibold text-foreground">
                  {formatCurrency(averagePerVisit)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Member Since</span>
                <span className="font-semibold text-foreground">
                  {formatDate(memberSince)}
                </span>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <Button variant="outline" className="w-full justify-start gap-2">
                <FileText className="w-4 h-4" />
                Create New Booking
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Car className="w-4 h-4" />
                Add Vehicle
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Clock className="w-4 h-4" />
                View Full History
              </Button>
              <Button variant="outline" className="w-full justify-start gap-2">
                <Mail className="w-4 h-4" />
                Send Message
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerDetails;
