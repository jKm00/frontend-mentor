<script lang="ts">
	export let label: string;
	export let value: number;
	export let previous: number;
	export let bg: string;
</script>

<div class={`bg-${bg} text-white rounded-xl min-w-full relative pt-8 overflow-hidden group`}>
	<div class="absolute -top-4 right-4">
		<slot />
	</div>
	<div
		class="bg-dark-blue rounded-xl p-8 flex justify-between relative z-10 group-hover:bg-desaturated-blue transition-colors"
	>
		<div>
			<label class="font-black text-sm" for="value">{label}</label>
			<p class="text-2xl font-light" id="value">{value}hrs</p>
		</div>
		<div
			class="text-desaturated-blue fill-desaturated-blue grid justify-items-end group-hover:text-white"
		>
			<svg class="w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"
				><!--! Font Awesome Pro 6.3.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path
					d="M0 256a56 56 0 1 1 112 0A56 56 0 1 1 0 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"
				/></svg
			>
			<p>Last week - {previous}hrs</p>
		</div>
	</div>
</div>
