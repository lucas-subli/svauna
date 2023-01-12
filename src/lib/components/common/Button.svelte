<script lang="ts">
  import type { ButtonSize } from '$lib/model/common/buttons';
	import type { Colors } from '$lib/model/common/colors';

	export let color: Colors = 'primary';
	export let disabled: boolean = false;
	export let fullwidth: boolean = false;
  export let size: ButtonSize = 'standard';
</script>

<button on:click {...$$restProps} class="{color} {size} {$$props.class}" {disabled} class:fullwidth>
	<slot />
</button>

<style lang="postcss">
	button {
		@apply inline-flex place-content-center items-center rounded-md border border-transparent px-2.5 py-1.5 text-xs shadow-md backdrop-blur-sm backdrop-filter;
	}

  button.inline {
    @apply font-semibold text-xs;
  }

	button.standard {
		@apply rounded p-2 text-sm font-bold;
	}

	button.fat {
		@apply rounded-md py-3 px-5 text-sm font-bold;
	}

	button.featured {
		@apply rounded-md py-3 px-6 text-base font-extrabold border-2;
	}

	button.primary {
		@apply bg-gradient-to-b from-primary/30 to-primary/20 text-primary-dark hover:bg-gradient-to-b hover:from-primary/60 hover:to-primary/30  disabled:bg-primary-light disabled:bg-opacity-20 disabled:text-primary;
	}

  button.featured.primary {
    @apply border-primary border-opacity-50;
  }

	button.secondary {
		@apply bg-gradient-to-b from-secondary/30 to-secondary/20 text-secondary-dark hover:bg-gradient-to-b hover:from-secondary/60 hover:to-secondary/30 disabled:bg-secondary-light disabled:bg-opacity-20 disabled:text-secondary;
	}

  button.featured.secondary {
    @apply border-secondary-dark border-opacity-50;
  }

	button.success {
		@apply bg-gradient-to-b from-success/30 to-success/20 text-success-dark hover:bg-gradient-to-b hover:from-success/60 hover:to-success/30 disabled:bg-success-light disabled:bg-opacity-20 disabled:text-success;
	}

  button.featured.success {
    @apply border-success-dark border-opacity-50;
  }

	button.danger {
		@apply bg-gradient-to-b from-danger/30 to-danger/20 text-danger-dark hover:bg-gradient-to-b hover:from-danger/60 hover:to-danger/30 disabled:bg-danger-light disabled:bg-opacity-20 disabled:text-danger;
	}

  button.featured.danger {
    @apply border-danger-dark border-opacity-50;
  }

	button.warning {
		@apply bg-gradient-to-b from-warning/30 to-warning/20 text-warning-dark hover:bg-gradient-to-b hover:from-warning/60 hover:to-warning/30 disabled:bg-warning-light disabled:bg-opacity-20 disabled:text-warning;
	}

  button.featured.warning {
    @apply border-warning-dark border-opacity-50;
  }

	button.info {
		@apply bg-gradient-to-b from-info/30 to-info/20 text-info-dark hover:bg-gradient-to-b hover:from-info/60 hover:to-info/30 disabled:bg-info-light disabled:bg-opacity-20 disabled:text-info;
	}

  button.featured.info {
    @apply border-info-dark border-opacity-50;
  }

	button.white {
		@apply bg-gradient-to-b from-white/30 to-white/20 text-gray-dark hover:bg-gradient-to-b hover:from-white/60 hover:to-white/30 disabled:bg-gray-light disabled:bg-opacity-20 disabled:text-gray;
	}

  button.featured.white {
    @apply border-white border-opacity-100;
  }

	button.transparent {
		@apply bg-gradient-to-b from-white/10 to-transparent text-gray-dark hover:bg-gradient-to-b hover:from-white/30 hover:to-white/10 disabled:bg-gray-lightest disabled:bg-opacity-10 disabled:text-gray;
	}

  button.featured.transparent {
    @apply border-gray border-opacity-50;
  }

	button.fullwidth {
		@apply w-full;
	}

  button:disabled {
    @apply shadow-none;
		cursor: default;
		pointer-events: none;
	}
</style>
