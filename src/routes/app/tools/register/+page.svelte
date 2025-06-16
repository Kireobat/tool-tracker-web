<script lang="ts">
    import {ToolDtoStatusEnum, type RegisterToolDto, type ToolTrackerPageDtoToolTypeDto } from "$lib/generated/tool-tracker";
    import Button from "$lib/components/ui/button/button.svelte";
    import { getTypes } from "$lib/functions/get/getTypes";
    import * as Select from "$lib/components/ui/select/index.js";
    import { Input } from "$lib/components/ui/input";
    import Label from "$lib/components/ui/label/label.svelte";
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
        { value: "undefined", label: "Default (Available)" },
        ...Object.values(ToolDtoStatusEnum).map((enumValue) => ({
            value: enumValue,
            label: enumValue.charAt(0).toUpperCase() + enumValue.slice(1).toLowerCase()
        }))
    ];

    const toolTypeOptions = $derived([
        { value: "undefined", label: "All Types" },
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


<div>
    <h1>Register tool</h1>
    <p>Register a new tool in the system.</p>

    <Input
        type="text"
        placeholder="Tool Name"
        bind:value={name}
        class="mb-4"/>
    <Input
        type="text"
        placeholder="Serial Number"
        bind:value={serial}
        class="mb-4"/>
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
    <Button
        onclick={handleRegisterTool}
        class="mt-4">
        Register Tool
    </Button>
</div>