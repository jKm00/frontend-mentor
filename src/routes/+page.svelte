<script lang="ts">
	import { Card } from '$lib/components/card';

	export let data;

	$: ({ jobs } = data);
</script>

<section class="flex flex-col gap-10 p-10">
	{#if jobs}
		{#each jobs as job}
			<Card jobApplication={job} />
		{/each}
	{/if}
</section>
