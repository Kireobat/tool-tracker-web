<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import { Badge } from "$lib/components/ui/badge";
    import Button from "$lib/components/ui/button/button.svelte";
    import { Separator } from "$lib/components/ui/separator";
    import * as Avatar from "$lib/components/ui/avatar/index.js";
    import { Progress } from "$lib/components/ui/progress";
    
    // Icons
    import UsersIcon from "@lucide/svelte/icons/users";
    import ShieldIcon from "@lucide/svelte/icons/shield";
    import SettingsIcon from "@lucide/svelte/icons/settings";
    import ShieldCheckIcon from "@lucide/svelte/icons/shield-check";
    import ActivityIcon from "@lucide/svelte/icons/activity";
    import AlertTriangleIcon from "@lucide/svelte/icons/alert-triangle";

    // Example statistics data
    const userStats = {
        total: 47,
        active: 42,
        inactive: 5,
        newThisMonth: 8,
        adminCount: 3,
        employeeCount: 39,
        regularCount: 5
    };

    const roleStats = {
        total: 4,
        adminRole: { name: "Administrator", count: 3, percentage: 6.4 },
        employeeRole: { name: "Employee", count: 39, percentage: 82.9 },
        userRole: { name: "User", count: 2, percentage: 4.3 }
    };

    const recentActivity = [
        { action: "New user registered", user: "John Smith", time: "2 hours ago", type: "user" },
        { action: "Role updated", user: "Alice Johnson", time: "4 hours ago", type: "role" },
        { action: "System settings changed", user: "Admin", time: "1 day ago", type: "settings" },
        { action: "User deactivated", user: "Bob Wilson", time: "2 days ago", type: "user" },
        { action: "New employee role assigned", user: "Sarah Davis", time: "3 days ago", type: "role" }
    ];

    const quickActions = [
        { 
            title: "User Management", 
            description: "View and manage all system users",
            href: "/app/admin/users",
            icon: UsersIcon,
            color: "bg-blue-500"
        },
        { 
            title: "Role Management", 
            description: "Configure user roles and permissions",
            href: "/app/admin/roles",
            icon: ShieldIcon,
            color: "bg-green-500"
        },
        { 
            title: "System Settings", 
            description: "Configure system-wide preferences",
            href: "/app/admin/settings",
            icon: SettingsIcon,
            color: "bg-purple-500"
        }
    ];
</script>

<div class="container mx-auto px-4 py-8 space-y-8">
    <!-- Header -->
    <div class="flex items-center justify-between">
        <div>
            <h1 class="text-3xl font-bold">Admin Dashboard</h1>
            <p class="text-muted-foreground">System administration and management overview</p>
        </div>
        <Badge variant="destructive" class="flex items-center gap-2">
            <ShieldCheckIcon class="h-4 w-4" />
            Administrator Access
        </Badge>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <!-- Total Users -->
        <Card.Root>
            <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
                <Card.Title class="text-sm font-medium">Total Users</Card.Title>
                <UsersIcon class="h-4 w-4 text-muted-foreground" />
            </Card.Header>
            <Card.Content>
                <div class="text-2xl font-bold">{userStats.total}</div>
                <p class="text-xs text-muted-foreground">
                    <span class="text-green-600">+{userStats.newThisMonth}</span> new this month
                </p>
                <div class="mt-4 space-y-2">
                    <div class="flex justify-between text-xs">
                        <span>Active</span>
                        <span>{userStats.active}</span>
                    </div>
                    <Progress value={(userStats.active / userStats.total) * 100} class="h-2" />
                </div>
            </Card.Content>
        </Card.Root>

        <!-- Active Roles -->
        <Card.Root>
            <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
                <Card.Title class="text-sm font-medium">Active Roles</Card.Title>
                <ShieldIcon class="h-4 w-4 text-muted-foreground" />
            </Card.Header>
            <Card.Content>
                <div class="text-2xl font-bold">{roleStats.total}</div>
                <p class="text-xs text-muted-foreground">
                    System roles configured
                </p>
                <div class="mt-4 space-y-1">
                    <div class="flex justify-between text-xs">
                        <span>Employees</span>
                        <span>{roleStats.employeeRole.percentage}%</span>
                    </div>
                    <Progress value={roleStats.employeeRole.percentage} class="h-2" />
                </div>
            </Card.Content>
        </Card.Root>

        <!-- System Health -->
        <Card.Root>
            <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
                <Card.Title class="text-sm font-medium">System Health</Card.Title>
                <ActivityIcon class="h-4 w-4 text-muted-foreground" />
            </Card.Header>
            <Card.Content>
                <div class="text-2xl font-bold text-green-600">Excellent</div>
                <p class="text-xs text-muted-foreground">
                    All systems operational
                </p>
                <div class="mt-4">
                    <Progress value={98} class="h-2" />
                    <p class="text-xs text-muted-foreground mt-1">98% uptime</p>
                </div>
            </Card.Content>
        </Card.Root>

        <!-- Pending Actions -->
        <Card.Root>
            <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
                <Card.Title class="text-sm font-medium">Pending Actions</Card.Title>
                <AlertTriangleIcon class="h-4 w-4 text-muted-foreground" />
            </Card.Header>
            <Card.Content>
                <div class="text-2xl font-bold">3</div>
                <p class="text-xs text-muted-foreground">
                    Items requiring attention
                </p>
                <div class="mt-4 space-y-1 text-xs">
                    <div class="flex justify-between">
                        <span>User approvals</span>
                        <span>2</span>
                    </div>
                    <div class="flex justify-between">
                        <span>Role updates</span>
                        <span>1</span>
                    </div>
                </div>
            </Card.Content>
        </Card.Root>
    </div>

    <!-- Quick Actions -->
    <Card.Root>
        <Card.Header>
            <Card.Title>Quick Actions</Card.Title>
            <Card.Description>Common administrative tasks</Card.Description>
        </Card.Header>
        <Card.Content>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                {#each quickActions as action}
                    <Card.Root class="border-2 hover:border-primary/50 transition-colors">
                        <Card.Header class="text-center">
                            <div class="mx-auto w-12 h-12 bg-muted rounded-lg flex items-center justify-center mb-4">
                                <svelte:component this={action.icon} class="h-6 w-6" />
                            </div>
                            <Card.Title class="text-lg">{action.title}</Card.Title>
                            <Card.Description>{action.description}</Card.Description>
                        </Card.Header>
                        <Card.Content class="pt-0 text-center">
                            <Button href={action.href} class="w-full">
                                Access {action.title}
                            </Button>
                        </Card.Content>
                    </Card.Root>
                {/each}
            </div>
        </Card.Content>
    </Card.Root>

    <!-- Detailed Statistics and Recent Activity -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- User Role Distribution -->
        <Card.Root>
            <Card.Header>
                <Card.Title>User Role Distribution</Card.Title>
                <Card.Description>Breakdown of user roles in the system</Card.Description>
            </Card.Header>
            <Card.Content class="space-y-4">
                <div class="space-y-3">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                            <span class="text-sm">Administrator</span>
                        </div>
                        <div class="text-right">
                            <div class="text-sm font-medium">{roleStats.adminRole.count} users</div>
                            <div class="text-xs text-muted-foreground">{roleStats.adminRole.percentage}%</div>
                        </div>
                    </div>
                    <Progress value={roleStats.adminRole.percentage} class="h-2" />
                </div>

                <div class="space-y-3">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span class="text-sm">Employee</span>
                        </div>
                        <div class="text-right">
                            <div class="text-sm font-medium">{roleStats.employeeRole.count} users</div>
                            <div class="text-xs text-muted-foreground">{roleStats.employeeRole.percentage}%</div>
                        </div>
                    </div>
                    <Progress value={roleStats.employeeRole.percentage} class="h-2" />
                </div>

                <div class="space-y-3">
                    <div class="flex items-center justify-between">
                        <div class="flex items-center gap-2">
                            <div class="w-3 h-3 bg-orange-500 rounded-full"></div>
                            <span class="text-sm">User</span>
                        </div>
                        <div class="text-right">
                            <div class="text-sm font-medium">{roleStats.userRole.count} users</div>
                            <div class="text-xs text-muted-foreground">{roleStats.userRole.percentage}%</div>
                        </div>
                    </div>
                    <Progress value={roleStats.userRole.percentage} class="h-2" />
                </div>
            </Card.Content>
        </Card.Root>

        <!-- Recent Activity -->
        <Card.Root>
            <Card.Header>
                <Card.Title>Recent Activity</Card.Title>
                <Card.Description>Latest administrative actions and changes</Card.Description>
            </Card.Header>
            <Card.Content>
                <div class="space-y-4">
                    {#each recentActivity as activity}
                        <div class="flex items-start gap-3">
                            <Avatar.Root class="h-8 w-8">
                                <Avatar.Fallback class="text-xs">
                                    {#if activity.type === 'user'}
                                        <UsersIcon class="h-4 w-4" />
                                    {:else if activity.type === 'role'}
                                        <ShieldIcon class="h-4 w-4" />
                                    {:else}
                                        <SettingsIcon class="h-4 w-4" />
                                    {/if}
                                </Avatar.Fallback>
                            </Avatar.Root>
                            <div class="flex-1 space-y-1">
                                <p class="text-sm font-medium">{activity.action}</p>
                                <div class="flex items-center gap-2">
                                    <p class="text-xs text-muted-foreground">by {activity.user}</p>
                                    <Badge variant="outline" class="text-xs">
                                        {activity.time}
                                    </Badge>
                                </div>
                            </div>
                        </div>
                        {#if activity !== recentActivity[recentActivity.length - 1]}
                            <Separator />
                        {/if}
                    {/each}
                </div>
            </Card.Content>
        </Card.Root>
    </div>

    <!-- System Information -->
    <Card.Root>
        <Card.Header>
            <Card.Title>System Information</Card.Title>
            <Card.Description>Current system status and configuration</Card.Description>
        </Card.Header>
        <Card.Content>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="space-y-2">
                    <div class="text-sm font-medium">Database Status</div>
                    <div class="flex items-center gap-2">
                        <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span class="text-sm text-muted-foreground">Connected</span>
                    </div>
                </div>
                <div class="space-y-2">
                    <div class="text-sm font-medium">API Endpoints</div>
                    <div class="text-sm text-muted-foreground">
                        <Button href="https://api.kireobat.eu/tool-tracker" variant="outline" size="sm">
                            Swagger Documentation
                        </Button>
                    </div>
                </div>
                <div class="space-y-2">
                    <div class="text-sm font-medium">Last Backup</div>
                    <div class="text-sm text-muted-foreground">2 hours ago</div>
                </div>
            </div>
        </Card.Content>
    </Card.Root>
</div>
