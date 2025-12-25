"use client";

import { memo } from "react";
import { Bell, ChevronDown, LogOut, Settings, User, Search, Menu } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/auth-store';
import { useRouter } from 'next/navigation';

interface HeaderProps {
    onMenuToggle?: () => void;
}

export const Header = memo(function Header({ onMenuToggle }: HeaderProps) {
    const { user, logout } = useAuthStore();
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push('/');
    };

    // removed the early return null to prevent layout shifts
    // if (!user) return null; 

    return (
        <header className="sticky top-0 z-30 flex-none h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6 shadow-sm">
            {/* Left Section */}
            <div className="flex items-center gap-4">
                {/* Mobile Menu Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onMenuToggle}
                    className="md:hidden"
                    aria-label="Toggle menu"
                >
                    <Menu className="w-5 h-5" />
                </Button>

                {/* Workshop Info - Hidden on mobile */}
                <div className="hidden md:block">
                    <h1 className="text-lg font-semibold text-foreground">MyMechanika Workshop</h1>
                    <p className="text-sm text-muted-foreground">Dashboard</p>
                </div>

                {/* Mobile Title */}
                <div className="md:hidden">
                    <h1 className="text-base font-semibold text-foreground">Dashboard</h1>
                </div>
            </div>

            {/* Center - Search (Hidden on mobile) */}
            <div className="hidden lg:flex flex-1 max-w-md mx-8">
                <div className="relative w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                        placeholder="Search..."
                        className="pl-9 bg-muted/50 border-border"
                    />
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2">
                {/* Search Button - Mobile Only */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="lg:hidden"
                    aria-label="Search"
                >
                    <Search className="w-5 h-5" />
                </Button>

                {/* Notifications */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative"
                    aria-label="Notifications"
                >
                    <Bell className="w-5 h-5" />
                    {/* Only show badge if user exists/loaded, mock for now */}
                    {user && (
                        <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center font-medium">
                            3
                        </span>
                    )}
                </Button>

                {/* User Menu - Show Skeleton if loading */}
                {user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="gap-2 px-2 h-10">
                                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                                    <span className="text-sm font-medium text-primary-foreground">
                                        {user.name.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <div className="hidden lg:block text-left">
                                    <p className="text-sm font-medium leading-none">{user.name}</p>
                                    <p className="text-xs text-muted-foreground">{user.role}</p>
                                </div>
                                <ChevronDown className="w-4 h-4 text-muted-foreground hidden lg:block" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            {/* Mobile User Info */}
                            <div className="px-2 py-1.5 lg:hidden">
                                <p className="text-sm font-medium">{user.name}</p>
                                <p className="text-xs text-muted-foreground">{user.email}</p>
                                <p className="text-xs text-muted-foreground mt-1">Role: {user.role}</p>
                            </div>
                            <DropdownMenuSeparator className="lg:hidden" />

                            {/* Menu Items */}
                            <DropdownMenuItem onClick={() => router.push('/profile')}>
                                <User className="w-4 h-4 mr-2" />
                                Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push('/settings')}>
                                <Settings className="w-4 h-4 mr-2" />
                                Settings
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                onClick={handleLogout}
                                className="text-destructive focus:text-destructive focus:bg-destructive/10"
                            >
                                <LogOut className="w-4 h-4 mr-2" />
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ) : (
                    // Skeleton for User Menu during Hydration
                    <div className="flex items-center gap-2 px-2 h-10">
                        <div className="w-8 h-8 rounded-full bg-muted animate-pulse" />
                        <div className="hidden lg:block space-y-1">
                            <div className="h-3 w-24 bg-muted animate-pulse rounded" />
                            <div className="h-2 w-16 bg-muted animate-pulse rounded" />
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
});
