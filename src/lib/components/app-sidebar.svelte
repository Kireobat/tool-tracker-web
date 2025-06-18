<script lang="ts" module>
	import WrenchIcon from "@lucide/svelte/icons/wrench";
	import ReceiptText from "@lucide/svelte/icons/receipt-text";
	import LifeBuoyIcon from "@lucide/svelte/icons/life-buoy";
	import SendIcon from "@lucide/svelte/icons/send";
	import LandmarkIcon from "@lucide/svelte/icons/landmark";
	import HammerIcon from "@lucide/svelte/icons/hammer";
    import KeyRoundIcon from '@lucide/svelte/icons/key-round';

	import { user } from "$lib/functions/user.svelte";

	interface SidebarData {
		user: {
			name: string;
			email: string;
			avatar: string;
		};
		navMain: {
			title: string;
			url: string;
			icon: any;
			items?: { title: string; url: string }[];
		}[];
		navSecondary: {
			title: string;
			url: string;
			icon: any;
		}[];
	}

	const data: SidebarData = $derived({
		user: {
			name: user.current?.name || "Loading...",
			email: user.current?.email || "Loading...",
			avatar: "/avatars/shadcn.jpg",
		},
		navMain: [],
		navSecondary: [
			{
				title: "Support",
				url: "#",
				icon: LifeBuoyIcon,
			},
			{
				title: "Feedback",
				url: "#",
				icon: SendIcon,
			},
		]
	});
</script>

<script lang="ts">
	import NavMain from "./nav-main.svelte";
	import NavSecondary from "./nav-secondary.svelte";
	import NavUser from "./nav-user.svelte";
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import CommandIcon from "@lucide/svelte/icons/command";
	import { onMount, type ComponentProps } from "svelte";
    import { isAdmin } from "$lib/functions/auth/isAdmin";
	import ShieldIcon from "@lucide/svelte/icons/shield";
    import { isEmployee } from "$lib/functions/auth/isEmployee";
    import { Button } from "./ui/button";

	let admin: boolean = $state(false);
	let employee: boolean = $state(false);

    // Create a reactive navMain that includes admin items when user is admin
    let navMain = $derived(() => {
        const baseNav = [...data.navMain];

		if (employee) {
			baseNav.push({
				title: "Tools Management",
				url: "/app/tools",
				icon: HammerIcon,
				items: [
					{
						title: "Tools Overview",
						url: "/app/tools",
					},
					{
						title: "Register Tool",
						url: "/app/tools/register",
					},
					{
						title: "Tool Types",
						url: "/app/tools/types",
					},
					{
						title: "Create Type",
						url: "/app/tools/types/create",
					}
				],
			})
			baseNav.push(
			{
				title: "Lending & Agreements",
				url: "/app/agreements",
				icon: ReceiptText,
				items: [
					{
						title: "Lending Agreements",
						url: "/app/agreements",
					},
					{
						title: "Create new agreement",
						url: "/app/agreements/create",
					}
				],
			})
			baseNav.push({
				title: "Service & Maintenance",
				url: "/app/service",
				icon: WrenchIcon,
				items: [
					{
						title: "Service Events",
						url: "/app/service",
					},
					{
						title: "Schedule Service",
						url: "/app/service/create",
					},
					{
						title: "Damage Reports",
						url: "/app/service/damage",
					},
					{
						title: "Report Damage",
						url: "/app/service/damage/create",
					},
				],
			})
			baseNav.push({
				title: "Financial Management",
				url: "/app/fees",
				icon: LandmarkIcon,
				items: [
					{
						title: "Fees Overview",
						url: "/app/fees",
					},
					{
						title: "Create Fee",
						url: "/app/fees/create",
					}
				],
			})
		}
        
        if (admin) {
            baseNav.push({
                title: "Admin",
                url: "/app/admin",
                icon: ShieldIcon, // Use a different icon to avoid duplication
                items: [
                    {
                        title: "User Management",
                        url: "/app/admin/users",
                    },
                    {
                        title: "Role Management", 
                        url: "/app/admin/roles",
                    },
                    {
                        title: "System Settings",
                        url: "/app/admin/settings",
                    }
                ],
            });
        }
        
        return baseNav;
    });

	onMount(async () => {
        admin = await isAdmin(true);
		employee = await isEmployee(true);
    });

	let { ref = $bindable(null), ...restProps }: ComponentProps<typeof Sidebar.Root> = $props();
</script>

<Sidebar.Root bind:ref variant="inset" {...restProps}>
	<Sidebar.Header>
		<Sidebar.Menu>
			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="lg">
					{#snippet child({ props })}
						<a href="##" {...props}>
							<div
								class="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg"
							>
								<CommandIcon class="size-4" />
							</div>
							<div class="grid flex-1 text-left text-sm leading-tight">
								<span class="truncate font-medium">Tool Tracker</span>
								<span class="truncate text-xs">Enterprise</span>
							</div>
						</a>
					{/snippet}
				</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.Header>
	<Sidebar.Content>
		<NavMain items={navMain()} />
		<NavSecondary items={data.navSecondary} class="mt-auto" />
	</Sidebar.Content>
	<Sidebar.Footer>
		{#if user.current}
		<NavUser user={data.user} />
		{:else}
		<Button href="/login" variant="outline" class="flex items-center gap-2">
            <KeyRoundIcon class="w-4 h-4" />
            Login
        </Button>
		{/if}
	</Sidebar.Footer>
</Sidebar.Root>
