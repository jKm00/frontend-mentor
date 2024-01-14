<script lang="ts">
	import type { JobApplication } from '$lib/types';
	import { Tag } from '$lib/components/tag';

	export let jobApplication: JobApplication;
</script>

<div
	class="card flex flex-col md:flex-row md:items-center gap-4 bg-card relative p-4 pt-0 shadow-lg rounded"
	style={jobApplication.featured ? '--background-color: hsl(var(--accent))' : ''}
>
	<img
		class="max-md:absolute max-md:-translate-y-1/2 w-14"
		src={jobApplication.logo}
		alt={`${jobApplication.company}'s logo`}
	/>
	<div class="flex flex-col gap-4 md:gap-1">
		<div class="flex gap-8 max-md:mt-10">
			<h1 class="text-accent font-bold">{jobApplication.company}</h1>
			<div>
				{#if jobApplication.new}
					<span class="bg-accent text-accent-foreground rounded-full text-sm py-1 px-2">NEW!</span>
				{/if}
				{#if jobApplication.featured}
					<span class="bg-foreground text-white rounded-full text-sm py-1 px-2">FEATURED</span>
				{/if}
			</div>
		</div>
		<h2 class="font-bold">{jobApplication.position}</h2>
		<div class="flex gap-2 text-gray-500">
			<span class="dot">{jobApplication.postedAt}</span>
			<span>•</span>
			<span class="dot">{jobApplication.contract}</span>
			<span>•</span>
			<span>{jobApplication.location}</span>
		</div>
	</div>
	<span class="bg-foreground h-[1px] opacity-50 md:hidden"></span>
	<div class="flex flex-wrap gap-4">
		<Tag>{jobApplication.role}</Tag>
		<Tag>{jobApplication.level}</Tag>
		{#each jobApplication.languages as language}
			<Tag>{language}</Tag>
		{/each}
		{#each jobApplication.tools as tool}
			<Tag>{tool}</Tag>
		{/each}
	</div>
</div>

<style>
	.card::before {
		content: '';
		position: absolute;
		display: block;
		top: 0;
		bottom: 0;
		left: 0;
		width: 5px;
		background-color: var(--background-color, transparent);
		border-radius: 0.25rem 0 0 0.25rem;
	}
</style>
