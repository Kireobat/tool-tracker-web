<script lang="ts">
    import * as Card from "$lib/components/ui/card/index.js";
    import { Badge } from "$lib/components/ui/badge";
    import Button from "$lib/components/ui/button/button.svelte";
    import { Separator } from "$lib/components/ui/separator";
    
    // Icons - same as your sidebar
    import HammerIcon from "@lucide/svelte/icons/hammer";
    import ReceiptText from "@lucide/svelte/icons/receipt-text";
    import WrenchIcon from "@lucide/svelte/icons/wrench";
    import LandmarkIcon from "@lucide/svelte/icons/landmark";
    import ShieldIcon from "@lucide/svelte/icons/shield";
    import CommandIcon from "@lucide/svelte/icons/command";

    const features = [
        {
            title: "Tools Management",
            description: "Register and track all your tools with detailed information including serial numbers, types, and status.",
            icon: HammerIcon,
            actions: [
                { label: "Tools Overview", href: "/app/tools" },
                { label: "Register Tool", href: "/app/tools/register" },
                { label: "Tool Types", href: "/app/tools/types" },
                { label: "Create Type", href: "/app/tools/types/create" }
            ]
        },
        {
            title: "Lending & Agreements",
            description: "Create and manage lending agreements to track who has borrowed which tools and when they're due back.",
            icon: ReceiptText,
            actions: [
                { label: "Lending Agreements", href: "/app/agreements" },
                { label: "Create new agreement", href: "/app/agreements/create" }
            ]
        },
        {
            title: "Service & Maintenance",
            description: "Track service events and damage reports to maintain your tools in optimal condition.",
            icon: WrenchIcon,
            actions: [
                { label: "Service Events", href: "/app/service" },
                { label: "Schedule Service", href: "/app/service/create" },
                { label: "Damage Reports", href: "/app/service/damage" },
                { label: "Report Damage", href: "/app/service/damage/create" }
            ]
        },
        {
            title: "Financial Management",
            description: "Manage fees associated with lending agreements, late returns, and damage costs.",
            icon: LandmarkIcon,
            actions: [
                { label: "Fees Overview", href: "/app/fees" },
                { label: "Create Fee", href: "/app/fees/create" }
            ]
        }
    ];

    const adminFeatures = [
        {
            title: "User Management",
            description: "Manage system users and their access levels.",
            href: "/app/admin/users"
        },
        {
            title: "Role Management",
            description: "Assign and manage user roles and permissions.",
            href: "/app/admin/roles"
        },
        {
            title: "System Settings",
            description: "Configure system-wide settings and preferences.",
            href: "/app/admin/settings"
        }
    ];
</script>

<div class="container mx-auto px-4 py-8 space-y-8">
    <!-- Hero Section -->
    <div class="text-center space-y-4">
        <div class="flex items-center justify-center mb-6">
            <div class="bg-primary text-primary-foreground p-4 rounded-lg">
                <CommandIcon class="h-8 w-8" />
            </div>
        </div>
        <h1 class="text-4xl font-bold">Tool Tracker Management</h1>
        <p class="text-muted-foreground text-lg max-w-3xl mx-auto">
            Comprehensive tool management software designed to help you track tools, manage lending agreements, 
            monitor service events, handle damage reports, and oversee financial aspects of your tool inventory.
        </p>
        <div class="flex items-center justify-center gap-2">
            <Badge variant="secondary">Enterprise Grade</Badge>
            <Badge variant="outline">Secure & Reliable</Badge>
        </div>
    </div>

    <!-- Main Features -->
    <div class="space-y-6">
        <div class="text-center">
            <h2 class="text-2xl font-bold mb-2">Core Features</h2>
            <p class="text-muted-foreground">Everything you need to manage your tool inventory effectively</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            {#each features as feature}
                <Card.Root>
                    <Card.Header>
                        <div class="flex items-center gap-3 mb-2">
                            <div class="p-2 bg-muted rounded-md">
                                <svelte:component this={feature.icon} class="h-5 w-5" />
                            </div>
                            <Card.Title class="text-lg">{feature.title}</Card.Title>
                        </div>
                        <Card.Description>{feature.description}</Card.Description>
                    </Card.Header>
                    
                    <Card.Content class="space-y-3">
                        <Separator />
                        <div class="space-y-2">
                            {#each feature.actions as action}
                                <Button 
                                    href={action.href} 
                                    variant="ghost" 
                                    size="sm"
                                    class="w-full justify-start"
                                >
                                    {action.label}
                                </Button>
                            {/each}
                        </div>
                    </Card.Content>
                </Card.Root>
            {/each}
        </div>
    </div>

    <!-- Admin Features -->
    <Card.Root>
        <Card.Header>
            <div class="flex items-center gap-3 mb-2">
                <div class="p-2 bg-destructive text-destructive-foreground rounded-md">
                    <ShieldIcon class="h-5 w-5" />
                </div>
                <div>
                    <Card.Title>Administrator Features</Card.Title>
                    <Card.Description>Advanced management capabilities for system administrators</Card.Description>
                </div>
                <Badge variant="destructive" class="ml-auto">Admin Only</Badge>
            </div>
        </Card.Header>
        
        <Card.Content>
            <Separator class="mb-4" />
            <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
                {#each adminFeatures as feature}
                    <Button 
                        href={feature.href} 
                        variant="outline"
                        class="h-auto p-4 flex-col items-start gap-2"
                    >
                        <div class="font-medium">{feature.title}</div>
                        <div class="text-xs text-muted-foreground">{feature.description}</div>
                    </Button>
                {/each}
            </div>
        </Card.Content>
    </Card.Root>

    <!-- Getting Started -->
    <Card.Root>
        <Card.Header>
            <Card.Title>Get Started</Card.Title>
            <Card.Description>
                Begin managing your tool inventory today. All functionality is available through the API endpoints 
                at <a class="bg-muted px-1 rounded text-sm" href="https://api.kireobat.eu/tool-tracker">https://api.kireobat.eu/tool-tracker</a>
            </Card.Description>
        </Card.Header>
        <Card.Content>
            <div class="flex flex-wrap gap-2">
                <Button href="/app/tools" variant="default">
                    View Tools
                </Button>
                <Button href="/app/tools/register" variant="secondary">
                    Register New Tool
                </Button>
            </div>
        </Card.Content>
    </Card.Root>
</div>