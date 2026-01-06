"use client";

import { liveServices, bookings, mechanics } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  RefreshCw,
  User,
  Wrench,
  CheckCircle2,
} from "lucide-react";

function getMechanicsSummary() {
  const totalMechanics = mechanics.length;
  const busy = mechanics.filter((m) => m.status === "busy").length;
  const free = mechanics.filter((m) => m.status === "free").length;

  return {
    totalMechanics,
    busy,
    free,
  };
}

export default function LiveJobsPage() {
  const { totalMechanics, busy, free } = getMechanicsSummary();

  const inProgress = liveServices.filter(
    (s) => s.progress > 0 && s.progress < 100
  );
  const waiting = bookings.filter((b) => b.status === "assigned");

  const totalInProgress = inProgress.length;
  const totalWaiting = waiting.length;

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      {/* <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Live Jobs
        </h1>
        <p className="text-sm text-muted-foreground">
          Real-time tracking of ongoing services in your workshop.
        </p>
      </div> */}

      {/* Top summary cards */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="grid min-w-[240px] flex-1 grid-cols-1 gap-4 sm:grid-cols-3">
          {/* In Progress */}
          <div className="group relative overflow-hidden rounded-xl border border-border bg-card px-4 py-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-primary/5 hover:shadow-lg">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-status-progress/10 text-status-progress">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    In Progress
                  </p>
                  <p className="text-xl font-semibold text-foreground">
                    {totalInProgress}
                  </p>
                </div>
              </div>
              <Badge className="border-0 bg-status-progress/10 text-[10px] uppercase tracking-wide text-status-progress">
                Live
              </Badge>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-status-progress/40 via-primary/40 to-secondary/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          </div>

          {/* Assigned (Waiting) */}
          <div className="group relative overflow-hidden rounded-xl border border-border bg-card px-4 py-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-secondary/40 hover:bg-secondary/5 hover:shadow-lg">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Assigned (Waiting)
                  </p>
                  <p className="text-xl font-semibold text-foreground">
                    {totalWaiting}
                  </p>
                </div>
              </div>
              <Badge className="border-0 bg-secondary/10 text-[10px] uppercase tracking-wide text-secondary">
                Queue
              </Badge>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-secondary/40 via-primary/40 to-status-progress/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          </div>

          {/* Mechanics Available */}
          <div className="group relative overflow-hidden rounded-xl border border-border bg-card px-4 py-3 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-status-completed/40 hover:bg-status-completed/5 hover:shadow-lg">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-status-completed/10 text-status-completed">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">
                    Mechanics Available
                  </p>
                  <p className="text-xl font-semibold text-foreground">
                    {free}
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    {busy} busy • {totalMechanics} total
                  </p>
                </div>
              </div>
              <Badge className="border-0 bg-status-completed/10 text-[10px] uppercase tracking-wide text-status-completed">
                Capacity
              </Badge>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-status-completed/40 via-primary/40 to-secondary/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
          </div>
        </div>

        <Button variant="outline" className="shrink-0 gap-2">
          <RefreshCw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.4fr)]">
        {/* Active Services */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-base">Active Services</CardTitle>
              <span className="text-xs text-muted-foreground">
                {totalInProgress} ongoing
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {inProgress.map((service) => {
              const booking = bookings.find(
                (b) => b.id === service.bookingId
              );
              const mechanic = mechanics.find(
                (m) => m.id === service.mechanicId
              );

              return (
                <div
                  key={service.id}
                  className="group rounded-xl border border-border bg-background px-4 py-3 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-foreground">
                          {service.serviceName}
                        </p>
                        <Badge className="border-0 bg-status-progress/10 text-[10px] uppercase tracking-wide text-status-progress">
                          In Progress
                        </Badge>
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {service.carDetails}
                      </p>
                      {booking && (
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          Customer:{" "}
                          <span className="font-medium text-foreground">
                            {booking.customerName}
                          </span>
                        </p>
                      )}
                    </div>
                    {mechanic && (
                      <div className="flex items-center gap-2">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                          {mechanic.name.charAt(0)}
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-medium text-foreground">
                            {mechanic.name}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            Assigned Mechanic
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4 space-y-1">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Progress</span>
                      <span className="font-medium text-foreground">
                        {service.progress}%
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-primary transition-all duration-300 group-hover:bg-secondary"
                        style={{ width: `${service.progress}%` }}
                      />
                    </div>
                    <p className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      Est. {service.estimatedMinutes}min total
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-end">
                    <Button size="sm" className="gap-2">
                      <CheckCircle2 className="h-4 w-4" />
                      Mark Complete
                    </Button>
                  </div>
                </div>
              );
            })}

            {inProgress.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No active services at the moment.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Waiting to Start */}
        <Card className="border-border bg-card">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between gap-2">
              <CardTitle className="text-base">Waiting to Start</CardTitle>
              <span className="text-xs text-muted-foreground">
                {totalWaiting} assigned
              </span>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {waiting.map((booking) => (
              <div
                key={booking.id}
                className="group rounded-xl border border-border bg-background px-4 py-3 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-secondary/40 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-foreground">
                        {booking.carMake} {booking.carModel}
                      </p>
                      <Badge className="border-0 bg-secondary/10 text-[10px] uppercase tracking-wide text-secondary">
                        Assigned
                      </Badge>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {booking.customerName}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {booking.services.map((service, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground group-hover:bg-primary/5 group-hover:text-foreground"
                        >
                          <Wrench className="mr-1 h-3 w-3 text-primary" />
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {booking.mechanicName && (
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/10 text-xs font-semibold text-secondary">
                          {booking.mechanicName.charAt(0)}
                        </div>
                        <div className="text-right">
                          <p className="text-xs font-medium text-foreground">
                            {booking.mechanicName}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            Assigned
                          </p>
                        </div>
                      </div>
                    )}
                    <Button size="sm" variant="outline" className="gap-2">
                      <Wrench className="h-4 w-4" />
                      Start Job
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {waiting.length === 0 && (
              <p className="text-sm text-muted-foreground">
                No jobs are waiting to start.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
