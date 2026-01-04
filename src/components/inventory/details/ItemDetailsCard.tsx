"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, AlertTriangle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { InventoryItem } from '@/types';

interface ItemDetailsCardProps {
    item: InventoryItem;
    stockValue: number;
    stockStatus: string;
}

const ItemDetailsCard: React.FC<ItemDetailsCardProps> = ({ item, stockValue, stockStatus }) => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        });
    };

    return (
        <Card className="lg:col-span-1 h-fit">
            <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Item Details
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Category</span>
                    <span className="font-medium text-foreground">{item.category}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">SKU</span>
                    <code className="text-sm bg-muted px-2 py-0.5 rounded">{item.sku}</code>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Unit Price</span>
                    <span className="font-medium text-foreground">{formatCurrency(item.unitPrice)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Minimum Stock</span>
                    <span className="font-medium text-foreground">{item.minStock} units</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                    <span className="text-muted-foreground">Last Restocked</span>
                    <span className="font-medium text-foreground">
                        {item.lastRestocked ? formatDate(item.lastRestocked) : 'N/A'}
                    </span>
                </div>
                <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Total Value</span>
                    <span className="font-bold text-primary">{formatCurrency(stockValue)}</span>
                </div>

                {stockStatus !== 'ok' && (
                    <div className={cn(
                        "p-4 rounded-lg mt-4",
                        stockStatus === 'out' ? 'bg-status-issue/10' : 'bg-status-progress/10'
                    )}>
                        <div className="flex items-start gap-3">
                            <AlertTriangle className={cn(
                                "w-5 h-5 mt-0.5",
                                stockStatus === 'out' ? 'text-status-issue' : 'text-status-progress'
                            )} />
                            <div>
                                <p className={cn(
                                    "font-medium",
                                    stockStatus === 'out' ? 'text-status-issue' : 'text-status-progress'
                                )}>
                                    {stockStatus === 'out' ? 'Out of Stock' : 'Low Stock Alert'}
                                </p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {stockStatus === 'out'
                                        ? 'This item needs immediate restocking.'
                                        : `Stock is below minimum level of ${item.minStock} units.`}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default ItemDetailsCard;
