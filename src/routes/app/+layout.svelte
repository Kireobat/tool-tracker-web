<script lang="ts">
  import { isEmployee } from "$lib/functions/auth/isEmployee";
  import { onMount } from "svelte";

  let { children } = $props();

  let isAuthorized: boolean | undefined = $state();

  onMount(async () => {
      isAuthorized = await isEmployee();
  });
</script>
 
{#await isAuthorized}
    <div>Loading...</div>
{:then auth}
  {#if auth === true}
    {@render children?.()}
  {/if}
{/await}
