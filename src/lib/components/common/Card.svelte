<script lang="ts">
	import type { Colors } from '$lib/model/common/colors';

	export let color: Colors = 'primary';
</script>

<div class="flex justify-center {$$props.class}">
  <div class="card {color}">
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
    @apply block p-6 rounded-lg shadow-lg max-w-lg backdrop-blur-sm backdrop-filter;
  }

  .card.primary {
		@apply bg-primary-lightest bg-opacity-40 text-primary-dark;
	}

	.card.secondary {
		@apply bg-secondary-lightest bg-opacity-40 text-secondary-dark;
	}

	.card.success {
		@apply bg-success-lightest bg-opacity-40 text-success-dark;
	}

	.card.danger {
		@apply bg-danger-lightest bg-opacity-40 text-danger-dark;
	}

	.card.warning {
		@apply bg-warning-lightest bg-opacity-40 text-warning-dark;
	}

	.card.info {
		@apply bg-info-lightest bg-opacity-40 text-info-dark;
	}

	.card.white {
		@apply bg-white bg-opacity-40 text-gray-dark;
	}

	.card.transparent {
		@apply bg-transparent text-gray-dark;
	}
</style>
