<script lang="ts">
    import {ToolDtoStatusEnum, type RegisterToolDto, type ToolTrackerPageDtoToolTypeDto } from "$lib/generated/tool-tracker";
    import Button from "$lib/components/ui/button/button.svelte";
    import { getTypes } from "$lib/functions/get/getTypes";
    import * as Select from "$lib/components/ui/select/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import * as Form from "$lib/components/ui/form/index.js";
    import { Input } from "$lib/components/ui/input";
    import Label from "$lib/components/ui/label/label.svelte";
    import { Badge } from "$lib/components/ui/badge";
    import { Separator } from "$lib/components/ui/separator";
    import { createTool } from "$lib/functions/create/createTool";


    let name: string = $state("");
    let serial: string = $state("");
    let toolTypeId: number | undefined = $state();
    let toolTypePageDto: ToolTrackerPageDtoToolTypeDto | undefined = $state();
    let status: ToolDtoStatusEnum | undefined = $state()

    $effect(() => {
        (async () => {
            toolTypePageDto = await getTypes(0, 1000, ["name,desc"]);
        })();
    });

    function handleStatusChange(value: string | undefined) {
        if (value && value !== "undefined") {
            status = value as ToolDtoStatusEnum;
        } else {
            status = undefined;
        }
    }

    function handleToolTypeChange(value: string | undefined) {
        if (value && value !== "undefined") {
            toolTypeId = parseInt(value);
        } else {
            toolTypeId = undefined;
        }
    }

    const statusOptions = [
        ...Object.values(ToolDtoStatusEnum).map((enumValue) => ({
            value: enumValue,
            label: enumValue.charAt(0).toUpperCase() + enumValue.slice(1).toLowerCase()
        }))
    ];

    const toolTypeOptions = $derived([
        ...(toolTypePageDto?.page.map((toolType) => ({
            value: toolType.id.toString(),
            label: toolType.name.charAt(0).toUpperCase() + toolType.name.slice(1).toLowerCase()
        })) ?? [])
    ]);

    const statusTriggerContent = $derived(
        statusOptions.find((option) => option.value === (status ?? "undefined"))?.label ?? "Select status"
    );

    const toolTypeTriggerContent = $derived(
        toolTypeOptions.find((option) => option.value === (toolTypeId?.toString() ?? "undefined"))?.label ?? "Select tool type"
    );

    const handleRegisterTool = async() => {

        if (!name || !serial || !toolTypeId) {
            alert("Please fill in all required fields.");
            return;
        }

        const registerToolDto: RegisterToolDto = {
            name,
            serial,
            type: toolTypeId,
            status: status ?? ToolDtoStatusEnum.Available
        };

        await createTool(registerToolDto);

        window.location.reload();
    };

</script>

<div class="min-h-screen py-8">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-8">
            <h1 class="text-4xl font-bold mb-3">Register New Tool</h1>
            <p class="text-lg">Add a new tool to your inventory system</p>
            <Badge variant="secondary" class="mt-2">Tool Registration</Badge>
        </div>

        <Card.Root class="shadow-xl border-0">
            <Card.Header class="text-center pb-6">
                <Card.Title class="text-2xl font-semibold">Tool Details</Card.Title>
                <Card.Description>
                    Please fill in the required information to register your tool
                </Card.Description>
            </Card.Header>
            
            <Card.Content>
                <form class="space-y-6">
                    <div class="space-y-3">
                        <Label for="tool-name" class="text-sm font-semiboldflex items-center gap-2">
                            Tool Name 
                            <Badge variant="destructive" class="text-xs px-1 py-0">Required</Badge>
                        </Label>
                        <Input
                            id="tool-name"
                            type="text"
                            placeholder="Enter tool name (e.g., Drill, Hammer, Saw)"
                            bind:value={name}
                            class="w-full h-11 text-base"
                            required
                        />
                    </div>

                    <Separator />

                    <div class="space-y-3">
                        <Label for="serial-number" class="text-sm font-semiboldflex items-center gap-2">
                            Serial Number
                            <Badge variant="destructive" class="text-xs px-1 py-0">Required</Badge>
                        </Label>
                        <Input
                            id="serial-number"
                            type="text"
                            placeholder="Enter unique serial number"
                            bind:value={serial}
                            class="w-full h-11 text-base font-mono"
                            required
                        />
                    </div>

                    <Separator />

                    <div class="space-y-3">
                        <Label for="tooltype" class="text-sm font-semibold flex items-center gap-2">
                            Tool Type
                            <Badge variant="destructive" class="text-xs px-1 py-0">Required</Badge>
                        </Label>
                        <Select.Root type="single" value={toolTypeId?.toString() ?? "undefined"} onValueChange={handleToolTypeChange}>
                            <Select.Trigger class="w-full h-11">
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
                    </div>

                    <Separator />

                    <div class="space-y-3">
                        <Label for="status" class="text-sm font-semibold flex items-center gap-2">
                            Initial Status
                            <Badge variant="outline" class="text-xs px-1 py-0">Optional</Badge>
                        </Label>
                        <Select.Root type="single" value={status ?? "undefined"} onValueChange={handleStatusChange}>
                            <Select.Trigger class="w-full h-11">
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
                    </div>
                </form>
            </Card.Content>

            <Card.Footer class="flex flex-col gap-4 pt-6">
                <Button
                    onclick={handleRegisterTool}
                    class="w-full h-12 text-base font-semibold"
                    size="lg"
                >
                    Register Tool
                </Button>
                
                <Separator />
                
                <div class="flex items-center justify-center gap-2 text-sm">
                    <Badge variant="destructive" class="text-xs px-1 py-0">Required</Badge>
                    <span>fields must be completed</span>
                </div>
            </Card.Footer>
        </Card.Root>
    </div>
</div>