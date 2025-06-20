<script lang="ts">
    import { page } from '$app/state';
    import Button from '$lib/components/ui/button/button.svelte';
    import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '$lib/components/ui/card';
    import { Badge } from '$lib/components/ui/badge';
    import { Separator } from '$lib/components/ui/separator';
    import { onMount } from 'svelte';
    import HouseIcon from '@lucide/svelte/icons/house';
    import ArrowLeftIcon from '@lucide/svelte/icons/arrow-left';
    import KeyRoundIcon from '@lucide/svelte/icons/key-round';
    import TriangleAlertIcon from '@lucide/svelte/icons/triangle-alert';
    import FileXIcon from '@lucide/svelte/icons/file-x';
    import LockIcon from '@lucide/svelte/icons/lock';
    import ZapIcon from '@lucide/svelte/icons/zap';
    import ShieldXIcon from '@lucide/svelte/icons/shield-x';

    let mounted = $state(false);

    onMount(() => {
        mounted = true;
    });

    function goBack() {
        if (typeof window !== 'undefined') {
            window.history.back();
        }
    }

    const errorCode = $derived(parseInt(page.url.searchParams.get('status') || '500'));
    const errorMessage = $derived(page.url.searchParams.get('message') || 'Something went wrong');

    const errorIcon = $derived(() => {
        switch (errorCode) {
            case 401: return ShieldXIcon;
            case 403: return LockIcon;
            case 404: return FileXIcon;
            case 500: return ZapIcon;
            default: return TriangleAlertIcon;
        }
    });

    const errorVariant = $derived(() => {
        switch (errorCode) {
            case 401: return 'destructive';
            case 403: return 'destructive';
            case 404: return 'secondary';
            case 500: return 'destructive';
            default: return 'outline';
        }
    });
</script>

<div class="min-h-screen flex items-center justify-center p-6 bg-background transition-opacity duration-500 {mounted ? 'opacity-100' : 'opacity-0'}">
    <Card class="max-w-md w-full">
        <CardHeader class="text-center space-y-4">
            <div class="flex justify-center">
                <Badge variant={errorVariant()} class="text-lg px-3 py-1">
                    {@const IconComponent = errorIcon()}
                    <IconComponent class="scale-150" />
                    Error {errorCode}
                </Badge>
            </div>
            
            <CardTitle class="text-2xl">
                {#if errorCode === 401}
                    Unauthorized
                {:else if errorCode === 403}
                    Access forbidden
                {:else if errorCode === 404}
                    Page not found
                {:else if errorCode === 500}
                    Internal server error
                {:else}
                    Something went wrong
                {/if}
            </CardTitle>
            
            <CardDescription class="text-base">
                {errorMessage}
            </CardDescription>
        </CardHeader>

        <Separator />

        <CardContent class="pt-6">
            <div class="flex flex-col sm:flex-row gap-3 justify-center">
                <Button href="/" variant="default" class="flex items-center gap-2">
                    <HouseIcon class="w-4 h-4" />
                    Go home
                </Button>
                
                <Button onclick={goBack} variant="secondary" class="flex items-center gap-2">
                    <ArrowLeftIcon class="w-4 h-4" />
                    Go back
                </Button>

                {#if errorCode === 401}
                    <Button href="/login" variant="secondary" class="flex items-center gap-2">
                        <KeyRoundIcon class="w-4 h-4" />
                        Login
                    </Button>
                {/if}
            </div>
        </CardContent>
    </Card>
</div>