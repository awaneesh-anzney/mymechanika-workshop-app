import { useState } from 'react';
import { Plus, Trash2, Edit2, Check, X, Shield, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

// Types
interface Permission {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
}

interface TeamMember {
    id: string;
    name: string;
    email: string;
    role: 'owner' | 'supervisor' | 'mechanic' | 'inventory_manager' | 'delivery_executive';
    status: 'active' | 'inactive';
    permissions: {
        dashboard: Permission;
        bookings: Permission;
        liveJobs: Permission;
        mechanics: Permission;
        inventory: Permission;
        invoices: Permission;
        delivery: Permission;
        customers: Permission;
        reports: Permission;
        settings: Permission;
    };
}

const defaultPermissions: TeamMember['permissions'] = {
    dashboard: { view: false, create: false, edit: false, delete: false },
    bookings: { view: false, create: false, edit: false, delete: false },
    liveJobs: { view: false, create: false, edit: false, delete: false },
    mechanics: { view: false, create: false, edit: false, delete: false },
    inventory: { view: false, create: false, edit: false, delete: false },
    invoices: { view: false, create: false, edit: false, delete: false },
    delivery: { view: false, create: false, edit: false, delete: false },
    customers: { view: false, create: false, edit: false, delete: false },
    reports: { view: false, create: false, edit: false, delete: false },
    settings: { view: false, create: false, edit: false, delete: false },
};

const rolePresets: Record<string, Partial<TeamMember['permissions']>> = {
    supervisor: {
        dashboard: { view: true, create: false, edit: false, delete: false },
        bookings: { view: true, create: true, edit: true, delete: false },
        liveJobs: { view: true, create: false, edit: true, delete: false },
        mechanics: { view: true, create: false, edit: true, delete: false },
        inventory: { view: true, create: false, edit: false, delete: false },
        invoices: { view: true, create: true, edit: true, delete: false },
        delivery: { view: true, create: true, edit: true, delete: false },
        customers: { view: true, create: true, edit: true, delete: false },
        reports: { view: true, create: false, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false },
    },
    mechanic: {
        dashboard: { view: true, create: false, edit: false, delete: false },
        bookings: { view: true, create: false, edit: false, delete: false },
        liveJobs: { view: true, create: false, edit: true, delete: false },
        mechanics: { view: false, create: false, edit: false, delete: false },
        inventory: { view: true, create: false, edit: false, delete: false },
        invoices: { view: false, create: false, edit: false, delete: false },
        delivery: { view: false, create: false, edit: false, delete: false },
        customers: { view: false, create: false, edit: false, delete: false },
        reports: { view: false, create: false, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false },
    },
    inventory_manager: {
        dashboard: { view: true, create: false, edit: false, delete: false },
        bookings: { view: true, create: false, edit: false, delete: false },
        liveJobs: { view: false, create: false, edit: false, delete: false },
        mechanics: { view: false, create: false, edit: false, delete: false },
        inventory: { view: true, create: true, edit: true, delete: true },
        invoices: { view: true, create: false, edit: false, delete: false },
        delivery: { view: false, create: false, edit: false, delete: false },
        customers: { view: false, create: false, edit: false, delete: false },
        reports: { view: true, create: false, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false },
    },
    delivery_executive: {
        dashboard: { view: true, create: false, edit: false, delete: false },
        bookings: { view: true, create: false, edit: false, delete: false },
        liveJobs: { view: false, create: false, edit: false, delete: false },
        mechanics: { view: false, create: false, edit: false, delete: false },
        inventory: { view: false, create: false, edit: false, delete: false },
        invoices: { view: false, create: false, edit: false, delete: false },
        delivery: { view: true, create: true, edit: true, delete: false },
        customers: { view: true, create: false, edit: false, delete: false },
        reports: { view: false, create: false, edit: false, delete: false },
        settings: { view: false, create: false, edit: false, delete: false },
    },
};

const initialTeamMembers: TeamMember[] = [
    {
        id: '1',
        name: 'Rajesh Kumar',
        email: 'rajesh@mymechanika.com',
        role: 'owner',
        status: 'active',
        permissions: {
            dashboard: { view: true, create: true, edit: true, delete: true },
            bookings: { view: true, create: true, edit: true, delete: true },
            liveJobs: { view: true, create: true, edit: true, delete: true },
            mechanics: { view: true, create: true, edit: true, delete: true },
            inventory: { view: true, create: true, edit: true, delete: true },
            invoices: { view: true, create: true, edit: true, delete: true },
            delivery: { view: true, create: true, edit: true, delete: true },
            customers: { view: true, create: true, edit: true, delete: true },
            reports: { view: true, create: true, edit: true, delete: true },
            settings: { view: true, create: true, edit: true, delete: true },
        },
    },
    {
        id: '2',
        name: 'Amit Sharma',
        email: 'amit@mymechanika.com',
        role: 'supervisor',
        status: 'active',
        permissions: rolePresets.supervisor as TeamMember['permissions'],
    },
    {
        id: '3',
        name: 'Vikram Singh',
        email: 'vikram@mymechanika.com',
        role: 'mechanic',
        status: 'active',
        permissions: rolePresets.mechanic as TeamMember['permissions'],
    },
];

const roleLabels: Record<TeamMember['role'], string> = {
    owner: 'Owner',
    supervisor: 'Supervisor',
    mechanic: 'Mechanic',
    inventory_manager: 'Inventory Manager',
    delivery_executive: 'Delivery Executive',
};

const moduleLabels: Record<keyof TeamMember['permissions'], string> = {
    dashboard: 'Dashboard',
    bookings: 'Bookings',
    liveJobs: 'Live Jobs',
    mechanics: 'Mechanics',
    inventory: 'Inventory',
    invoices: 'Invoices & Payments',
    delivery: 'Pickup & Delivery',
    customers: 'Customers',
    reports: 'Reports',
    settings: 'Settings',
};

export const TeamManagement = () => {
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>(initialTeamMembers);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isPermissionsDialogOpen, setIsPermissionsDialogOpen] = useState(false);
    const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
    const [newMember, setNewMember] = useState({
        name: '',
        email: '',
        role: 'mechanic' as TeamMember['role'],
    });

    const handleAddMember = () => {
        if (!newMember.name || !newMember.email) {
            toast.error('Error', {
                description: 'Please fill in all fields',
            });
            return;
        }

        const permissions = newMember.role === 'owner'
            ? Object.fromEntries(
                Object.keys(defaultPermissions).map((key) => [
                    key,
                    { view: true, create: true, edit: true, delete: true },
                ])
            ) as TeamMember['permissions']
            : (rolePresets[newMember.role] as TeamMember['permissions']) || defaultPermissions;

        const member: TeamMember = {
            id: Date.now().toString(),
            ...newMember,
            status: 'active',
            permissions,
        };

        setTeamMembers([...teamMembers, member]);
        setNewMember({ name: '', email: '', role: 'mechanic' });
        setIsAddDialogOpen(false);

        toast.success('Member Added', {
            description: `${member.name} has been added to the team.`,
        });
    };

    const handleRemoveMember = (id: string) => {
        const member = teamMembers.find((m) => m.id === id);
        if (member?.role === 'owner') {
            toast.error('Cannot Remove', {
                description: 'Owner cannot be removed from the team.',
            });
            return;
        }

        setTeamMembers(teamMembers.filter((m) => m.id !== id));
        toast.success('Member Removed', {
            description: 'Team member has been removed.',
        });
    };

    const handlePermissionChange = (
        module: keyof TeamMember['permissions'],
        action: keyof Permission,
        checked: boolean
    ) => {
        if (!selectedMember) return;

        setSelectedMember({
            ...selectedMember,
            permissions: {
                ...selectedMember.permissions,
                [module]: {
                    ...selectedMember.permissions[module],
                    [action]: checked,
                },
            },
        });
    };

    const handleSavePermissions = () => {
        if (!selectedMember) return;

        setTeamMembers(
            teamMembers.map((m) =>
                m.id === selectedMember.id ? selectedMember : m
            )
        );
        setIsPermissionsDialogOpen(false);

        toast.success('Permissions Updated', {
            description: `Permissions for ${selectedMember.name} have been saved.`,
        });
    };

    const handleToggleAllPermissions = (module: keyof TeamMember['permissions'], checked: boolean) => {
        if (!selectedMember) return;

        setSelectedMember({
            ...selectedMember,
            permissions: {
                ...selectedMember.permissions,
                [module]: {
                    view: checked,
                    create: checked,
                    edit: checked,
                    delete: checked,
                },
            },
        });
    };

    const getRoleBadgeVariant = (role: TeamMember['role']) => {
        switch (role) {
            case 'owner':
                return 'default';
            case 'supervisor':
                return 'secondary';
            default:
                return 'outline';
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-lg font-semibold text-foreground mb-1">Team Management</h2>
                    <p className="text-sm text-muted-foreground">
                        Manage team members, roles, and permissions
                    </p>
                </div>
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            <UserPlus className="w-4 h-4" />
                            Add Member
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md bg-card">
                        <DialogHeader>
                            <DialogTitle>Add Team Member</DialogTitle>
                            <DialogDescription>
                                Add a new member to your workshop team
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input
                                    id="name"
                                    placeholder="Enter member's name"
                                    value={newMember.name}
                                    onChange={(e) =>
                                        setNewMember({ ...newMember, name: e.target.value })
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter email address"
                                    value={newMember.email}
                                    onChange={(e) =>
                                        setNewMember({ ...newMember, email: e.target.value })
                                    }
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="role">Role</Label>
                                <Select
                                    value={newMember.role}
                                    onValueChange={(value: TeamMember['role']) =>
                                        setNewMember({ ...newMember, role: value })
                                    }
                                >
                                    <SelectTrigger className="bg-background">
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent className="bg-card border-border z-50">
                                        <SelectItem value="supervisor">Supervisor</SelectItem>
                                        <SelectItem value="mechanic">Mechanic</SelectItem>
                                        <SelectItem value="inventory_manager">Inventory Manager</SelectItem>
                                        <SelectItem value="delivery_executive">Delivery Executive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                                Cancel
                            </Button>
                            <Button onClick={handleAddMember}>Add Member</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Separator />

            {/* Team Members Table */}
            <div className="rounded-lg border border-border overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/50">
                            <TableHead className="font-semibold">Member</TableHead>
                            <TableHead className="font-semibold">Role</TableHead>
                            <TableHead className="font-semibold">Status</TableHead>
                            <TableHead className="font-semibold text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {teamMembers.map((member) => (
                            <TableRow key={member.id} className="hover:bg-muted/30">
                                <TableCell>
                                    <div>
                                        <p className="font-medium text-foreground">{member.name}</p>
                                        <p className="text-sm text-muted-foreground">{member.email}</p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={getRoleBadgeVariant(member.role)}>
                                        {roleLabels[member.role]}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant="outline"
                                        className={cn(
                                            member.status === 'active'
                                                ? 'border-green-500 text-green-600 bg-green-500/10'
                                                : 'border-muted-foreground text-muted-foreground'
                                        )}
                                    >
                                        {member.status === 'active' ? 'Active' : 'Inactive'}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="gap-1 text-muted-foreground hover:text-foreground"
                                            onClick={() => {
                                                setSelectedMember(member);
                                                setIsPermissionsDialogOpen(true);
                                            }}
                                            disabled={member.role === 'owner'}
                                        >
                                            <Shield className="w-4 h-4" />
                                            Permissions
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                            onClick={() => handleRemoveMember(member.id)}
                                            disabled={member.role === 'owner'}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Permissions Dialog */}
            <Dialog open={isPermissionsDialogOpen} onOpenChange={setIsPermissionsDialogOpen}>
                <DialogContent className="sm:max-w-3xl bg-card max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Shield className="w-5 h-5 text-primary" />
                            Edit Permissions - {selectedMember?.name}
                        </DialogTitle>
                        <DialogDescription>
                            Configure what {selectedMember?.name} can view and do in each module
                        </DialogDescription>
                    </DialogHeader>

                    <div className="py-4">
                        <div className="rounded-lg border border-border overflow-hidden">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-muted/50">
                                        <TableHead className="font-semibold w-48">Module</TableHead>
                                        <TableHead className="font-semibold text-center">View</TableHead>
                                        <TableHead className="font-semibold text-center">Create</TableHead>
                                        <TableHead className="font-semibold text-center">Edit</TableHead>
                                        <TableHead className="font-semibold text-center">Delete</TableHead>
                                        <TableHead className="font-semibold text-center">All</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {selectedMember &&
                                        Object.entries(selectedMember.permissions).map(([module, perms]) => {
                                            const allChecked = perms.view && perms.create && perms.edit && perms.delete;
                                            return (
                                                <TableRow key={module} className="hover:bg-muted/30">
                                                    <TableCell className="font-medium">
                                                        {moduleLabels[module as keyof TeamMember['permissions']]}
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        <Checkbox
                                                            checked={perms.view}
                                                            onCheckedChange={(checked) =>
                                                                handlePermissionChange(
                                                                    module as keyof TeamMember['permissions'],
                                                                    'view',
                                                                    checked as boolean
                                                                )
                                                            }
                                                        />
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        <Checkbox
                                                            checked={perms.create}
                                                            onCheckedChange={(checked) =>
                                                                handlePermissionChange(
                                                                    module as keyof TeamMember['permissions'],
                                                                    'create',
                                                                    checked as boolean
                                                                )
                                                            }
                                                        />
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        <Checkbox
                                                            checked={perms.edit}
                                                            onCheckedChange={(checked) =>
                                                                handlePermissionChange(
                                                                    module as keyof TeamMember['permissions'],
                                                                    'edit',
                                                                    checked as boolean
                                                                )
                                                            }
                                                        />
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        <Checkbox
                                                            checked={perms.delete}
                                                            onCheckedChange={(checked) =>
                                                                handlePermissionChange(
                                                                    module as keyof TeamMember['permissions'],
                                                                    'delete',
                                                                    checked as boolean
                                                                )
                                                            }
                                                        />
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        <Checkbox
                                                            checked={allChecked}
                                                            onCheckedChange={(checked) =>
                                                                handleToggleAllPermissions(
                                                                    module as keyof TeamMember['permissions'],
                                                                    checked as boolean
                                                                )
                                                            }
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsPermissionsDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSavePermissions} className="gap-2">
                            <Check className="w-4 h-4" />
                            Save Permissions
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};
