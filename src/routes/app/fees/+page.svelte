<script lang="ts">
    import DataTable from "./data-table.svelte";
    import { columns } from "./columns.js";
    import { FeeDtoStatusEnum, type FeeDto, type ToolTrackerPageDtoFeeDto } from "$lib/generated/tool-tracker";
    import { getFees } from "$lib/functions/get/getFees";
    import * as Pagination from "$lib/components/ui/pagination/index.js";
    import * as Select from "$lib/components/ui/select/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Input } from "$lib/components/ui/input";
    import Label from "$lib/components/ui/label/label.svelte";

    let desiredPage: number = $state(0);
    let size: number = $state(20);
    let sort: string[] = $state([]);
    let lendingAgreementId: number | undefined = $state()
    let borrowerId: number | undefined = $state()
    let status: FeeDtoStatusEnum | undefined = $state()
    let feeAmountMin: number | undefined = $state()
    let feeAmountMax: number | undefined = $state()

    let feePageDto: ToolTrackerPageDtoFeeDto = $state({
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
                feePageDto = await getFees(desiredPage, size, sort, lendingAgreementId, borrowerId, status, feeAmountMin, feeAmountMax);
            } catch (error) {
                console.error("Error loading fees:", error);
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

    function handleStatusChange(value: string | undefined) {
        if (value && value !== "undefined") {
            status = value as FeeDtoStatusEnum;
        } else {
            status = undefined;
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

    const statusOptions = [
        { value: "undefined", label: "All Statuses" },
        ...Object.values(FeeDtoStatusEnum).map((enumValue) => ({
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

</script>

{#if isLoading}
    <div class="flex items-center justify-center h-32">
        <div class="text-muted-foreground">Loading fees...</div>
    </div>
{:else}
    <div class="flex space-x-4 mx-4">
        <Card.Root>
            <Card.Header>
                <Card.Title>Search settings</Card.Title>
            </Card.Header>
            <Card.Content class="flex flex-col space-y-4">
                <Label for="lendingAgreementId" class="mb-1">Lending Agreement ID</Label>
                <Input type="number" class="max-w-xs" bind:value={lendingAgreementId}/>

                <Label for="borrowerId" class="mb-1">Borrower ID</Label>
                <Input type="number" class="max-w-xs" bind:value={borrowerId}/>

                <Label for="feeAmountMin" class="mb-1">Min Fee Amount</Label>
                <Input type="number" class="max-w-xs" bind:value={feeAmountMin}/>

                <Label for="feeAmountMax" class="mb-1">Max Fee Amount</Label>
                <Input type="number" class="max-w-xs" bind:value={feeAmountMax}/>

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
            <DataTable data={feePageDto.page} {columns} />
            
            {#if feePageDto.totalItems > 0}
                <div class="flex items-center justify-between space-x-4">
                    <Pagination.Root 
                        count={feePageDto.totalItems} 
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
                        Page {feePageDto.currentPage + 1} of {feePageDto.totalPages} ({feePageDto.totalItems} total items)
                    </p>
                </div>
            {:else}
                <div class="flex items-center justify-center h-32">
                    <p class="text-muted-foreground">No fees found matching your criteria.</p>
                </div>
            {/if}
        </div>
    </div>
{/if}