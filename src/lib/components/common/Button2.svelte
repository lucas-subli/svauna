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
		@apply focus:bg-primary-dark focus:ring-primary-dark;
	}
	button.hoverable.danger {
		@apply focus:bg-danger-dark focus:ring-danger-dark;
	}
	button.primary:not(.danger) {
		@apply text-white shadow-sm bg-primary border-transparent;
	}
	button.primary.hoverable:not(.danger) {
		@apply hover:bg-primary-dark;
	}
	button.primary.danger {
		@apply text-white shadow-sm bg-danger border-transparent;
	}
	button.primary.danger.hoverable {
		@apply hover:bg-danger-dark;
	}
	button.secondary:not(.danger) {
		@apply text-primary border-primary;
	}
	button.secondary.hoverable:not(.danger) {
		@apply hover:text-white hover:bg-primary-dark hover:border-primary-dark focus:border-primary-dark focus:text-white;
	}
	button.secondary.danger {
		@apply text-danger border-danger;
	}
	button.secondary.danger.hoverable {
		@apply hover:text-white hover:bg-danger-dark hover:border-danger-dark focus:border-danger-dark focus:text-white;
	}
	button.tertiary:not(.danger) {
		@apply text-primary border-transparent;
	}
	button.tertiary.hoverable:not(.danger) {
		@apply hover:text-white hover:bg-primary-dark focus:text-white;
	}
	button.tertiary.danger {
		@apply text-danger border-transparent;
	}
	button.tertiary.danger.hoverable {
		@apply hover:text-white hover:bg-danger-dark focus:text-white;
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
