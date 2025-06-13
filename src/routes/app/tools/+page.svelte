<script lang="ts">
 import DataTable from "./data-table.svelte";
 import { columns } from "./columns.js";
    import type { ToolDto, ToolTrackerPageDtoToolDto } from "$lib/generated/tool-tracker";
    import { onMount } from "svelte";
    import { getTools } from "$lib/functions/get/getTools";

    interface Props {
        data: ToolDto[]
    }

    
    let page = $state(0);
    let size = $state(10);
    let sort = $state<string[]>([]);

    let pageDto: ToolTrackerPageDtoToolDto | undefined = $state()

    $effect(() => {
        (async () => {
            pageDto = await getTools(page, size, sort);
        })();
    });

</script>
 
{#await pageDto != undefined}
    <div>Loading...</div>
{:then}
    {#if pageDto}
        <DataTable data={pageDto.page} {columns} />
    {/if}
{/await}