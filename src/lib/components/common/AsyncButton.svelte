<script lang="ts">
	import type { Colors } from '$lib/model/common/colors';
	import { getColors } from '$lib/utils/ButtonColorBuilder';
	import Spinner from './Spinner.svelte';

	export let func: (...args: any[]) => Promise<void>;
	export let color: Colors = 'primary';

	let isLoading = false;

	const handleClick = async () => {
		isLoading = true;
		await func();
		isLoading = false;
	};

	const colors = getColors(color);
</script>

<button
	on:click={handleClick}
	disabled={isLoading}
	class={`${colors.bg} ${colors.text} ${colors.hover.bg} ${colors.disabled.bg} ${colors.disabled.text}`}
>
	<div class:invisible={isLoading} class="inline-flex items-center">
		<slot />
	</div>
	{#if isLoading}
		<Spinner class={`absolute ${colors.loader}`} />
	{/if}
</button>

<style lang="postcss">
	button {
		@apply inline-flex place-content-center items-center rounded border border-transparent px-2.5 py-1.5 text-xs font-medium;
	}
</style>
