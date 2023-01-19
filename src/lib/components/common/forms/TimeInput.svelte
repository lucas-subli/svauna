<script lang="ts">
	import type { CustomValidator, InvalidHandlerResponse } from '$lib/model/common/form';
	import InputBase from './InputBase.svelte';

	// Input Options
	// -------------------------------------------------------------------------------------------
	export let type: 'date' | 'month' | 'week' | 'time' | 'datetime-local' = 'date';
	export let placeholder: string | null = null;
	export let readonly: boolean | null = null;
	export let disabled: boolean | null = null;
	export let value: number | null = null;
  export let minValue: number | null = null; // minimum number of characters of value
	export let maxValue: number | null = null; // maximum number of characters of value

	// Label & Description Options
	// -------------------------------------------------------------------------------------------
	export let label: string | null = null;
	export let note: string | null = null;
	export let alt: string | null = null;

	// Standard Validation Options
	// -------------------------------------------------------------------------------------------
	export let required: boolean | null = null;
	export let pattern: string | null = null;
	export let patternMessage: string | null = null; // can be used to pass a custom error message when pattern fails

	// Custom Validation Options
	// -------------------------------------------------------------------------------------------
	export let customValidation: CustomValidator = {};

	// Defaults
	// -------------------------------------------------------------------------------------------
  let formProps = {
		min: minValue,
    max: maxValue,
	};
	let validateOnMount = false; // if true, will validate input and show any errors when component is mounted
	let validateOnInput = minValue || maxValue ? true : false; // if true, will validate input and show any errors when user first touches input

  // Handlers
  // -------------------------------------------------------------------------------------------
  function invalidHandler(input: any) {
    let res = { errors: [] as string[], warnings: [] as string[] };
		// Standard Validation Messages
		if (input.validity.rangeUnderflow) res.errors = [`Please enter a value that is ${minValue} or larger.`];
		if (input.validity.rangeOverflow) res.errors = [`Please enter a value that is ${maxValue} or smaller.`];
		// if (input.validity.stepMismatch) errors = [`Please enter a value in steps of '${step}'.`];
    return res;
	}
</script>

<InputBase
	bind:value
  {type}
	{placeholder}
	{disabled}
	{readonly}
	{label}
	{note}
	{alt}
	{required}
	{pattern}
	{patternMessage}
	{validateOnInput}
	{validateOnMount}
	{formProps}
	{customValidation}
  {invalidHandler}
/>

<style lang="postcss">
</style>
