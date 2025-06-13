<script lang="ts">
    import DataTable from "./data-table.svelte";
    import { columns } from "./columns.js";
    import { type DamageReportDto, type ToolTrackerPageDtoDamageReportDto } from "$lib/generated/tool-tracker";
    import { getReports } from "$lib/functions/get/getReports";
    import * as Pagination from "$lib/components/ui/pagination/index.js";
    import * as Select from "$lib/components/ui/select/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Input } from "$lib/components/ui/input";
    import Label from "$lib/components/ui/label/label.svelte";

    let desiredPage: number = $state(0);
    let size: number = $state(20);
    let sort: string[] = $state([]);
    let lendingAgreementId: number | undefined = $state()
    let toolId: number | undefined = $state()

    let reportPageDto: ToolTrackerPageDtoDamageReportDto | undefined = $state()

    $effect(() => {
        (async () => {
            reportPageDto = await getReports(desiredPage, size, sort, lendingAgreementId, toolId);
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
 
{#if reportPageDto === undefined}
    <div>Loading...</div>
{:else}
<div class="flex space-x-4 mx-4">
    <Card.Root>
        <Card.Header>
            <Card.Title>Search settings</Card.Title>
        </Card.Header>
        <Card.Content class="flex flex-col space-y-4">
            <Label for="lendingAgreementId" class="mb-1">Lending Agreement ID</Label>
            <Input type="number" class="max-w-xs" bind:value={lendingAgreementId}/>

            <Label for="toolId" class="mb-1">Tool ID</Label>
            <Input type="number" class="max-w-xs" bind:value={toolId}/>

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
            <DataTable data={reportPageDto.page} {columns} />

            {#if reportPageDto.totalItems > 0}
            <div class="flex items-center justify-between space-x-4">
            <Pagination.Root 
                count={reportPageDto.totalItems} 
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
                Page {reportPageDto.currentPage + 1} of {reportPageDto.totalPages} ({reportPageDto.totalItems} total items)
            </p>
            </div>
            {/if}
    </div>
</div>
{/if}