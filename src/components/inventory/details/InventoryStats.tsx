"use client"
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Package, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InventoryStatsProps {
    quantity: number;
    totalIn: number;
    totalOut: number;
    stockValue: number;
    stockStatus: string;
}

const InventoryStats: React.FC<InventoryStatsProps> = ({ quantity, totalIn, totalOut, stockValue, stockStatus }) => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <Card>
                <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                        <div className={cn(
                            "p-3 rounded-lg",
                            stockStatus === 'out' && 'bg-status-issue/10',
                            stockStatus === 'low' && 'bg-status-progress/10',
                            stockStatus === 'ok' && 'bg-accent/10'
                        )}>
                            <Package className={cn(
                                "w-6 h-6",
                                stockStatus === 'out' && 'text-status-issue',
                                stockStatus === 'low' && 'text-status-progress',
                                stockStatus === 'ok' && 'text-accent'
                            )} />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Current Stock</p>
                            <p className={cn(
                                "text-2xl font-bold",
                                stockStatus === 'out' && 'text-status-issue',
                                stockStatus === 'low' && 'text-status-progress',
                                stockStatus === 'ok' && 'text-foreground'
                            )}>
                                {quantity}
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-status-completed/10">
                            <TrendingUp className="w-6 h-6 text-status-completed" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Total In</p>
                            <p className="text-2xl font-bold text-status-completed">+{totalIn}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-status-issue/10">
                            <TrendingDown className="w-6 h-6 text-status-issue" />
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Total Out</p>
                            <p className="text-2xl font-bold text-status-issue">-{totalOut}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="pt-6">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-primary/10">
                            <span className="text-xl font-bold text-primary">₹</span>
                        </div>
                        <div>
                            <p className="text-sm text-muted-foreground">Stock Value</p>
                            <p className="text-2xl font-bold text-foreground">{formatCurrency(stockValue)}</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default InventoryStats;
