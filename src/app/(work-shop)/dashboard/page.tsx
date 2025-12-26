import { KPICard } from '@/components/dashboard/KPICard'
import { CalendarCheck, Wrench, CheckCircle, Clock, Banknote, TrendingUp } from 'lucide-react'
import { dashboardStats } from '@/data/mockData';
import { formatCurrency } from '@/lib/utils';
import React from 'react'

const page = () => {
  return (
    <div>
      {/* KPI Card Div */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
        <KPICard
          title="Today's Bookings"
          value={dashboardStats.totalBookingsToday}
          subtitle={`${dashboardStats.totalBookingsMonth} this month`}
          icon={CalendarCheck}
          variant="primary"
          trend={{ value: 12, isPositive: true }}
        />
        <KPICard
          title="Active Services"
          value={dashboardStats.activeServices}
          subtitle="In progress now"
          icon={Wrench}
          variant="warning"
        />
        <KPICard
          title="Completed Today"
          value={dashboardStats.completedServices}
          subtitle="Services finished"
          icon={CheckCircle}
          variant="success"
          trend={{ value: 8, isPositive: true }}
        />
        {/* <KPICard
          title="Pending Payments"
          value={dashboardStats.pendingPayments}
          subtitle="Invoices outstanding"
          icon={Clock}
          variant="danger"
        /> */}
        <KPICard
          title="Today's Revenue"
          value={formatCurrency(dashboardStats.revenueToday)}
          subtitle="From completed jobs"
          icon={Banknote}
          variant="success"
          trend={{ value: 15, isPositive: true }}
        />
        <KPICard
          title="Monthly Revenue"
          value={formatCurrency(dashboardStats.revenueMonth)}
          subtitle="Total this month"
          icon={TrendingUp}
          variant="primary"
          trend={{ value: 22, isPositive: true }}
        />
      </div>
      
    </div>
  )
}

export default page