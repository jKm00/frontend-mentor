<script lang="ts">
	import type { JobApplication } from '$lib/types';
	import { Tag } from '$lib/components/tag';

	export let jobApplication: JobApplication;
</script>

<div
	class="card flex md:items-center gap-4 bg-card relative shadow-lg rounded p-4 max-md:p-8 max-md:flex-col"
	style={jobApplication.featured ? '--background-color: hsl(var(--accent))' : ''}
>
	<img
		class="max-md:absolute max-md:-translate-y-[55px] w-14"
		src={jobApplication.logo}
		alt={`${jobApplication.company}'s logo`}
	/>
	<!-- Body -->
	<div
		class="flex-grow flex max-md:flex-col max-md:gap-8 max-md:mt-4 md:items-center justify-between"
	>
		<!-- Info -->
		<div class="flex flex-col max-md:gap-4">
			<div class="flex gap-4 items-center">
				<h1 class="text-accent font-bold">{jobApplication.company}</h1>
				<div class="text-sm">
					{#if jobApplication.new}
						<span class="bg-accent text-accent-foreground rounded-full py-1 px-2">NEW!</span>
					{/if}
					{#if jobApplication.featured}
						<span class="bg-foreground text-background rounded-full py-1 px-2">FEATURED</span>
					{/if}
				</div>
			</div>
			<h2 class="font-bold">{jobApplication.position}</h2>
			<div class="flex gap-2 text-gray-500">
				<p>{jobApplication.postedAt}</p>
				<span>•</span>
				<p>{jobApplication.contract}</p>
				<span>•</span>
				<p>{jobApplication.location}</p>
			</div>
		</div>
		<span class="h-[1px] bg-gray-300"></span>
		<!-- Tags -->
		<div>
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
