<script lang="ts">
    import { feedback } from "$lib/functions/feedback.svelte";
    import FeedbackElement from "./feedbackElement.svelte";
</script>

<div class="absolute bottom-0 right-0 p-4 flex flex-col gap-4 z-[1000]">
    {#each feedback.current as element, index}
        <FeedbackElement  {element} {index} />
    {/each}
</div>
