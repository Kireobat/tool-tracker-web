<script lang="ts">
	import GalleryVerticalEndIcon from "@lucide/svelte/icons/gallery-vertical-end";
	import LoginForm from "$lib/components/login-form.svelte";
</script>

<div class="grid min-h-svh lg:grid-cols-2">
	<div class="flex flex-col gap-4 p-6 md:p-10">
		<div class="flex justify-center gap-2 md:justify-start">
			<a href="##" class="flex items-center gap-2 font-medium">
				<div
					class="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md"
				>
					<GalleryVerticalEndIcon class="size-4" />
				</div>
				Tool Tracker
			</a>
		</div>
		<div class="flex flex-1 items-center justify-center">
			<div class="w-full max-w-xs">
				<LoginForm />
			</div>
		</div>
	</div>
	<div class="bg-muted relative hidden lg:block">
		<img
			src="/toolTrackerLogoNoBg.png"
			alt="Tool Tracker Logo"
			class="absolute dark:brightness-[0.5] dark:grayscale z-50 scale-150 left-0 right-0 m-auto top-1/7"
		/>
		<img
			src="/ivana-cajina-dnL6ZIpht2s-unsplash.jpg"
			alt="A happy woman wearing a gray hoodie"
			class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.5] dark:grayscale"
		/>
		Photo by <a href="https://unsplash.com/@von_co?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Ivana Cajina</a> on <a href="https://unsplash.com/photos/smiling-woman-wearing-gray-hoodie-dnL6ZIpht2s?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
	</div>
</div>
