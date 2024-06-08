<script lang="ts">
	import { page } from '$app/stores';
	import { auth } from '$lib/auth';
	import { Button } from '$lib/components/ui/button';
	import { Github, LogOut } from 'lucide-svelte';
	import '../app.css';
	import { ModeWatcher, setMode } from 'mode-watcher';
	import { onMount } from 'svelte';
	import { Toaster, toast } from 'svelte-sonner';
	import { getFlash } from 'sveltekit-flash-message/client';

	$: if ($page.data.user) {
		auth?.set($page.data.user);
	} else {
		auth?.set(null);
	}

	const flash = getFlash(page);

	$: if ($flash) {
		switch ($flash.type) {
			case 'success':
				toast.success($flash.message);
				break;
			case 'error':
				toast.error($flash.message);
				break;
		}

		// Clear to avoid double-toasting
		$flash = undefined;
	}

	onMount(() => {
		setMode('light');
	});
</script>

<ModeWatcher defaultMode="dark" track={false} />

<Toaster position="top-center" richColors />

<div class="flex h-screen flex-col">
	<nav class="flex items-center justify-between bg-card p-4">
		<h1 class="font-bold uppercase">ICS</h1>
		<div class="flex items-center gap-4">
			{#if $auth !== null}
				<form method="POST" action="/logout">
					<Button type="submit"><LogOut class="mr-2 h-4 w-4" />Log out</Button>
				</form>
			{/if}
			<a
				href="https://github.com/jKm00/frontend-mentor/tree/interactive-comments-section"
				target="_blank"
				><img src="./icons/github-mark/github-mark.svg" alt="Github logo" class="h-6 w-6" /></a
			>
		</div>
	</nav>
	<div class="width mx-auto flex flex-grow flex-col p-4">
		<slot />
	</div>
</div>

<style>
	.width {
		width: min(100%, 50rem);
	}
</style>
