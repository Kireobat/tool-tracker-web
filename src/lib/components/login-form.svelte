<script lang="ts">
	import { Label } from "$lib/components/ui/label/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { cn, type WithElementRef } from "$lib/utils.js";
	import type { HTMLFormAttributes } from "svelte/elements";
    import type { LoginDto, RegisterUserDto } from "$lib/generated/tool-tracker";
    import { login } from "$lib/functions/auth/login";
    import { register } from "$lib/functions/auth/register";

	let {
		ref = $bindable(null),
		class: className,
		...restProps
	}: WithElementRef<HTMLFormAttributes> = $props();

	const id = $props.id();

	let useLoginForm = $state(true)

	let name: string = $state("");
	let email: string = $state("");
    let password: string = $state("");
	let confirmPassword: string = $state("");

	const handleLogin = async () => {
        if (email === "" || password === "") {
            alert("Please fill in all fields");
            return;
        }

        const loginDto: LoginDto = {
            email: email,
            password: password,
        };

        const res = await login(loginDto);

        if (res.success) {
            window.location.href = "/app";
        }
    };

	const handleRegister = async () => {
        if (name === "" || email === "" || password === "" || confirmPassword === "") {
            alert("Please fill in all fields");
            return;
        }

		if (password !== confirmPassword) {
			alert("Passwords do not match");
			return;
		}

		if (password.length < 8) {
			alert("Password must be at least 8 characters long");
			return;
		}

        const registerUserDto: RegisterUserDto = {
			name: name,
            email: email,
            password: password,
        };

        const res = await register(registerUserDto);

        if (res.success) {
            window.location.href = "/app";
        }
    };

</script>

<form class={cn("flex flex-col gap-6", className)} bind:this={ref} {...restProps}>
	{#if useLoginForm}
		<div class="flex flex-col items-center gap-2 text-center">
			<h1 class="text-2xl font-bold">Login to your account</h1>
			<p class="text-muted-foreground text-balance text-sm">
				Enter your email below to login to your account
			</p>
		</div>
		<div class="grid gap-6">
			<div class="grid gap-3">
				<Label for="email-{id}">Email</Label>
				<Input id="email-{id}" type="email" required bind:value={email}/>
			</div>
			<div class="grid gap-3">
				<div class="flex items-center">
					<Label for="password-{id}">Password</Label>
					<a href="##" class="ml-auto text-sm underline-offset-4 hover:underline" onclick={() => alert("too bad lol")}>
						Forgot your password?
					</a>
				</div>
				<Input id="password-{id}" type="password" required bind:value={password}/>
			</div>
			<Button type="submit" class="w-full" onclick={handleLogin}  href="javascript:void(0);">Login</Button>
		</div>
		<div class="text-center text-sm">
			Don&apos;t have an account?
			<Button onclick={()=> useLoginForm = false} variant="link" class="underline underline-offset-4"  href="javascript:void(0);"> Sign up </Button>
		</div>
	{:else}
		<div class="flex flex-col items-center gap-2 text-center">
			<h1 class="text-2xl font-bold">Register your account</h1>
			<p class="text-muted-foreground text-balance text-sm">
				Enter your info below to create your account
			</p>
		</div>
		<div class="grid gap-6">
			<div class="grid gap-3">
				<Label for="name-{id}">Name</Label>
				<Input id="name-{id}" type="text" required bind:value={name}/>
			</div>
			<div class="grid gap-3">
				<Label for="email-{id}">Email</Label>
				<Input id="email-{id}" type="email" required bind:value={email}/>
			</div>
			<div class="grid gap-3">
				<Label for="password-{id}">Password</Label>
				<Input id="password-{id}" type="password" required bind:value={password}/>
			</div>
			<div class="grid gap-3">
				<Label for="confirm-password-{id}">Confirm Password</Label>
				<Input id="confirm-password-{id}" type="password" required bind:value={confirmPassword}/>
			</div>
			<Button type="submit" class="w-full" onclick={handleRegister}  href="javascript:void(0);">Register</Button>
		</div>
		<div class="text-center text-sm">
			Already have an account?
			<Button onclick={()=> useLoginForm = true}  variant="link" class="underline underline-offset-4"  href="javascript:void(0);"> Log in </Button>
		</div>
	{/if}
</form>
