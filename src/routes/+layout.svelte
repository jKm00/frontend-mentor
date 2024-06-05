<script lang="ts">
	import '../app.css';
</script>

<div class="width mx-auto p-4">
	<slot />
</div>

<style>
	.width {
		width: min(100%, 50rem);
	}
</style>
