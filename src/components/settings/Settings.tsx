"use client"
import { useState } from 'react';
import { Building2, Users, Bell, Shield, CreditCard, Palette } from 'lucide-react';
import { WorkshopSettings } from '@/components/settings/WorkshopSettings';
import { TeamManagement } from '@/components/settings/TeamManagement';
import { NotificationSettings } from '@/components/settings/NotificationSettings';
import { SecuritySettings } from '@/components/settings/SecuritySettings';
import { BillingSettings } from '@/components/settings/BillingSettings';
import { AppearanceSettings } from '@/components/settings/AppearanceSettings';
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
                    {activeTab === 'workshop' && <WorkshopSettings />}
                    {activeTab === 'team' && <TeamManagement />}
                    {activeTab === 'notifications' && <NotificationSettings />}
                    {activeTab === 'security' && <SecuritySettings />}
                    {activeTab === 'billing' && <BillingSettings />}
                    {activeTab === 'appearance' && <AppearanceSettings />}
                </div>
            </div>
        </div>
    );
};

export default Settings;