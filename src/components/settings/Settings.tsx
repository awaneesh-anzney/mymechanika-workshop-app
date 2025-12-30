"use client"
import { useState } from 'react';
import { Save, Building2, Users, Bell, Shield, CreditCard, Palette } from 'lucide-react';
import { TeamManagement } from '@/components/settings/TeamManagement';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const Settings = () => {
    const [activeTab, setActiveTab] = useState('workshop');

    const tabs = [
        { id: 'workshop', label: 'Workshop Details', icon: Building2 },
        { id: 'team', label: 'Team Management', icon: Users },
        { id: 'notifications', label: 'Notifications', icon: Bell },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'billing', label: 'Billing', icon: CreditCard },
        { id: 'appearance', label: 'Appearance', icon: Palette },
    ];

    const handleSave = () => {
        toast.success('Settings Saved', {
            description: 'Your changes have been saved successfully.',
        });
    };

    return (
        <div className="flex-1 space-y-4">
            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar Tabs */}
                <div className="lg:w-64 flex-shrink-0">
                    <nav className="bg-card rounded-lg border border-border p-2 space-y-1">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    'w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                                    activeTab === tab.id
                                        ? 'bg-primary text-primary-foreground'
                                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                                )}
                            >
                                <tab.icon className="w-5 h-5" />
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Content */}
                <div className="flex-1 bg-card rounded-lg border border-border p-6">
                    {activeTab === 'workshop' && (
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
                    )}

                    {activeTab === 'notifications' && (
                        <div className="space-y-6 animate-fade-in">
                            <div>
                                <h2 className="text-lg font-semibold text-foreground mb-1">Notification Preferences</h2>
                                <p className="text-sm text-muted-foreground">Configure how you receive notifications</p>
                            </div>

                            <Separator />

                            <div className="space-y-4">
                                {[
                                    { id: 'new_booking', label: 'New Bookings', description: 'Get notified when a new booking is received' },
                                    { id: 'low_stock', label: 'Low Stock Alerts', description: 'Get notified when inventory items are running low' },
                                    { id: 'payment', label: 'Payment Updates', description: 'Get notified when payments are received or overdue' },
                                    { id: 'job_complete', label: 'Job Completion', description: 'Get notified when a service job is completed' },
                                    { id: 'customer_feedback', label: 'Customer Feedback', description: 'Get notified when customers leave reviews' },
                                ].map((item) => (
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
                    )}

                    {activeTab === 'security' && (
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
                    )}

                    {activeTab === 'team' && <TeamManagement />}

                    {(activeTab === 'billing' || activeTab === 'appearance') && (
                        <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
                            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                                {activeTab === 'billing' && <CreditCard className="w-8 h-8 text-muted-foreground" />}
                                {activeTab === 'appearance' && <Palette className="w-8 h-8 text-muted-foreground" />}
                            </div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">Coming Soon</h3>
                            <p className="text-muted-foreground text-center max-w-md">
                                This feature is currently under development and will be available soon.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Settings;