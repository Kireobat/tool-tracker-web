<script lang="ts">
    import { type CreateFeeDto, type ToolTrackerPageDtoLendingAgreementDto, FeeDtoStatusEnum } from "$lib/generated/tool-tracker";
    import Button from "$lib/components/ui/button/button.svelte";
    import { getAgreements } from "$lib/functions/get/getAgreements";
    import * as Select from "$lib/components/ui/select/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Input } from "$lib/components/ui/input";
    import Label from "$lib/components/ui/label/label.svelte";
    import { Badge } from "$lib/components/ui/badge";
    import { Separator } from "$lib/components/ui/separator";
    import { createFee } from "$lib/functions/create/createFee";
    import Textarea from "$lib/components/ui/textarea/textarea.svelte";

    let lendingAgreementId: number | undefined = $state();
    let feeAmount: number | undefined = $state();
    let reason: string = $state("");
    let agreementPageDto: ToolTrackerPageDtoLendingAgreementDto | undefined = $state();

    $effect(() => {
        (async () => {
            agreementPageDto = await getAgreements(0, 1000, ["id,desc"]);
        })();
    });

    function handleAgreementChange(value: string | undefined) {
        if (value && value !== "undefined") {
            lendingAgreementId = parseInt(value);
        } else {
            lendingAgreementId = undefined;
        }
    }

    const agreementOptions = $derived([
        ...(agreementPageDto?.page.map((agreement) => ({
            value: agreement.id.toString(),
            label: `Agreement #${agreement.id} - ${agreement.tool?.name} (${agreement.borrowerId} ${agreement.borrowerId})`
        })) ?? [])
    ]);

    const agreementTriggerContent = $derived(
        agreementOptions.find((option) => option.value === (lendingAgreementId?.toString() ?? "undefined"))?.label ?? "Select agreement"
    );

    const handleCreateFee = async() => {
        if (!lendingAgreementId || !feeAmount || !reason) {
            alert("Please fill in all required fields.");
            return;
        }

        const createFeeDto: CreateFeeDto = {
            lendingAgreementId,
            feeAmount,
            reason
        };

        await createFee(createFeeDto);
        window.location.reload();
    };
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header Section -->
        <div class="text-center mb-8">
            <h1 class="text-4xl font-bold text-slate-900 mb-3">Create Fee</h1>
            <p class="text-lg text-slate-600">Create a new fee for a lending agreement</p>
            <Badge variant="secondary" class="mt-2">Fee Creation</Badge>
        </div>

        <!-- Form Card -->
        <Card.Root class="shadow-xl border-0">
            <Card.Header class="text-center pb-6">
                <Card.Title class="text-2xl font-semibold text-slate-800">Fee Details</Card.Title>
                <Card.Description class="text-slate-600">
                    Please fill in the required information to create the fee
                </Card.Description>
            </Card.Header>
            
            <Card.Content>
                <form class="space-y-6">
                    <!-- Lending Agreement Field -->
                    <div class="space-y-3">
                        <Label for="agreement" class="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            Lending Agreement 
                            <Badge variant="destructive" class="text-xs px-1 py-0">Required</Badge>
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

                    <!-- Fee Amount Field -->
                    <div class="space-y-3">
                        <Label for="fee-amount" class="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            Fee Amount
                            <Badge variant="destructive" class="text-xs px-1 py-0">Required</Badge>
                        </Label>
                        <Input
                            id="fee-amount"
                            type="number"
                            step="1"
                            min="0"
                            placeholder="Enter fee amount"
                            bind:value={feeAmount}
                            class="w-full h-11 text-base"
                            required
                        />
                    </div>

                    <Separator />

                    <!-- Status Field -->
                    <div class="space-y-3">
                        <Label for="reason" class="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            Reason
                            <Badge variant="destructive" class="text-xs px-1 py-0">Required</Badge>
                        </Label>
                        <Textarea
                            id="reason"
                            bind:value={reason}
                            class="w-full h-11 text-base"
                            required
                        />
                    </div>
                </form>
            </Card.Content>

            <Card.Footer class="flex flex-col gap-4 pt-6">
                <Button
                    onclick={handleCreateFee}
                    class="w-full h-12 text-base font-semibold"
                    size="lg"
                >
                    Create Fee
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
