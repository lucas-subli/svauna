<script lang="ts">
	import type { Colors } from '$lib/model/common/colors';

	export let color: Colors = 'transparent';
</script>

<div class="flex justify-center {$$props.class}">
  <div class="card {color}">
    <h5 class="text-gray-dark text-xl leading-tight font-medium mb-2">Card title</h5>
    <p class="text-gray text-base mb-4">
      Some quick example text to build on the card title and make up the bulk of the card's
      content.
    </p>
  </div>
</div>


<style lang="postcss">
  .card {
    @apply block p-6 rounded-lg shadow-lg max-w-lg backdrop-blur-sm backdrop-filter;
  }

  .card.primary {
		@apply bg-primary bg-opacity-40 text-primary-dark;
	}

	.card.secondary {
		@apply bg-secondary bg-opacity-40 text-secondary-dark;
	}

	.card.success {
		@apply bg-success bg-opacity-40 text-success-dark;
	}

	.card.danger {
		@apply bg-danger bg-opacity-40 text-danger-dark;
	}

	.card.warning {
		@apply bg-warning bg-opacity-40 text-warning-dark;
	}

	.card.info {
		@apply bg-info bg-opacity-40 text-info-dark;
	}

	.card.white {
		@apply bg-white bg-opacity-40 text-gray-dark;
	}

	.card.transparent {
		@apply bg-transparent text-gray-dark;
	}
</style>
