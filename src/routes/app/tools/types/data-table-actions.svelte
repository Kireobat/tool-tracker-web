<script lang="ts">
 import EllipsisIcon from "@lucide/svelte/icons/ellipsis";
 import { Button } from "$lib/components/ui/button/index.js";
 import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
 
 let { id, reportId }: { id: string, reportId: string } = $props();
</script>
 
<DropdownMenu.Root>
 <DropdownMenu.Trigger>
  {#snippet child({ props })}
   <Button
    {...props}
    variant="ghost"
    size="icon"
    class="relative size-8 p-0"
   >
    <span class="sr-only">Open menu</span>
    <EllipsisIcon />
   </Button>
  {/snippet}
 </DropdownMenu.Trigger>
 <DropdownMenu.Content>
  <DropdownMenu.Group>
   <DropdownMenu.Label>Actions</DropdownMenu.Label>
   <DropdownMenu.Item onclick={() => navigator.clipboard.writeText(id)}>
    Copy ID
   </DropdownMenu.Item>
   <DropdownMenu.Item onclick={() => navigator.clipboard.writeText(reportId)}>
    Copy report ID
   </DropdownMenu.Item>
  </DropdownMenu.Group>
  <DropdownMenu.Separator />
  <DropdownMenu.Item><a href="/app/service/{id}">View service event</a></DropdownMenu.Item>
 </DropdownMenu.Content>
</DropdownMenu.Root>