<script lang="ts">
  import { onMount } from "svelte";
  import { isAdmin } from "$lib/functions/auth/isAdmin";

  let { children } = $props();

  let isAuthorized: boolean | undefined = $state();

  onMount(async () => {
      isAuthorized = await isAdmin();
      console.log(isAuthorized);
      if (!isAuthorized) {
          window.location.href = "/login";
      }
  });
  

</script>
 
{#await isAuthorized}
    <div>Loading...</div>
{:then auth}
  {#if auth === true}
    {@render children?.()}
  {/if}
{/await}
