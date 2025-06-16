<script lang="ts">
    import { type CreateLendingAgreementDto, type ToolTrackerPageDtoToolDto, type ToolTrackerPageDtoUserDto, ToolDtoStatusEnum } from "$lib/generated/tool-tracker";
    import Button from "$lib/components/ui/button/button.svelte";
    import { getTools } from "$lib/functions/get/getTools";
    import { getUsers } from "$lib/functions/get/getUsers";
    import * as Select from "$lib/components/ui/select/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Input } from "$lib/components/ui/input";
    import Label from "$lib/components/ui/label/label.svelte";
    import { Badge } from "$lib/components/ui/badge";
    import { Separator } from "$lib/components/ui/separator";
    import { createAgreement } from "$lib/functions/create/createAgreement";

    let toolId: number | undefined = $state();
    let borrowerId: number | undefined = $state();
    let lentAt: string = $state("");
    let dueAt: string = $state("");
    let toolPageDto: ToolTrackerPageDtoToolDto | undefined = $state();
    let userPageDto: ToolTrackerPageDtoUserDto | undefined = $state();

    $effect(() => {
        (async () => {
            toolPageDto = await getTools(0, 1000, ["name,asc"], undefined, undefined, undefined, ToolDtoStatusEnum.Available);
        })();
    });

    $effect(() => {
        (async () => {
            userPageDto = await getUsers(0, 1000, ["name,asc"]);
        })();
    });

    function handleToolChange(value: string | undefined) {
        if (value && value !== "undefined") {
            toolId = parseInt(value);
        } else {
            toolId = undefined;
        }
    }

    function handleBorrowerChange(value: string | undefined) {
        if (value && value !== "undefined") {
            borrowerId = parseInt(value);
        } else {
            borrowerId = undefined;
        }
    }

    const toolOptions = $derived([
        ...(toolPageDto?.page.map((tool) => ({
            value: tool.id.toString(),
            label: `${tool.name} (${tool.serial})`
        })) ?? [])
    ]);

    const userOptions = $derived([
        ...(userPageDto?.page.map((user) => ({
            value: user.id.toString(),
            label: `${user.name}`
        })) ?? [])
    ]);

    const toolTriggerContent = $derived(
        toolOptions.find((option) => option.value === (toolId?.toString() ?? "undefined"))?.label ?? "Select tool"
    );

    const borrowerTriggerContent = $derived(
        userOptions.find((option) => option.value === (borrowerId?.toString() ?? "undefined"))?.label ?? "Select borrower"
    );

    const handleCreateAgreement = async() => {
        if (!toolId || !borrowerId || !lentAt || !dueAt) {
            alert("Please fill in all required fields.");
            return;
        }

        const createLendingAgreementDto: CreateLendingAgreementDto = {
            toolId,
            borrowerId,
            lendingStartTime: new Date(lentAt),
            expectedReturnTime: new Date(dueAt)
        };

        await createAgreement(createLendingAgreementDto);
        window.location.reload();
    };
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header Section -->
        <div class="text-center mb-8">
            <h1 class="text-4xl font-bold text-slate-900 mb-3">Create Lending Agreement</h1>
            <p class="text-lg text-slate-600">Create a new tool lending agreement</p>
            <Badge variant="secondary" class="mt-2">Agreement Creation</Badge>
        </div>

        <!-- Form Card -->
        <Card.Root class="shadow-xl border-0">
            <Card.Header class="text-center pb-6">
                <Card.Title class="text-2xl font-semibold text-slate-800">Agreement Details</Card.Title>
                <Card.Description class="text-slate-600">
                    Please fill in the required information to create the lending agreement
                </Card.Description>
            </Card.Header>
            
            <Card.Content>
                <form class="space-y-6">
                    <!-- Tool Field -->
                    <div class="space-y-3">
                        <Label for="tool" class="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            Tool 
                            <Badge variant="destructive" class="text-xs px-1 py-0">Required</Badge>
                        </Label>
                        <Select.Root type="single" value={toolId?.toString() ?? "undefined"} onValueChange={handleToolChange}>
                            <Select.Trigger class="w-full h-11">
                                {toolTriggerContent}
                            </Select.Trigger>
                            <Select.Content>
                                {#each toolOptions as option (option.value)}
                                    <Select.Item
                                        value={option.value}
                                        label={option.label}
                                    >
                                        {option.label}
                                    </Select.Item>
                                {/each}
                            </Select.Content>
                        </Select.Root>
                    </div>

                    <Separator />

                    <!-- Borrower Field -->
                    <div class="space-y-3">
                        <Label for="borrower" class="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            Borrower
                            <Badge variant="destructive" class="text-xs px-1 py-0">Required</Badge>
                        </Label>
                        <Select.Root type="single" value={borrowerId?.toString() ?? "undefined"} onValueChange={handleBorrowerChange}>
                            <Select.Trigger class="w-full h-11">
                                {borrowerTriggerContent}
                            </Select.Trigger>
                            <Select.Content>
                                {#each userOptions as option (option.value)}
                                    <Select.Item
                                        value={option.value}
                                        label={option.label}
                                    >
                                        {option.label}
                                    </Select.Item>
                                {/each}
                            </Select.Content>
                        </Select.Root>
                    </div>

                    <Separator />

                    <!-- Lent At Field -->
                    <div class="space-y-3">
                        <Label for="lent-at" class="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            Lent At
                            <Badge variant="destructive" class="text-xs px-1 py-0">Required</Badge>
                        </Label>
                        <Input
                            id="lent-at"
                            type="datetime-local"
                            bind:value={lentAt}
                            class="w-full h-11 text-base"
                            required
                        />
                    </div>

                    <Separator />

                    <!-- Due At Field -->
                    <div class="space-y-3">
                        <Label for="due-at" class="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            Due At
                            <Badge variant="destructive" class="text-xs px-1 py-0">Required</Badge>
                        </Label>
                        <Input
                            id="due-at"
                            type="datetime-local"
                            bind:value={dueAt}
                            class="w-full h-11 text-base"
                            required
                        />
                    </div>
                </form>
            </Card.Content>

            <Card.Footer class="flex flex-col gap-4 pt-6">
                <Button
                    onclick={handleCreateAgreement}
                    class="w-full h-12 text-base font-semibold"
                    size="lg"
                >
                    Create Agreement
                </Button>
                
                <Separator />
                
                <div class="flex items-center justify-center gap-2 text-sm text-slate-500">
                    <Badge variant="destructive" class="text-xs px-1 py-0">Required</Badge>
                    <span>fields must be completed</span>
                </div>
            </Card.Footer>
        </Card.Root>
    </div>
</div>
