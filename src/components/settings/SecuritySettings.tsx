"use client"
import { Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

export const SecuritySettings = () => {
    const handleSave = () => {
        toast.success('Security Updated', {
            description: 'Your security settings have been updated successfully.',
        });
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="text-lg font-semibold text-foreground mb-1">Security Settings</h2>
                <p className="text-sm text-muted-foreground">Manage your account security</p>
            </div>

            <Separator />

            <div className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input id="currentPassword" type="password" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input id="confirmPassword" type="password" />
                </div>

                <Separator />

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div>
                        <p className="font-medium text-foreground">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch />
                </div>
            </div>

            <div className="flex justify-end">
                <Button onClick={handleSave} className="gap-2">
                    <Save className="w-4 h-4" />
                    Update Security
                </Button>
            </div>
        </div>
    );
};
