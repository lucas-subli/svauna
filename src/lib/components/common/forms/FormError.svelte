<script lang='ts'>
	import { quintOut } from 'svelte/easing';
	import { fade } from 'svelte/transition';
	export let errors: string[] = [];
	export let warnings: string[] = [];
	export let formError = false;
	$: errorMessage = errors ? errors[0] : undefined;
	$: warningMessage = warnings ? warnings[0] : undefined;
	$: currentMessage = errorMessage ? errorMessage : warningMessage ? warningMessage : undefined;
</script>

{#if currentMessage}
	<p
		transition:fade={{ duration: 300, easing: quintOut }}
		class:block={formError}
		class:error={errorMessage}
		class:warning={warningMessage && !errorMessage}
		{...$$restProps}
	>
		{currentMessage}
	</p>
{/if}

<style lang='postcss'>
	.warning {
		@apply text-warning-dark text-xs;
	}
	.warning.block {
		@apply bg-warning my-8 rounded-sm py-3 px-4 text-center text-sm;
	}
	.error {
		@apply text-danger-dark text-xs;
	}
	.error.block {
		@apply bg-danger my-8 rounded-sm py-3 px-4 text-center text-sm;
	}
</style>
