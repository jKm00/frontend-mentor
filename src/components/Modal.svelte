<script lang="ts">
	export let showModal: boolean;

	let dialog: HTMLDialogElement;

	$: if (dialog && showModal) dialog.showModal();

	$: if (dialog && !showModal) dialog.close();
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<dialog
	bind:this={dialog}
	on:close={() => (showModal = false)}
	on:click|self={() => dialog.close()}
>
	<div on:click|stopPropagation>
		<slot />
	</div>
</dialog>

<style scoped>
	dialog {
		max-width: 50em;
		border-radius: 0.2em;
		border: none;
		padding: 0;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: var(--clr-el);
	}

	dialog::backdrop {
		background: rgba(0, 0, 0, 0.3);
	}

	dialog[open] {
		animation: zoom 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	@keyframes zoom {
		from {
			transform: scale(0.95) translate(-50%, -50%);
		}
		to {
			transform: scale(1) translate(-50%, -50%);
		}
	}

	dialog[open]::backdrop {
		animation: fade 0.2s ease-out;
	}

	@keyframes fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
