"use client"
import { 
  ArrowLeft, 
  Package, 
  TrendingUp, 
  TrendingDown, 
  Calendar,
  AlertTriangle,
  Edit,
  Trash2,
  Plus,
  History
} from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { inventoryItems } from '@/data/mockData';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useParams, useRouter } from 'next/navigation';

// Mock stock movement data
const stockMovements = [
  {
    id: 'mov-1',
    type: 'in' as const,
    quantity: 50,
    reason: 'Restock from supplier',
    reference: 'PO-2024-001',
    date: '2024-01-15T10:30:00',
    performedBy: 'Ravi Kumar',
  },
  {
    id: 'mov-2',
    type: 'out' as const,
    quantity: 2,
    reason: 'Used in service',
    reference: 'BK-001',
    date: '2024-01-16T14:20:00',
    performedBy: 'Amit Singh',
  },
  {
    id: 'mov-3',
    type: 'out' as const,
    quantity: 1,
    reason: 'Used in service',
    reference: 'BK-003',
    date: '2024-01-17T09:45:00',
    performedBy: 'Vikram Patel',
  },
  {
    id: 'mov-4',
    type: 'in' as const,
    quantity: 25,
    reason: 'Restock from supplier',
    reference: 'PO-2024-002',
    date: '2024-01-18T11:00:00',
    performedBy: 'Ravi Kumar',
  },
  {
    id: 'mov-5',
    type: 'out' as const,
    quantity: 3,
    reason: 'Used in service',
    reference: 'BK-004',
    date: '2024-01-19T16:30:00',
    performedBy: 'Suresh Reddy',
  },
  {
    id: 'mov-6',
    type: 'out' as const,
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

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

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
    toast('Restock Item',{
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
      {/* Header */}
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
          <Button variant="outline" size="sm" onClick={handleEdit}>
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" size="sm" className="text-destructive hover:text-destructive" onClick={handleDelete}>
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
          <Button size="sm" onClick={handleRestock}>
            <Plus className="w-4 h-4 mr-2" />
            Add Stock
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
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
                  {item.quantity}
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Item Details */}
        <Card className="lg:col-span-1">
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

        {/* Stock Movement History */}
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
                  {stockMovements.map((movement, index) => (
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
      </div>
    </div>
  );
};

export default InventoryDetails;
