<script lang='ts'>
	export let label = 'Click';
	export let type: 'button' | 'submit' | 'reset' = 'button'; // button, submit, reset
	export let level: 'primary' | 'secondary' | 'tertiary' = 'primary'; // primary, secondary, tertiary
	export let size: 'standard' | 'featured' | 'inline' = 'standard'; // featured, standard, inline
	export let naturalWidth = false;
	export let disabled = false;
	export let danger = false;
	export let buttonClasses = '';
	export let hoverable = true;
	export let tabindex: number | null = null;
</script>

<button
	{type}
	{disabled}
	{tabindex}
	class="{size} {level} {buttonClasses}"
	class:fullwidth={!naturalWidth}
	class:hoverable
	class:danger
	{...$$restProps}
	on:click
>
	<slot>
		{label}
	</slot>
</button>

<style lang="postcss">
	button {
		@apply flex justify-center font-medium border transition-colors;
	}
	button.inline {
		@apply text-sm py-2 px-3 rounded;
	}
	button.standard {
		@apply text-sm py-3 px-5 rounded-md;
	}
	button.featured {
		@apply text-base py-3 px-6 rounded-md;
	}
	button.hoverable {
		@apply focus:outline-none focus:ring-2 focus:ring-offset-2;
	}
	button.hoverable:not(.danger) {
		@apply focus:bg-action-focus focus:ring-action-focus;
	}
	button.hoverable.danger {
		@apply focus:bg-red-700 focus:ring-red-700;
	}
	button.primary:not(.danger) {
		@apply text-white shadow-sm bg-action border-transparent;
	}
	button.primary.hoverable:not(.danger) {
		@apply hover:bg-action-hover;
	}
	button.primary.danger {
		@apply text-white shadow-sm bg-red-600 border-transparent;
	}
	button.primary.danger.hoverable {
		@apply hover:bg-red-700;
	}
	button.secondary:not(.danger) {
		@apply text-action border-action;
	}
	button.secondary.hoverable:not(.danger) {
		@apply hover:text-white hover:bg-action-hover hover:border-action-hover focus:border-action-focus focus:text-white;
	}
	button.secondary.danger {
		@apply text-red-600 border-red-600;
	}
	button.secondary.danger.hoverable {
		@apply hover:text-white hover:bg-red-700 hover:border-red-700 focus:border-red-700 focus:text-white;
	}
	button.tertiary:not(.danger) {
		@apply text-action border-transparent;
	}
	button.tertiary.hoverable:not(.danger) {
		@apply hover:text-white hover:bg-action-hover focus:text-white;
	}
	button.tertiary.danger {
		@apply text-red-600 border-transparent;
	}
	button.tertiary.danger.hoverable {
		@apply hover:text-white hover:bg-red-700 focus:text-white;
	}
	button.fullwidth:not(.inline) {
		@apply w-full;
	}
	button:disabled {
		opacity: 0.5;
		cursor: default;
		pointer-events: none;
	}
</style>
