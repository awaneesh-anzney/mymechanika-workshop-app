"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { InventoryItem } from '@/types';

interface InventoryTableProps {
    items: InventoryItem[];
    onRestock: (itemId: string) => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({ items, onRestock }) => {
    const router = useRouter();

    const getStockStatus = (quantity: number, minStock: number) => {
        if (quantity === 0) return 'out';
        if (quantity <= minStock) return 'low';
        return 'ok';
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
        }).format(amount);
    };

    if (items.length === 0) {
        return (
            <div className="text-center py-12 border rounded-lg bg-card">
                <p className="text-muted-foreground">No items found matching your criteria.</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col flex-1 bg-card rounded-lg border border-border overflow-hidden">
            <Table
            containerClassName="flex-1 overflow-auto"
            className="border-separate border-spacing-0"
            >
                <TableHeader className="sticky top-0 z-10 bg-card shadow-sm">
                    <TableRow>
                        <TableHead>Item Name</TableHead>
                        <TableHead>SKU</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Min Stock</TableHead>
                        <TableHead>Unit Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {items.map((item, index) => {
                        const stockStatus = getStockStatus(item.quantity, item.minStock);
                        return (
                            <TableRow
                                key={item.id}
                                className="cursor-pointer hover:bg-muted/50 fade-in"
                                style={{ animationDelay: `${index * 30}ms` }}
                                onClick={() => router.push(`/inventory/${item.id}`)}
                            >
                                <TableCell>
                                    <span
                                        className="font-medium text-accent hover:underline cursor-pointer"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            router.push(`/inventory/${item.id}`);
                                        }}
                                    >
                                        {item.name}
                                    </span>
                                </TableCell>
                                <TableCell>
                                    <code className="text-sm bg-muted px-1.5 py-0.5 rounded">{item.sku}</code>
                                </TableCell>
                                <TableCell>{item.category}</TableCell>
                                <TableCell>
                                    <span className={cn(
                                        'font-medium',
                                        stockStatus === 'out' && 'text-status-issue',
                                        stockStatus === 'low' && 'text-status-progress',
                                        stockStatus === 'ok' && 'text-foreground'
                                    )}>
                                        {item.quantity}
                                    </span>
                                </TableCell>
                                <TableCell className="text-muted-foreground">{item.minStock}</TableCell>
                                <TableCell>{formatCurrency(item.unitPrice)}</TableCell>
                                <TableCell>
                                    <span className={cn(
                                        'status-badge',
                                        stockStatus === 'out' && 'status-issue',
                                        stockStatus === 'low' && 'status-pending',
                                        stockStatus === 'ok' && 'status-completed'
                                    )}>
                                        {stockStatus === 'out' ? 'Out of Stock' : stockStatus === 'low' ? 'Low Stock' : 'In Stock'}
                                    </span>
                                </TableCell>
                                <TableCell className="text-right">
                                    <Button
                                        size="sm"
                                        variant={stockStatus !== 'ok' ? 'default' : 'outline'}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onRestock(item.id);
                                        }}
                                    >
                                        Restock
                                    </Button>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

export default InventoryTable;
