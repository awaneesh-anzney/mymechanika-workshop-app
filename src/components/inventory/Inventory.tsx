"use client"
import { useState } from 'react';
import { Plus, Search, Filter, AlertTriangle, Package, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { inventoryItems } from '@/data/mockData';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import InventoryTable from './InventoryTable';

const Inventory = () => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');

    const categories = [...new Set(inventoryItems.map((item) => item.category))];

    const filteredItems = inventoryItems.filter((item) => {
        const matchesSearch =
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.sku.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;

        return matchesSearch && matchesCategory;
    });



    const handleAddItem = () => {
        toast('Add Item', {
            description: 'Opening form to add new inventory item',
        });
    };

    const handleRestock = (itemId: string) => {
        toast('Restock', {
            description: `Opening restock form for item ${itemId}`,
        });
    };




    return (
        <div className='flex flex-col flex-1 overflow-hidden min-h-0'>
            {/* Stats Row */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-2">
                <div className="bg-card rounded-lg border border-border p-4">
                    <div className="flex items-center gap-3">
                        <Package className="w-8 h-8 text-accent" />
                        <div>
                            <p className="text-2xl font-bold text-foreground">{inventoryItems.length}</p>
                            <p className="text-sm text-muted-foreground">Total Items</p>
                        </div>
                    </div>
                </div>
                <div className="bg-card rounded-lg border border-border p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-status-completed/10 flex items-center justify-center">
                            <span className="text-status-completed font-bold">✓</span>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-status-completed">
                                {inventoryItems.filter((i) => i.quantity > i.minStock).length}
                            </p>
                            <p className="text-sm text-muted-foreground">In Stock</p>
                        </div>
                    </div>
                </div>
                <div className="bg-card rounded-lg border border-border p-4">
                    <div className="flex items-center gap-3">
                        <AlertTriangle className="w-8 h-8 text-status-progress" />
                        <div>
                            <p className="text-2xl font-bold text-status-progress">
                                {inventoryItems.filter((i) => i.quantity <= i.minStock && i.quantity > 0).length}
                            </p>
                            <p className="text-sm text-muted-foreground">Low Stock</p>
                        </div>
                    </div>
                </div>
                <div className="bg-card rounded-lg border border-border p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-status-issue/10 flex items-center justify-center">
                            <span className="text-status-issue font-bold">!</span>
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-status-issue">
                                {inventoryItems.filter((i) => i.quantity === 0).length}
                            </p>
                            <p className="text-sm text-muted-foreground">Out of Stock</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-2 justify-between">
                <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by name or SKU..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9"
                    />
                </div>
                <div className="flex gap-2">
                    <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                        <SelectTrigger className="w-40">
                            <Filter className="w-4 h-4 mr-2" />
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>
                            {categories.map((cat) => (
                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <Button variant="outline" className="gap-2">
                        <Download className="w-4 h-4" />
                        Export
                    </Button>
                </div>
                <div>
                <Button className="gap-2" onClick={handleAddItem}>
                    <Plus className="w-4 h-4" />
                    Add Item
                </Button>
                </div>
            </div>

            {/* Inventory Table */}
            <InventoryTable items={filteredItems} onRestock={handleRestock} />
        </div>
    );
};

export default Inventory;
