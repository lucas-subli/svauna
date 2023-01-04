<script lang="ts">
	import type { Colors } from '$lib/model/common/colors';
	import { getColors } from '$lib/utils/ButtonColorBuilder';

	export let color: Colors = 'primary';
	export let disabled: boolean = false;

	const colors = getColors(color);
</script>

<button
	on:click
	class={`${colors.bg} ${colors.text} ${colors.hover.bg} ${colors.disabled.bg} ${colors.disabled.text}`}
	{disabled}
>
	<slot />
</button>

<style lang="postcss">
	button {
		@apply inline-flex items-center rounded border border-transparent px-2.5 py-1.5 text-xs font-medium;
	}
</style>
