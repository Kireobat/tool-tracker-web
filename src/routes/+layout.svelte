<script lang="ts">
  import "../app.css";
  import { ModeWatcher } from "mode-watcher";
  import Feedback from "$lib/components/feedback.svelte";
  import AppSidebar from "$lib/components/app-sidebar.svelte";
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
    import { page } from "$app/state";
    import { getProfile } from "$lib/functions/get/getProfile";
    import { user } from "$lib/functions/user.svelte";
    import { onMount } from "svelte";
  let { children } = $props();

  let breadcrumbs: {
    label: string;
    href: string;
  }[] = $state([]);

  $effect(() => {
    breadcrumbs = page.url.pathname
      .split('/')
      .filter(part => part)
      .map((part, index, array) => {
        const href = '/' + array.slice(0, index + 1).join('/');
        return { label: part.charAt(0).toUpperCase() + part.slice(1), href };
      });
  })

  const getUser = async () => {
        user.current = await getProfile();
    };

    onMount(() => {
        getUser();
    });

</script>
 
<ModeWatcher />
<Feedback />


<Sidebar.Provider>
  <AppSidebar />
  <Sidebar.Inset>
    <header class="flex h-16 shrink-0 items-center gap-2">
      <div class="flex items-center gap-2 px-4">
        <Sidebar.Trigger class="-ml-1" />
        <Separator orientation="vertical" class="mr-2 data-[orientation=vertical]:h-4" />
        <Breadcrumb.Root>
          <Breadcrumb.List>
            {#each breadcrumbs as crumb, index}
              <Breadcrumb.Item class="hidden md:block">
                <Breadcrumb.Link href={crumb.href}>
                  {crumb.label}
                </Breadcrumb.Link>
              </Breadcrumb.Item>
              {#if index < breadcrumbs.length - 1}
                <Breadcrumb.Separator class="hidden md:block" />
              {/if}
            {/each}
          </Breadcrumb.List>
        </Breadcrumb.Root>
      </div>
    </header>
    {@render children?.()}
  </Sidebar.Inset>
</Sidebar.Provider>
