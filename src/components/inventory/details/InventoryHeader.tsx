"use client"
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Edit, Trash2, Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { InventoryItem } from '@/types';

interface InventoryHeaderProps {
    item: InventoryItem;
    stockStatus: string;
    onEdit: () => void;
    onDelete: () => void;
    onRestock: () => void;
}

const InventoryHeader: React.FC<InventoryHeaderProps> = ({ item, stockStatus, onEdit, onDelete, onRestock }) => {
    const router = useRouter();

    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => router.push('/inventory')}>
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl font-bold text-foreground">{item.name}</h1>
                        <Badge
                            variant="outline"
                            className={cn(
                                stockStatus === 'out' && 'border-status-issue text-status-issue bg-status-issue/10',
                                stockStatus === 'low' && 'border-status-progress text-status-progress bg-status-progress/10',
                                stockStatus === 'ok' && 'border-status-completed text-status-completed bg-status-completed/10'
                            )}
                        >
                            {stockStatus === 'out' ? 'Out of Stock' : stockStatus === 'low' ? 'Low Stock' : 'In Stock'}
                        </Badge>
                    </div>
                    <p className="text-muted-foreground mt-1">SKU: {item.sku}</p>
                </div>
            </div>
            <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={onEdit}>
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                </Button>
                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive" onClick={onDelete}>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete
                </Button>
                <Button size="sm" onClick={onRestock}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Stock
                </Button>
            </div>
        </div>
    );
};

export default InventoryHeader;
