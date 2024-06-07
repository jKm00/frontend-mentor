<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input/index.js';
</script>

<div class="grid h-screen place-content-center">
	<h1 class="mb-4 text-center text-3xl font-bold">Login</h1>
	<form method="POST" action="?/login" use:enhance class="width grid gap-4">
		<label for="username" class="sr-only text-sm"> Username</label>
		<Input id="username" name="username" placeholder="myusername" class="bg-card" />
		<Button type="submit">Login</Button>
	</form>
</div>

<style scoped>
	.width {
		width: min(400px, 95vw);
	}
</style>
