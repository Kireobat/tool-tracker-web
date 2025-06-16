<script lang="ts">
    import { type CreateToolServiceEventDto, type ToolTrackerPageDtoDamageReportDto } from "$lib/generated/tool-tracker";
    import Button from "$lib/components/ui/button/button.svelte";
    import { getReports } from "$lib/functions/get/getReports";
    import * as Select from "$lib/components/ui/select/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Input } from "$lib/components/ui/input";
    import Label from "$lib/components/ui/label/label.svelte";
    import { Badge } from "$lib/components/ui/badge";
    import { Separator } from "$lib/components/ui/separator";
    import { createToolServiceEvent } from "$lib/functions/create/createToolServiceEvent";

    let damageReportId: number | undefined = $state();
    let serviceStartTime: string = $state("");
    let serviceStopTime: string = $state("");
    let reportPageDto: ToolTrackerPageDtoDamageReportDto | undefined = $state();

    $effect(() => {
        (async () => {
            reportPageDto = await getReports(0, 1000, ["id,desc"]);
        })();
    });

    function handleReportChange(value: string | undefined) {
        if (value && value !== "undefined") {
            damageReportId = parseInt(value);
        } else {
            damageReportId = undefined;
        }
    }

    const reportOptions = $derived([
        ...(reportPageDto?.page.map((report) => ({
            value: report.id.toString(),
            label: `Report #${report.id} - ${report.description?.substring(0, 50)}...`
        })) ?? [])
    ]);

    const reportTriggerContent = $derived(
        reportOptions.find((option) => option.value === (damageReportId?.toString() ?? "undefined"))?.label ?? "Select damage report"
    );

    const handleCreateServiceEvent = async() => {
        if (!damageReportId) {
            alert("Please select a damage report.");
            return;
        }

        const createToolServiceEventDto: CreateToolServiceEventDto = {
            damageReportId,
            serviceStartTime: serviceStartTime ? new Date(serviceStartTime) : undefined,
            serviceStopTime: serviceStopTime ? new Date(serviceStopTime) : undefined
        };

        await createToolServiceEvent(createToolServiceEventDto);
        window.location.reload();
    };
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header Section -->
        <div class="text-center mb-8">
            <h1 class="text-4xl font-bold text-slate-900 mb-3">Create Service Event</h1>
            <p class="text-lg text-slate-600">Create a new tool service event</p>
            <Badge variant="secondary" class="mt-2">Service Event Creation</Badge>
        </div>

        <!-- Form Card -->
        <Card.Root class="shadow-xl border-0">
            <Card.Header class="text-center pb-6">
                <Card.Title class="text-2xl font-semibold text-slate-800">Service Event Details</Card.Title>
                <Card.Description class="text-slate-600">
                    Please fill in the required information to create the service event
                </Card.Description>
            </Card.Header>
            
            <Card.Content>
                <form class="space-y-6">
                    <!-- Damage Report Field -->
                    <div class="space-y-3">
                        <Label for="damage-report" class="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            Damage Report 
                            <Badge variant="destructive" class="text-xs px-1 py-0">Required</Badge>
                        </Label>
                        <Select.Root type="single" value={damageReportId?.toString() ?? "undefined"} onValueChange={handleReportChange}>
                            <Select.Trigger class="w-full h-11">
                                {reportTriggerContent}
                            </Select.Trigger>
                            <Select.Content>
                                {#each reportOptions as option (option.value)}
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

                    <!-- Service Start Time Field -->
                    <div class="space-y-3">
                        <Label for="service-start-time" class="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            Service Start Time
                            <Badge variant="outline" class="text-xs px-1 py-0">Optional</Badge>
                        </Label>
                        <Input
                            id="service-start-time"
                            type="datetime-local"
                            bind:value={serviceStartTime}
                            class="w-full h-11 text-base"
                        />
                    </div>

                    <Separator />

                    <!-- Service Stop Time Field -->
                    <div class="space-y-3">
                        <Label for="service-stop-time" class="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            Service Stop Time
                            <Badge variant="outline" class="text-xs px-1 py-0">Optional</Badge>
                        </Label>
                        <Input
                            id="service-stop-time"
                            type="datetime-local"
                            bind:value={serviceStopTime}
                            class="w-full h-11 text-base"
                        />
                    </div>
                </form>
            </Card.Content>

            <Card.Footer class="flex flex-col gap-4 pt-6">
                <Button
                    onclick={handleCreateServiceEvent}
                    class="w-full h-12 text-base font-semibold"
                    size="lg"
                >
                    Create Service Event
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
