<script lang="ts">
    import DataTable from "./data-table.svelte";
    import { columns } from "./columns.js";
    import { type ToolTypeDto, type ToolTrackerPageDtoToolTypeDto } from "$lib/generated/tool-tracker";
    import { getTypes } from "$lib/functions/get/getTypes";
    import * as Pagination from "$lib/components/ui/pagination/index.js";
    import * as Select from "$lib/components/ui/select/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Input } from "$lib/components/ui/input";
    import Label from "$lib/components/ui/label/label.svelte";

    let desiredPage: number = $state(0);
    let size: number = $state(20);
    let sort: string[] = $state([]);
    let name: string | undefined = $state()

    let toolTypePageDto: ToolTrackerPageDtoToolTypeDto = $state({
        page: [],
        totalItems: 0,
        currentPage: 0,
        pageSize: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPreviousPage: false
    })

    let isLoading: boolean = $state(true);

    $effect(() => {
        (async () => {
            isLoading = true;
            try {
                toolTypePageDto = await getTypes(desiredPage, size, sort, name);
            } catch (error) {
                console.error("Error loading tool types:", error);
                // Keep the default empty state on error
            } finally {
                isLoading = false;
            }
        })();
    });

    function handlePageChange(page: number) {
        desiredPage = page - 1; // Convert to 0-based indexing for API
    }

    function handlePageSizeChange(value: string | undefined) {
        if (value) {
            size = parseInt(value);
            desiredPage = 0;
        }
    }

    const pageSizeOptions = [
        { value: "5", label: "5" },
        { value: "10", label: "10" },
        { value: "20", label: "20" },
        { value: "50", label: "50" },
        { value: "100", label: "100" }
    ];

    const pageSizeTriggerContent = $derived(
        pageSizeOptions.find((option) => option.value === size.toString())?.label ?? "Select page size"
    );

</script>

<div class="flex space-x-4 mx-4">
    <Card.Root>
        <Card.Header>
            <Card.Title>Search settings</Card.Title>
        </Card.Header>
        <Card.Content class="flex flex-col space-y-4">
            <Label for="name" class="mb-1">Name</Label>
            <Input type="text" class="max-w-xs" bind:value={name} placeholder="Search by name..."/>

            <Label for="pageSize" class="mb-1">Page size</Label>
            <Select.Root type="single" value={size.toString()} onValueChange={handlePageSizeChange}>
                <Select.Trigger class="w-[180px]">
                    {pageSizeTriggerContent}
                </Select.Trigger>
                <Select.Content>
                    {#each pageSizeOptions as option (option.value)}
                        <Select.Item
                            value={option.value}
                            label={option.label}
                        >
                            {option.label}
                        </Select.Item>
                    {/each}
                </Select.Content>
            </Select.Root>
        </Card.Content>
    </Card.Root>
    <div class="w-full">
        {#if isLoading}
            <div class="flex items-center justify-center h-32">
                <div class="text-muted-foreground">Loading tool types...</div>
            </div>
        {:else}
            <DataTable data={toolTypePageDto.page} {columns} />
            
            {#if toolTypePageDto.totalItems > 0}
                <div class="flex items-center justify-between space-x-4">
                    <Pagination.Root 
                        count={toolTypePageDto.totalItems} 
                        perPage={size} 
                        page={desiredPage + 1}
                        onPageChange={handlePageChange}
                    >
                        {#snippet children({ pages, currentPage })}
                            <Pagination.Content>
                                <Pagination.Item>
                                    <Pagination.PrevButton />
                                </Pagination.Item>
                                {#each pages as page (page.key)}
                                    {#if page.type === "ellipsis"}
                                        <Pagination.Item>
                                            <Pagination.Ellipsis />
                                        </Pagination.Item>
                                    {:else}
                                        <Pagination.Item>
                                            <Pagination.Link {page} isActive={currentPage == page.value}>
                                                {page.value}
                                            </Pagination.Link>
                                        </Pagination.Item>
                                    {/if}
                                {/each}
                                <Pagination.Item>
                                    <Pagination.NextButton />
                                </Pagination.Item>
                            </Pagination.Content>
                        {/snippet}
                    </Pagination.Root>
                    <p class="text-xs text-muted-foreground">
                        Page {toolTypePageDto.currentPage + 1} of {toolTypePageDto.totalPages} ({toolTypePageDto.totalItems} total items)
                    </p>
                </div>
            {:else}
                <div class="flex items-center justify-center h-32">
                    <p class="text-muted-foreground">No tool types found matching your criteria.</p>
                </div>
            {/if}
        {/if}
    </div>
</div>