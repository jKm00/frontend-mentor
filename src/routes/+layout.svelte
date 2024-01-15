<script lang="ts">
	import '../app.css';
</script>

<svelte:head>
	<title>Frontend Mentor | Job Listings</title>
	<link rel="icon" type="image/png" sizes="32x32" href="/icons/favicon-32x32.png" />
</svelte:head>

<div class="bg-background">
	<slot />
</div>

<footer class="my-4">
	<p class="text-sm text-center opacity-75">
		<a href="https://edvardsen.dev/" class="hover:underline">Joakim Edvardsen</a>
		&copy; 2024. All rights reserved.
	</p>
</footer>
