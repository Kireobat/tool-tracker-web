<script lang="ts">
    import { type CreateDamageReportDto, type ToolTrackerPageDtoLendingAgreementDto, type ToolTrackerPageDtoToolDto } from "$lib/generated/tool-tracker";
    import Button from "$lib/components/ui/button/button.svelte";
    import { getAgreements } from "$lib/functions/get/getAgreements";
    import { getTools } from "$lib/functions/get/getTools";
    import * as Select from "$lib/components/ui/select/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Textarea } from "$lib/components/ui/textarea";
    import Label from "$lib/components/ui/label/label.svelte";
    import { Badge } from "$lib/components/ui/badge";
    import { Separator } from "$lib/components/ui/separator";
    import { createReport } from "$lib/functions/create/createReport";

    let lendingAgreementId: number | undefined = $state();
    let toolId: number | undefined = $state();
    let description: string = $state("");
    let agreementPageDto: ToolTrackerPageDtoLendingAgreementDto | undefined = $state();
    let toolPageDto: ToolTrackerPageDtoToolDto | undefined = $state();

    $effect(() => {
        (async () => {
            agreementPageDto = await getAgreements(0, 1000, ["id,desc"]);
        })();
    });

    $effect(() => {
        (async () => {
            toolPageDto = await getTools(0, 1000, ["name,asc"]);
        })();
    });

    function handleAgreementChange(value: string | undefined) {
        if (value && value !== "undefined") {
            lendingAgreementId = parseInt(value);
        } else {
            lendingAgreementId = undefined;
        }
    }

    function handleToolChange(value: string | undefined) {
        if (value && value !== "undefined") {
            toolId = parseInt(value);
        } else {
            toolId = undefined;
        }
    }

    const agreementOptions = $derived([
        { value: "undefined", label: "No lending agreement" },
        ...(agreementPageDto?.page.map((agreement) => ({
            value: agreement.id.toString(),
            label: `Agreement #${agreement.id} - ${agreement.tool?.name} (${agreement.borrowerId} ${agreement.borrowerId})`
        })) ?? [])
    ]);

    const toolOptions = $derived([
        { value: "undefined", label: "No specific tool" },
        ...(toolPageDto?.page.map((tool) => ({
            value: tool.id.toString(),
            label: `${tool.name} (${tool.serial})`
        })) ?? [])
    ]);

    const agreementTriggerContent = $derived(
        agreementOptions.find((option) => option.value === (lendingAgreementId?.toString() ?? "undefined"))?.label ?? "Select agreement"
    );

    const toolTriggerContent = $derived(
        toolOptions.find((option) => option.value === (toolId?.toString() ?? "undefined"))?.label ?? "Select tool"
    );

    const handleCreateReport = async() => {
        if (!description) {
            alert("Please provide a description for the damage report.");
            return;
        }

        if (!lendingAgreementId && !toolId) {
            alert("Please select either a lending agreement or a tool.");
            return;
        }

        const createDamageReportDto: CreateDamageReportDto = {
            description,
            lendingAgreementId: lendingAgreementId || undefined,
            toolId: toolId || undefined
        };

        await createReport(createDamageReportDto);
        window.location.reload();
    };
</script>

<div class="min-h-screen py-8">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header Section -->
        <div class="text-center mb-8">
            <h1 class="text-4xl font-bold  mb-3">Create Damage Report</h1>
            <p class="text-lg ">Report damage for a tool or lending agreement</p>
            <Badge variant="secondary" class="mt-2">Damage Report Creation</Badge>
        </div>

        <!-- Form Card -->
        <Card.Root class="shadow-xl border-0">
            <Card.Header class="text-center pb-6">
                <Card.Title class="text-2xl font-semibold ">Damage Report Details</Card.Title>
                <Card.Description class="">
                    Please fill in the required information to create the damage report
                </Card.Description>
            </Card.Header>
            
            <Card.Content>
                <form class="space-y-6">
                    <!-- Description Field -->
                    <div class="space-y-3">
                        <Label for="description" class="text-sm font-semibold  flex items-center gap-2">
                            Damage Description 
                            <Badge variant="destructive" class="text-xs px-1 py-0">Required</Badge>
                        </Label>
                        <Textarea
                            id="description"
                            placeholder="Describe the damage in detail (e.g., scratches, dents, broken parts)"
                            bind:value={description}
                            class="w-full min-h-[150px] text-base"
                            required
                        />
                    </div>

                    <Separator />

                    <!-- Lending Agreement Field -->
                    <div class="space-y-3">
                        <Label for="agreement" class="text-sm font-semibold  flex items-center gap-2">
                            Lending Agreement
                            <Badge variant="outline" class="text-xs px-1 py-0">Optional</Badge>
                        </Label>
                        <Select.Root type="single" value={lendingAgreementId?.toString() ?? "undefined"} onValueChange={handleAgreementChange}>
                            <Select.Trigger class="w-full h-11">
                                {agreementTriggerContent}
                            </Select.Trigger>
                            <Select.Content>
                                {#each agreementOptions as option (option.value)}
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

                    <!-- Tool Field -->
                    <div class="space-y-3">
                        <Label for="tool" class="text-sm font-semibold  flex items-center gap-2">
                            Tool
                            <Badge variant="outline" class="text-xs px-1 py-0">Optional</Badge>
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
                </form>
            </Card.Content>

            <Card.Footer class="flex flex-col gap-4 pt-6">
                <Button
                    onclick={handleCreateReport}
                    class="w-full h-12 text-base font-semibold"
                    size="lg"
                >
                    Create Damage Report
                </Button>
                
                <Separator />
                
                <div class="flex items-center justify-center gap-2 text-sm ">
                    <Badge variant="destructive" class="text-xs px-1 py-0">Required</Badge>
                    <span>fields must be completed</span>
                </div>
            </Card.Footer>
        </Card.Root>
    </div>
</div>
