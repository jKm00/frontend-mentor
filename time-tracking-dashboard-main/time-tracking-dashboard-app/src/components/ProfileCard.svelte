<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Buttons } from '../types/Buttons';

	const dispatch = createEventDispatcher<{
		update: { value: Buttons };
	}>();

	let activeButton = Buttons.DAILY;

	$: dispatch('update', {
		value: activeButton
	});
</script>

<div class="bg-dark-blue rounded-xl">
	<div class="bg-desaturated-blue rounded-xl flex items-center gap-4 p-8">
		<img
			class="border-2 border-white rounded-full w-14"
			src="image-jeremy.png"
			alt="Jeremy Robson"
		/>
		<div>
			<label for="name" class="text-pale-blue text-sm">Report for</label>
			<h1 id="name" class="text-white text-2xl">Jeremy Robson</h1>
		</div>
	</div>
	<ul class="rounded-xl flex justify-around py-4">
		<li>
			<button
				class={activeButton === Buttons.DAILY ? 'text-white' : 'text-desaturated-blue'}
				on:click={() => (activeButton = Buttons.DAILY)}>Daily</button
			>
		</li>
		<li>
			<button
				class={activeButton === Buttons.WEEKLY ? 'text-white' : 'text-desaturated-blue'}
				on:click={() => (activeButton = Buttons.WEEKLY)}>Weekly</button
			>
		</li>
		<li>
			<button
				class={activeButton === Buttons.MONTHLY ? 'text-white' : 'text-desaturated-blue'}
				on:click={() => (activeButton = Buttons.MONTHLY)}>Monthly</button
			>
		</li>
	</ul>
</div>
