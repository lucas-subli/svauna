<script lang="ts">
	import type { Colors } from '$lib/model/common/colors';
	import Button from './Button.svelte';
	import Spinner from './Spinner.svelte';

	export let func: (...args: any[]) => Promise<void>;
	export let color: Colors = 'primary';

	let isLoading = false;

	const handleClick = async () => {
		isLoading = true;
		await func();
		isLoading = false;
	};
</script>

<Button on:click={handleClick} disabled={isLoading} {color} {...$$restProps}>
	<div class:invisible={isLoading} class="inline-flex items-center">
		<slot />
	</div>
	{#if isLoading}
		<Spinner class={`absolute`} />
	{/if}
</Button>
