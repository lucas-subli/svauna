<script lang="ts">
	import type { Colors } from '$lib/model/common/colors';

	export let color: Colors = 'primary';
	export let disabled: boolean = false;
</script>

<button on:click class={color} {disabled} {...$$restProps}>
	<slot />
</button>

<style lang="postcss">
	button {
		@apply inline-flex place-content-center items-center rounded-md border border-transparent px-2.5 py-1.5 text-xs font-bold shadow-md backdrop-blur-sm backdrop-filter;
	}

	button.inline {
		@apply rounded py-2 px-3 text-sm;
	}

	button.standard {
		@apply rounded-md py-3 px-5 text-sm;
	}

	button.featured {
		@apply rounded-md py-3 px-6 text-base;
	}

	button.primary {
		@apply bg-primary bg-opacity-20 text-primary-dark hover:bg-opacity-50;
	}

	button.secondary {
		@apply bg-secondary bg-opacity-20 text-secondary-dark hover:bg-opacity-50;
	}

	button.success {
		@apply bg-success bg-opacity-20 text-success-dark hover:bg-opacity-50;
	}

	button.danger {
		@apply bg-danger bg-opacity-20 text-danger-dark hover:bg-opacity-50;
	}

	button.warning {
		@apply bg-warning bg-opacity-20 text-warning-dark hover:bg-opacity-50;
	}

	button.info {
		@apply bg-info bg-opacity-20 text-info-dark hover:bg-opacity-50;
	}

	button.white {
		@apply bg-white bg-opacity-20 text-gray-dark hover:bg-opacity-50;
	}

	button.transparent {
		@apply bg-transparent text-gray-dark hover:bg-gray-lightest hover:bg-opacity-20;
	}
</style>
