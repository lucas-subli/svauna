<script lang="ts">
	import type { Colors } from '$lib/model/common/colors';

	export let color: Colors = 'primary';
  export let fullwidth: boolean = true;
</script>

<div class="flex justify-center {$$props.class}" class:fullwidth>
  <div class="card {color}" class:fullwidth>
    {#if $$slots.header}
      <div class="text-xl leading-tight font-bold mb-2">
        <slot name="header"></slot>
      </div>
    {/if}
    <div class="text-base">
      <slot>
      </slot>
    </div>
  </div>
</div>


<style lang="postcss">
  .card {
    @apply block p-6 rounded-lg shadow-lg max-w-xl backdrop-blur-sm backdrop-filter;
  }

  .card.primary {
		@apply bg-gradient-to-b from-primary-lightest/50 to-primary-lightest/10 text-primary-dark;
	}

	.card.secondary {
		/* @apply bg-secondary-lightest bg-opacity-40 text-secondary-dark; */
    @apply bg-gradient-to-b from-secondary-lightest/50 to-secondary-lightest/10 text-secondary-dark;
	}

	.card.success {
		@apply bg-gradient-to-b from-success-lightest/50 to-success-lightest/10 text-success-dark;
	}

	.card.danger {
		@apply bg-gradient-to-b from-danger-lightest/50 to-danger-lightest/10 text-danger-dark;
	}

	.card.warning {
		@apply bg-gradient-to-b from-warning-lightest/50 to-warning-lightest/10 text-warning-dark;
	}

	.card.info {
		@apply bg-gradient-to-b from-info-lightest/50 to-info-lightest/10 text-info-dark;
	}

	.card.white {
		@apply bg-gradient-to-b from-white/50 to-white/10 text-gray-dark;
	}

	.card.transparent {
		@apply bg-gradient-to-b from-white/20 to-transparent text-gray-dark;
	}

  .fullwidth {
    @apply w-full;
  }
</style>
