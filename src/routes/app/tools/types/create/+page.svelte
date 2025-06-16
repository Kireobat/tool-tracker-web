<script lang="ts">
    import Button from "$lib/components/ui/button/button.svelte";
    import * as Card from "$lib/components/ui/card/index.js";
    import { Input } from "$lib/components/ui/input";
    import Label from "$lib/components/ui/label/label.svelte";
    import { Badge } from "$lib/components/ui/badge";
    import { Separator } from "$lib/components/ui/separator";
    import { createType } from "$lib/functions/create/createType";

    let name: string = $state("");

    const handleCreateToolType = async() => {
        if (!name) {
            alert("Please provide a name for the tool type.");
            return;
        }


        await createType(name);
        window.location.reload();
    };
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8">
    <div class="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Header Section -->
        <div class="text-center mb-8">
            <h1 class="text-4xl font-bold text-slate-900 mb-3">Create Tool Type</h1>
            <p class="text-lg text-slate-600">Create a new tool type category</p>
            <Badge variant="secondary" class="mt-2">Tool Type Creation</Badge>
        </div>

        <!-- Form Card -->
        <Card.Root class="shadow-xl border-0">
            <Card.Header class="text-center pb-6">
                <Card.Title class="text-2xl font-semibold text-slate-800">Tool Type Details</Card.Title>
                <Card.Description class="text-slate-600">
                    Please fill in the required information to create the tool type
                </Card.Description>
            </Card.Header>
            
            <Card.Content>
                <form class="space-y-6">
                    <!-- Name Field -->
                    <div class="space-y-3">
                        <Label for="name" class="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            Tool Type Name 
                            <Badge variant="destructive" class="text-xs px-1 py-0">Required</Badge>
                        </Label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Enter tool type name (e.g., Power Tools, Hand Tools, Measuring Tools)"
                            bind:value={name}
                            class="w-full h-11 text-base"
                            required
                        />
                    </div>
                </form>
            </Card.Content>

            <Card.Footer class="flex flex-col gap-4 pt-6">
                <Button
                    onclick={handleCreateToolType}
                    class="w-full h-12 text-base font-semibold"
                    size="lg"
                >
                    Create Tool Type
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