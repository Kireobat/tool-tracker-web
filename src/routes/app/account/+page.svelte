<script lang="ts">
    import * as Tabs from "$lib/components/ui/tabs/index.js";
    import * as Card from "$lib/components/ui/card/index.js";
    import Button from "$lib/components/ui/button/button.svelte";
    import Input from "$lib/components/ui/input/input.svelte";
    import { user } from "$lib/functions/user.svelte";
    import type { UserDto } from "$lib/generated/tool-tracker";
    import Label from "$lib/components/ui/label/label.svelte";

    let name: string | undefined = $state(user.current?.name || undefined);
    let email: string | undefined = $state(user.current?.email || undefined);
    let password: string = $state("");
    let confirmPassword: string = $state("");

</script>

<div class="ml-4">
    <Tabs.Root value="account" class="w-[400px]">
        <Tabs.List>
            <Tabs.Trigger value="account">Account</Tabs.Trigger>
            <Tabs.Trigger value="password">Password</Tabs.Trigger>
            <Tabs.Trigger value="data">Data</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="account">
            <Card.Root>
                <Card.Header>
                    <Card.Title>Your account</Card.Title>
                    <Card.Description>Change information related to your account</Card.Description>
                </Card.Header>
                <Card.Content>
                    <Label class="mb-2" for="name">Name</Label>
                    <Input
                        type="text"
                        class="mb-4"
                        bind:value={name}
                        />
                    <Label class="mb-2" for="email">Email</Label>
                    <Input
                        type="email"
                        class="mb-4"
                        bind:value={email}
                        />
                </Card.Content>
                <Card.Footer>
                    <Button
                        variant="default"
                        class="w-full"
                        onclick={() => {
                            alert("Account changes saved!");
                        }}>
                        Save Changes
                    </Button>
                </Card.Footer>
            </Card.Root>
        </Tabs.Content>
        <Tabs.Content value="password">
            <Card.Root>
                <Card.Header>
                    <Card.Title>Change passord</Card.Title>
                    <Card.Description>Change your password</Card.Description>
                </Card.Header>
                <Card.Content>
                    <Label class="mb-2" for="password">Password</Label>
                    <Input
                        type="password"
                        class="mb-4"
                        bind:value={password}
                        />
                    <Label class="mb-2" for="confirm-password">Confirm Password</Label>
                    <Input
                        type="password"
                        class="mb-4"
                        bind:value={confirmPassword}
                        />
                </Card.Content>
                <Card.Footer>
                    <Button
                        variant="default"
                        class="w-full"
                        onclick={() => {
                            alert("Password changes saved!");
                        }}>
                        Save Changes
                    </Button>
                </Card.Footer>
            </Card.Root>
        </Tabs.Content>
        <Tabs.Content value="data">
            <Card.Root>
                <Card.Header>
                    <Card.Title>Your data</Card.Title>
                    <Card.Description>Manage data related to your account</Card.Description>
                </Card.Header>
                <Card.Content>
                    <div class="flex flex-col gap-4">
                        <Label class="mb-2">Export data</Label>
                        <Button
                            variant="secondary"
                            class="w-full"
                            onclick={() => {
                                alert("Data export requested!");
                            }}>
                            Request Data Export
                        </Button>
                        <Label class="mb-2">Delete your account</Label>
                        <Button
                            variant="destructive"
                            class="w-full"
                            onclick={() => {
                                alert("Account deletion requested!");
                            }}>
                            Delete Account
                        </Button>
                    </div>
                </Card.Content>
            </Card.Root>
        </Tabs.Content>
    </Tabs.Root>
</div>