<script lang="ts">
    import DataTable from "./data-table.svelte";
    import { columns } from "./columns.js";
    import { ToolDtoStatusEnum, type ToolDto, type ToolTrackerPageDtoToolDto, type ToolTrackerPageDtoToolTypeDto } from "$lib/generated/tool-tracker";
    import { getTools } from "$lib/functions/get/getTools";
    import * as Pagination from "$lib/components/ui/pagination/index.js";
    import * as Select from "$lib/components/ui/select/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Input } from "$lib/components/ui/input";
    import Label from "$lib/components/ui/label/label.svelte";
    import { getTypes } from "$lib/functions/get/getTypes";

    interface Props {
        data: ToolDto[]
    }

    
    let desiredPage: number = $state(0);
    let size: number = $state(20);
    let sort: string[] = $state([]);
    let name: string | undefined = $state()
    let serial: string | undefined = $state()
    let toolTypeId: number | undefined = $state()
    let status: ToolDtoStatusEnum | undefined = $state()

    let toolPageDto: ToolTrackerPageDtoToolDto | undefined = $state()

    let toolTypePageDto: ToolTrackerPageDtoToolTypeDto | undefined = $state();

    $effect(() => {
        (async () => {
            toolPageDto = await getTools(desiredPage, size, sort, name, serial, toolTypeId, status);
        })();
    });
    $effect(() => {
        (async () => {
            toolTypePageDto = await getTypes(0, 1000, ["name,desc"]);
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

    function handleStatusChange(value: string | undefined) {
        if (value && value !== "undefined") {
            status = value as ToolDtoStatusEnum;
        } else {
            status = undefined;
        }
        desiredPage = 0;
    }

    function handleToolTypeChange(value: string | undefined) {
        if (value && value !== "undefined") {
            toolTypeId = parseInt(value);
        } else {
            toolTypeId = undefined;
        }
        desiredPage = 0;
    }

    const pageSizeOptions = [
        { value: "5", label: "5" },
        { value: "10", label: "10" },
        { value: "20", label: "20" },
        { value: "50", label: "50" },
        { value: "100", label: "100" }
    ];

    const toolTypeOptions = $derived([
        { value: "undefined", label: "All Types" },
        ...(toolTypePageDto?.page.map((toolType) => ({
            value: toolType.id.toString(),
            label: toolType.name.charAt(0).toUpperCase() + toolType.name.slice(1).toLowerCase()
        })) ?? [])
    ]);

    const statusOptions = [
        { value: "undefined", label: "All Statuses" },
        ...Object.values(ToolDtoStatusEnum).map((enumValue) => ({
            value: enumValue,
            label: enumValue.charAt(0).toUpperCase() + enumValue.slice(1).toLowerCase()
        }))
    ];

    const pageSizeTriggerContent = $derived(
        pageSizeOptions.find((option) => option.value === size.toString())?.label ?? "Select page size"
    );

    const statusTriggerContent = $derived(
        statusOptions.find((option) => option.value === (status ?? "undefined"))?.label ?? "Select status"
    );

    const toolTypeTriggerContent = $derived(
        toolTypeOptions.find((option) => option.value === (toolTypeId?.toString() ?? "undefined"))?.label ?? "Select tool type"
    );

</script>
 
{#if toolPageDto === undefined}
    <div>Loading...</div>
{:else}
<div class="flex space-x-4 mx-4">
    <Card.Root>
        <Card.Header>
            <Card.Title>Search settings</Card.Title>
        </Card.Header>
        <Card.Content class="flex flex-col space-y-4">
            <Label for="name" class="mb-1">Name</Label>
            <Input type="text" class="max-w-xs" bind:value={name}/>

            <Label for="serial" class="mb-1">Serial</Label>
            <Input type="text" class="max-w-xs" bind:value={serial}/>

            <Label for="tooltype" class="mb-1">Tool type</Label>
            <Select.Root type="single" value={toolTypeId?.toString() ?? "undefined"} onValueChange={handleToolTypeChange}>
                <Select.Trigger class="w-[180px]">
                    {toolTypeTriggerContent}
                </Select.Trigger>
                <Select.Content>
                    {#each toolTypeOptions as option (option.value)}
                        <Select.Item
                            value={option.value}
                            label={option.label}
                        >
                            {option.label}
                        </Select.Item>
                    {/each}
                </Select.Content>
            </Select.Root>

            <Label for="status" class="mb-1">Status</Label>
            <Select.Root type="single" value={status ?? "undefined"} onValueChange={handleStatusChange}>
                <Select.Trigger class="w-[180px]">
                    {statusTriggerContent}
                </Select.Trigger>
                <Select.Content>
                    {#each statusOptions as option (option.value)}
                        <Select.Item
                            value={option.value}
                            label={option.label}
                        >
                            {option.label}
                        </Select.Item>
                    {/each}
                </Select.Content>
            </Select.Root>

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
            <DataTable data={toolPageDto.page} {columns} />

            {#if toolPageDto.totalItems > 0}
            <div class="flex items-center justify-between space-x-4">
            <Pagination.Root 
                count={toolPageDto.totalItems} 
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
                                    <Pagination.Link {page} isActive={currentPage === page.value}>
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
                Page {toolPageDto.currentPage + 1} of {toolPageDto.totalPages} ({toolPageDto.totalItems} total items)
            </p>
            </div>
        {/if}
    </div>
</div>
{/if}