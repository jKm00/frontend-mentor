<script lang="ts">
	import { Card } from '$lib/components/ui/card';
	import FilterSection from '$lib/components/sections/FilterSection.svelte';

	export let data;

	$: ({ jobs, companies, roles, languages, tools } = data);
</script>

<header class="bg-accent">
	<img
		src="/images/bg-header-desktop.svg"
		alt="header"
		class="w-full h-full object-fill max-md:hidden"
	/>
	<img
		src="/images/bg-header-mobile.svg"
		alt="header"
		class="w-full h-full object-fill md:hidden"
	/>
</header>
<section class="flex flex-col p-10 pt-0">
	<FilterSection {companies} {roles} {languages} {tools} />
	<p class="text-sm mt-6 mb-2 max-md:mb-8">
		<span class="underline">Result:</span>
		{jobs?.length}
	</p>
	<div class="flex flex-col gap-6">
		{#if jobs && jobs.length > 0}
			{#each jobs as job}
				<Card jobApplication={job} />
			{/each}
		{:else}
			<p class="text-sm md:mt-6">No jobs found matching the current filters...</p>
		{/if}
	</div>
</section>
