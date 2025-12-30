"use client"
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

export const NotificationSettings = () => {
    const handleSave = () => {
        toast.success('Preferences Saved', {
            description: 'Your notification preferences have been updated.',
        });
    };

    const notifications = [
        { id: 'new_booking', label: 'New Bookings', description: 'Get notified when a new booking is received' },
        { id: 'low_stock', label: 'Low Stock Alerts', description: 'Get notified when inventory items are running low' },
        { id: 'payment', label: 'Payment Updates', description: 'Get notified when payments are received or overdue' },
        { id: 'job_complete', label: 'Job Completion', description: 'Get notified when a service job is completed' },
        { id: 'customer_feedback', label: 'Customer Feedback', description: 'Get notified when customers leave reviews' },
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="text-lg font-semibold text-foreground mb-1">Notification Preferences</h2>
                <p className="text-sm text-muted-foreground">Configure how you receive notifications</p>
            </div>

            <Separator />

            <div className="space-y-4">
                {notifications.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                        <div>
                            <p className="font-medium text-foreground">{item.label}</p>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <Switch defaultChecked />
                    </div>
                ))}
            </div>

            <div className="flex justify-end">
                <Button onClick={handleSave} className="gap-2">
                    <Save className="w-4 h-4" />
                    Save Preferences
                </Button>
            </div>
        </div>
    );
};
