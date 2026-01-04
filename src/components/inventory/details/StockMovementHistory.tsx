"use client"
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { TrendingUp, TrendingDown, History, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

// Define the type for stock movements
export interface StockMovement {
    id: string;
    type: 'in' | 'out';
    quantity: number;
    reason: string;
    reference: string;
    date: string;
    performedBy: string;
}

interface StockMovementHistoryProps {
    movements: StockMovement[];
    totalIn: number;
    totalOut: number;
}

const StockMovementHistory: React.FC<StockMovementHistoryProps> = ({ movements, totalIn, totalOut }) => {
    const formatDateTime = (dateString: string) => {
        return new Date(dateString).toLocaleString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <Card className="lg:col-span-2">
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                        <History className="w-5 h-5" />
                        Stock Movement History
                    </CardTitle>
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-status-completed/10 text-status-completed border-status-completed/30">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            In: {totalIn}
                        </Badge>
                        <Badge variant="outline" className="bg-status-issue/10 text-status-issue border-status-issue/30">
                            <TrendingDown className="w-3 h-3 mr-1" />
                            Out: {totalOut}
                        </Badge>
                    </div>
                </div>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date & Time</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Reason</TableHead>
                                <TableHead>Reference</TableHead>
                                <TableHead>Performed By</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {movements.map((movement, index) => (
                                <TableRow
                                    key={movement.id}
                                    className="animate-fade-in"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <TableCell className="text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            {formatDateTime(movement.date)}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="outline"
                                            className={cn(
                                                movement.type === 'in'
                                                    ? 'bg-status-completed/10 text-status-completed border-status-completed/30'
                                                    : 'bg-status-issue/10 text-status-issue border-status-issue/30'
                                            )}
                                        >
                                            {movement.type === 'in' ? (
                                                <TrendingUp className="w-3 h-3 mr-1" />
                                            ) : (
                                                <TrendingDown className="w-3 h-3 mr-1" />
                                            )}
                                            {movement.type === 'in' ? 'Stock In' : 'Stock Out'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <span className={cn(
                                            "font-bold",
                                            movement.type === 'in' ? 'text-status-completed' : 'text-status-issue'
                                        )}>
                                            {movement.type === 'in' ? '+' : '-'}{movement.quantity}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-foreground">{movement.reason}</TableCell>
                                    <TableCell>
                                        <code className="text-sm bg-muted px-2 py-0.5 rounded">
                                            {movement.reference}
                                        </code>
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">{movement.performedBy}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};

export default StockMovementHistory;
