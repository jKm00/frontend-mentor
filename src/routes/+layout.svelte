<script lang="ts">
	import { page } from '$app/stores';
	import { auth } from '$lib/auth';
	import { Button } from '$lib/components/ui/button';
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

<nav class="flex items-center justify-between bg-card p-4">
	<h1 class="font-bold uppercase">ICS</h1>
	<form method="POST" action="/logout">
		<Button type="submit">Log out</Button>
	</form>
</nav>
<div class="width mx-auto p-4">
	<slot />
</div>

<style>
	.width {
		width: min(100%, 50rem);
	}
</style>
