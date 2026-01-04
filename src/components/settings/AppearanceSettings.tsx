"use client"
import { Palette } from 'lucide-react';

export const AppearanceSettings = () => {
    return (
        <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Palette className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Coming Soon</h3>
            <p className="text-muted-foreground text-center max-w-md">
                Appearance and theme customization options are currently under development and will be available soon.
            </p>
        </div>
    );
};
