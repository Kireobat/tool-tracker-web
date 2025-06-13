<script lang="ts">
	import * as Sidebar from "$lib/components/ui/sidebar/index.js";
	import type { Component, ComponentProps } from "svelte";
    //import Sidebar from "./ui/sidebar/sidebar.svelte";
	
	import SunIcon from "@lucide/svelte/icons/sun";
	import MoonIcon from "@lucide/svelte/icons/moon";
	
	import { toggleMode } from "mode-watcher";

	let {
		ref = $bindable(null),
		items,
		...restProps
	}: {
		items: {
			title: string;
			url: string;
			icon: Component;
		}[];
	} & ComponentProps<typeof Sidebar.Group> = $props();
</script>

<Sidebar.Group bind:ref {...restProps}>
	<Sidebar.GroupContent>
		<Sidebar.Menu>
			{#each items as item (item.title)}
				<Sidebar.MenuItem>
					<Sidebar.MenuButton size="sm">
						{#snippet child({ props })}
							<a href={item.url} {...props}>
								<item.icon />
								<span>{item.title}</span>
							</a>
						{/snippet}
					</Sidebar.MenuButton>
				</Sidebar.MenuItem>
			{/each}
			<Sidebar.MenuItem>
				<Sidebar.MenuButton size="sm" onclick={toggleMode}>
					<div class="flex justify-between w-24">
						<SunIcon class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
						<MoonIcon class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
						<span>Toggle theme</span>
					</div>
					</Sidebar.MenuButton>
			</Sidebar.MenuItem>
		</Sidebar.Menu>
	</Sidebar.GroupContent>
</Sidebar.Group>
