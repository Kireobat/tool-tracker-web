<script lang="ts">
  import "../app.css";
  import { ModeWatcher } from "mode-watcher";
  import Feedback from "$lib/components/feedback.svelte";
  let { children } = $props();
</script>
 
<ModeWatcher />
<Feedback />

{@render children?.()}
