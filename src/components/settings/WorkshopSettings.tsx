"use client"
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

export const WorkshopSettings = () => {
    const handleSave = () => {
        toast.success('Settings Saved', {
            description: 'Your workshop details have been updated successfully.',
        });
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="text-lg font-semibold text-foreground mb-1">Workshop Details</h2>
                <p className="text-sm text-muted-foreground">Update your workshop information</p>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="workshopName">Workshop Name</Label>
                    <Input id="workshopName" defaultValue="MyMechanika AutoCare" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" defaultValue="+91 98765 43210" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" defaultValue="contact@mymechanika.com" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="gst">GST Number</Label>
                    <Input id="gst" defaultValue="29ABCDE1234F1Z5" />
                </div>
                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" defaultValue="123 MG Road, Koramangala, Bangalore - 560034" />
                </div>
            </div>

            <div className="flex justify-end">
                <Button onClick={handleSave} className="gap-2">
                    <Save className="w-4 h-4" />
                    Save Changes
                </Button>
            </div>
        </div>
    );
};
