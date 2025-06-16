<script lang="ts">
    import * as Alert from "$lib/components/ui/alert/index.js";
    import { Progress } from "$lib/components/ui/progress/index.js";
    import CircleAlertIcon from "@lucide/svelte/icons/circle-alert";
    import TriangleAlertIcon from "@lucide/svelte/icons/triangle-alert";
    import InfoIcon from "@lucide/svelte/icons/info";
    import CircleCheckIcon from "@lucide/svelte/icons/circle-check";
    import Trash2Icon from "@lucide/svelte/icons/trash-2";
    import Button from "./ui/button/button.svelte";
    import { feedback, removeFeedback } from "$lib/functions/feedback.svelte";

    interface Props {
        index: number;
        element: Feedback
    }

    let { element}: Props = $props();

    const UPDATE_INTERVAL: number = 100;
    const MAX_TIME: number = 7000; // Maximum time in milliseconds

    let progress: number = $state(100);
    let isPaused: boolean = $state(false);

    const startTime = Date.now();
    let pausedTime = 0;
    let pauseStartTime = 0;

    /*
    const progressInterval = setInterval(() => {
        if (isPaused) return;
        
        const elapsed = Date.now() - startTime - pausedTime;
        const remaining = Math.max(0, MAX_TIME - elapsed);
        progress = (remaining / MAX_TIME) * 100;
    }, UPDATE_INTERVAL);
    */

    function removeElement() {
        removeFeedback(element.id);
        //clearInterval(progressInterval);
    }

    function pauseTimer() {
        if (!isPaused) {
            isPaused = true;
            pauseStartTime = Date.now();
        }
    }

    function resumeTimer() {
        if (isPaused) {
            pausedTime += Date.now() - pauseStartTime;
            isPaused = false;
        }
    }

    $effect(() => {
        if (progress <= 0) {
            removeElement();
        }
    });

    /*$effect(() => {
        return () => clearInterval(progressInterval);
    });*/
</script>

<Alert.Root 
    variant={element.type === "error" ? "destructive" : "default"}
    onmouseenter={pauseTimer}
    onmouseleave={resumeTimer}
    class="relative"
>
    {#if element.type === "error"}
        <CircleAlertIcon class="size-4"/>
    {:else if element.type === "warn"}
        <TriangleAlertIcon class="size-4 text-yellow-500"/>
    {:else if element.type === "info"}
        <InfoIcon class="size-4 text-blue-500"/>
    {:else if element.type === "success"}
        <CircleCheckIcon class="size-4 text-green-500"/>
    {/if}

    <Button
        variant="ghost"
        size="icon"
        class="absolute top-2 right-2"
        onclick={removeElement}
    >
        <Trash2Icon class="size-4"/>
    </Button>
    <Alert.Title class="mr-8">
        {element.title}
    </Alert.Title>
    
    <Alert.Description>
        {element.message}
    </Alert.Description>
    
    <!-- Progress bar showing time remaining -->
    <Progress 
        value={progress} 
        max={100} 
        class="absolute w-full mt-2 h-1" 
    />
</Alert.Root>