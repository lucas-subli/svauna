<script lang="ts">
	import InputBase from './InputBase.svelte';

	// Input Options
	// -------------------------------------------------------------------------------------------
	export let type: 'checkbox' | 'radio' = 'checkbox';
	export let placeholder: string | null = null;
	export let readonly: boolean | null = null;
	export let disabled: boolean | null = null;
	export let checked: boolean = false;

	// Label & Description Options
	// -------------------------------------------------------------------------------------------
	export let label: string | null = null;
	export let note: string | null = null;
	export let alt: string | null = null;

	// Standard Validation Options
	// -------------------------------------------------------------------------------------------
	export let required: boolean | null = null;
</script>

<InputBase
	bind:checked
	{type}
	{placeholder}
	{disabled}
	{readonly}
	{label}
	{note}
	{alt}
	{required}
/>

<style lang="postcss">
</style>
