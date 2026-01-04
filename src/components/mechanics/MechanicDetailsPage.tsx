import { mechanics, bookings } from "@/data/mockData";
import { Mechanic } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowLeft,
  Wrench,
  Star,
  Briefcase,
  Clock,
} from "lucide-react";
import Link from "next/link";

interface MechanicDetailsPageProps {
  mechanic: Mechanic;
}

function getStatusBadge(status: Mechanic["status"]) {
  switch (status) {
    case "free":
      return (
        <Badge className="bg-status-completed/10 text-status-completed border-0">
          Available
        </Badge>
      );
    case "busy":
      return (
        <Badge className="bg-status-progress/10 text-status-progress border-0">
          Busy
        </Badge>
      );
    case "offline":
      return (
        <Badge className="bg-muted text-muted-foreground border-0">Offline</Badge>
      );
    default:
      return null;
  }
}

export default function MechanicDetailsPage({ mechanic }: MechanicDetailsPageProps) {
  const assignedBookings = bookings.filter((b) => b.mechanicId === mechanic.id);
  const currentBooking = assignedBookings.find((b) => b.id === mechanic.currentJobId) ??
    assignedBookings[0];

  return (
    <div className="flex flex-col gap-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/mechanics"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-3">
              <span className="text-xl font-semibold tracking-tight">
                {mechanic.id}
              </span>
              {getStatusBadge(mechanic.status)}
            </div>
            <p className="text-sm text-muted-foreground">
              {mechanic.name} - {mechanic.specialization}
            </p>
          </div>
        </div>
        <Button variant="outline" className="gap-2">
          <Briefcase className="w-4 h-4" />
          View Assignments
        </Button>
      </div>

      {/* Main grid - cards layout similar to booking details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left column */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {/* Mechanic information card */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Wrench className="w-4 h-4" />
                Mechanic Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">Name</p>
                <p className="mt-1 font-medium text-foreground">{mechanic.name}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Specialization</p>
                <p className="mt-1 text-foreground">{mechanic.specialization}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <div className="mt-1">{getStatusBadge(mechanic.status)}</div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Rating</p>
                <div className="mt-1 inline-flex items-center gap-1 text-sm">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-medium">{mechanic.rating.toFixed(1)}</span>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Jobs Today</p>
                <p className="mt-1 font-semibold text-foreground">{mechanic.completedToday}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Mechanic ID</p>
                <p className="mt-1 text-foreground">{mechanic.id}</p>
              </div>
            </CardContent>
          </Card>

          {/* Current assignment card */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Clock className="w-4 h-4" />
                Current Assignment
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm">
              {currentBooking ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Booking ID</p>
                    <p className="mt-1 font-medium text-foreground">{currentBooking.id}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Customer</p>
                    <p className="mt-1 text-foreground">{currentBooking.customerName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Vehicle</p>
                    <p className="mt-1 text-foreground">
                      {currentBooking.carMake} {currentBooking.carModel}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No active assignments for this mechanic right now.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-4">
          {/* Performance summary card */}
          <Card className="bg-card border-border">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Performance Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Jobs Today</span>
                <span className="font-semibold text-foreground">{mechanic.completedToday}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Rating</span>
                <span className="inline-flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="font-medium">{mechanic.rating.toFixed(1)}</span>
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Status</span>
                <span>{getStatusBadge(mechanic.status)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Recent bookings card */}
          {assignedBookings.length > 0 && (
            <Card className="bg-card border-border">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Recent Bookings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                {assignedBookings.slice(0, 3).map((b) => (
                  <div
                    key={b.id}
                    className="flex items-center justify-between rounded-md border border-border px-3 py-2 bg-background"
                  >
                    <div>
                      <p className="text-xs text-muted-foreground">Booking ID</p>
                      <p className="text-sm font-medium text-foreground">{b.id}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {b.customerName}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Car</p>
                      <p className="text-sm text-foreground">
                        {b.carMake} {b.carModel}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
