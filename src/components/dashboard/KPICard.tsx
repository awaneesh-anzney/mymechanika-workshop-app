import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KPICardProps {
    title: string;
    value: string | number;
    subtitle?: string;
    icon: React.ElementType;
    trend?: {
        value: number;
        isPositive: boolean;
    };
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger';
    className?: string;
}

const variantStyles = {
    default: 'border-border',
    primary: 'border-l-4 border-l-accent',
    success: 'border-l-4 border-l-status-completed',
    warning: 'border-l-4 border-l-status-progress',
    danger: 'border-l-4 border-l-status-issue',
};

const iconVariantStyles = {
    default: 'bg-secondary text-foreground',
    primary: 'bg-accent/10 text-accent',
    success: 'bg-status-completed/10 text-status-completed',
    warning: 'bg-status-progress/10 text-status-progress',
    danger: 'bg-status-issue/10 text-status-issue',
};

export function KPICard({
    title,
    value,
    subtitle,
    icon: Icon,
    trend,
    variant = 'default',
    className,
}: KPICardProps) {
    return (
        <div
            className={cn(
                'bg-card text-card-foreground rounded-xl border border-border shadow-sm p-4 overflow-hidden',
                variantStyles[variant],
                className
            )}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-muted-foreground truncate">{title}</p>
                    <div className="flex items-baseline gap-2 mt-1">
                        <p className="text-2xl font-bold text-foreground">{value}</p>
                        {trend && (
                            <span
                                className={cn(
                                    'inline-flex items-center text-xs font-medium',
                                    trend.isPositive ? 'text-status-completed' : 'text-status-issue'
                                )}
                            >
                                {trend.isPositive ? (
                                    <TrendingUp className="w-3 h-3 mr-0.5" />
                                ) : (
                                    <TrendingDown className="w-3 h-3 mr-0.5" />
                                )}
                                {trend.value}%
                            </span>
                        )}
                    </div>
                    {subtitle && (
                        <p className="text-xs text-muted-foreground mt-1 truncate">{subtitle}</p>
                    )}
                </div>
                <div className={cn('p-2.5 rounded-lg shrink-0', iconVariantStyles[variant])}>
                    <Icon className="w-5 h-5" />
                </div>
            </div>
        </div >
    );
}