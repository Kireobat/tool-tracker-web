<script lang="ts">
  import AppSidebar from "$lib/components/app-sidebar.svelte";
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";

  import { isEmployee } from "$lib/functions/auth/isEmployee";
    import { onMount } from "svelte";

  let { children } = $props();

  let isAuthorized: boolean | undefined = $state();

    onMount(async () => {
        isAuthorized = await isEmployee();
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
    <Sidebar.Provider>
      <AppSidebar />
      <Sidebar.Inset>
        <header class="flex h-16 shrink-0 items-center gap-2">
          <div class="flex items-center gap-2 px-4">
            <Sidebar.Trigger class="-ml-1" />
            <Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
            <Breadcrumb.Root>
              <Breadcrumb.List>
                <Breadcrumb.Item class="hidden md:block">
                  <Breadcrumb.Link href="#">Building Your Application</Breadcrumb.Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator class="hidden md:block" />
                <Breadcrumb.Item>
                  <Breadcrumb.Page>Data Fetching</Breadcrumb.Page>
                </Breadcrumb.Item>
              </Breadcrumb.List>
            </Breadcrumb.Root>
          </div>
        </header>
        {@render children?.()}
      </Sidebar.Inset>
    </Sidebar.Provider>
  {/if}
{/await}
