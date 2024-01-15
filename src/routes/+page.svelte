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
<section class="flex flex-col gap-10 p-10">
	<FilterSection {companies} {roles} {languages} {tools} />
	{#if jobs && jobs.length > 0}
		{#each jobs as job}
			<Card jobApplication={job} />
		{/each}
	{:else}
		<p class="text-center text-sm">No jobs found matching the current filters...</p>
	{/if}
</section>
