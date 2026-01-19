export const revenueTrendData = [
  { month: 'Jan', revenue: 240000 },
  { month: 'Feb', revenue: 300000 },
  { month: 'Mar', revenue: 310000 },
  { month: 'Apr', revenue: 270000 },
  { month: 'May', revenue: 350000 },
  { month: 'Jun', revenue: 400000 },
];

export const weeklyBookingsData = [
  { week: 'W1', bookings: 45 },
  { week: 'W2', bookings: 52 },
  { week: 'W3', bookings: 48 },
  { week: 'W4', bookings: 61 },
];

export const serviceBreakdownData = [
  { name: 'Full Service', value: 35, color: '#3b82f6' },
  { name: 'Oil Change', value: 25, color: '#10b981' },
  { name: 'Brake Repair', value: 20, color: '#f59e0b' },
  { name: 'Electrical', value: 15, color: '#6366f1' },
  { name: 'Other', value: 5, color: '#94a3b8' },
];

export const topMechanicsData = [
  {
    name: 'Anil P.',
    jobs: 48,
    revenue: 156000,
    rating: 4.9,
    image: '/avatars/anil.png'
  },
  {
    name: 'Suresh M.',
    jobs: 42,
    revenue: 134000,
    rating: 4.8,
    image: '/avatars/suresh.png'
  },
  {
    name: 'Ravi K.',
    jobs: 38,
    revenue: 128000,
    rating: 4.6,
    image: '/avatars/ravi.png'
  },
  {
    name: 'Kumar S.',
    jobs: 35,
    revenue: 112000,
    rating: 4.5,
    image: '/avatars/kumar.png'
  }
];

export const reportKPIs = [
  {
    title: 'Total Revenue',
    value: 1867000,
    trend: 12.5,
    isPositive: true,
    icon: 'banknote',
    variant: 'success'
  },
  {
    title: 'Total Jobs',
    value: 312,
    trend: 8.2,
    isPositive: true,
    icon: 'wrench',
    variant: 'primary'
  },
  {
    title: 'New Customers',
    value: 48,
    trend: 15.3,
    isPositive: true,
    icon: 'users',
    variant: 'default'
  },
  {
    title: 'Avg. Job Value',
    value: 5985,
    trend: 4.1,
    isPositive: true,
    icon: 'target',
    variant: 'warning'
  }
];
