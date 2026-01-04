"use client"
import React from 'react';
import { Package, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { inventoryItems } from '@/data/mockData';
import { toast } from 'sonner';
import { useParams, useRouter } from 'next/navigation';

import InventoryHeader from './details/InventoryHeader';
import InventoryStats from './details/InventoryStats';
import ItemDetailsCard from './details/ItemDetailsCard';
import StockMovementHistory, { StockMovement } from './details/StockMovementHistory';

// Mock stock movement data
const stockMovements: StockMovement[] = [
    {
        id: 'mov-1',
        type: 'in',
        quantity: 50,
        reason: 'Restock from supplier',
        reference: 'PO-2024-001',
        date: '2024-01-15T10:30:00',
        performedBy: 'Ravi Kumar',
    },
    {
        id: 'mov-2',
        type: 'out',
        quantity: 2,
        reason: 'Used in service',
        reference: 'BK-001',
        date: '2024-01-16T14:20:00',
        performedBy: 'Amit Singh',
    },
    {
        id: 'mov-3',
        type: 'out',
        quantity: 1,
        reason: 'Used in service',
        reference: 'BK-003',
        date: '2024-01-17T09:45:00',
        performedBy: 'Vikram Patel',
    },
    {
        id: 'mov-4',
        type: 'in',
        quantity: 25,
        reason: 'Restock from supplier',
        reference: 'PO-2024-002',
        date: '2024-01-18T11:00:00',
        performedBy: 'Ravi Kumar',
    },
    {
        id: 'mov-5',
        type: 'out',
        quantity: 3,
        reason: 'Used in service',
        reference: 'BK-004',
        date: '2024-01-19T16:30:00',
        performedBy: 'Suresh Reddy',
    },
    {
        id: 'mov-6',
        type: 'out',
        quantity: 1,
        reason: 'Damaged/Defective',
        reference: 'DMG-001',
        date: '2024-01-20T08:15:00',
        performedBy: 'Ravi Kumar',
    },
];

const InventoryDetails = () => {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();

    const item = inventoryItems.find((i) => i.id === id);

    if (!item) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <Package className="w-16 h-16 text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold text-foreground mb-2">Item Not Found</h2>
                <p className="text-muted-foreground mb-4">The inventory item you're looking for doesn't exist.</p>
                <Button onClick={() => router.push('/inventory')}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Inventory
                </Button>
            </div>

        );
    }

    const getStockStatus = (quantity: number, minStock: number) => {
        if (quantity === 0) return 'out';
        if (quantity <= minStock) return 'low';
        return 'ok';
    };

    const stockStatus = getStockStatus(item.quantity, item.minStock);
    const totalIn = stockMovements.filter(m => m.type === 'in').reduce((acc, m) => acc + m.quantity, 0);
    const totalOut = stockMovements.filter(m => m.type === 'out').reduce((acc, m) => acc + m.quantity, 0);
    const stockValue = item.quantity * item.unitPrice;

    const handleRestock = () => {
        toast('Restock Item', {
            description: `Opening restock form for ${item.name}`,
        });
    };

    const handleEdit = () => {
        toast('Edit Item', {
            description: `Opening edit form for ${item.name}`,
        });
    };

    const handleDelete = () => {
        toast('Delete Item', {
            description: `This action would delete ${item.name}`,
        });
    };

    return (
        <div>
            <InventoryHeader
                item={item}
                stockStatus={stockStatus}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onRestock={handleRestock}
            />

            <InventoryStats
                quantity={item.quantity}
                totalIn={totalIn}
                totalOut={totalOut}
                stockValue={stockValue}
                stockStatus={stockStatus}
            />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <ItemDetailsCard
                    item={item}
                    stockValue={stockValue}
                    stockStatus={stockStatus}
                />
                <StockMovementHistory
                    movements={stockMovements}
                    totalIn={totalIn}
                    totalOut={totalOut}
                />
            </div>
        </div>
    );
};

export default InventoryDetails;
