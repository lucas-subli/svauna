<script>
	import '../app.css';
  import { navigating } from '$app/stores';
  import { Notification } from '$lib/components/common';
  import PreloadingIndicator from '$lib/components/common/PreloadingIndicator.svelte';
</script>

<svelte:head>
	<title>Svauna - The new stack ?</title>
	<meta
		name="description"
		content="Svauna is a playground built by using Svelte and FaunaDB, just for the fun of it."
	/>
</svelte:head>

{#if $navigating}
	<PreloadingIndicator />
{/if}

<slot />

<Notification />
