<script lang="ts">
	import { page } from '$app/stores';
	import '../app.css';
	import { ModeWatcher, setMode } from 'mode-watcher';
	import { onMount } from 'svelte';
	import { Toaster, toast } from 'svelte-sonner';
	import { getFlash } from 'sveltekit-flash-message/client';

	const flash = getFlash(page);

	$: if ($flash) {
		switch ($flash.type) {
			case 'success':
				toast.success($flash.message);
			case 'error':
				toast.error($flash.message);
		}

		// Clear to avoid double-toasting
		$flash = undefined;
	}

	onMount(() => {
		setMode('light');
	});
</script>

<ModeWatcher defaultMode="dark" track={false} />

<Toaster richColors position="top-center" />

<div class="width mx-auto p-4">
	<slot />
</div>

<style>
	.width {
		width: min(100%, 50rem);
	}
</style>
