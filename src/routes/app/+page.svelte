<script>
    import Button from "$lib/components/ui/button/button.svelte";
    import { addFeedback } from "$lib/functions/feedback.svelte";

    function handleClick() {
        addFeedback({
                title: "Longer error message",
                message: "test",
                type: "error"
            });
    }
</script>
<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation</p>


<Button onclick={handleClick}>Test feedback</Button>