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

<div class="width mx-auto p-4">
	<slot />
</div>

<style>
	.width {
		width: min(100%, 50rem);
	}
</style>
