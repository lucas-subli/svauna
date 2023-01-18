<script lang="ts">
	import type { CustomValidator, InvalidHandlerResponse } from '$lib/model/common/form';
	import InputBase from './InputBase.svelte';

	// Input Options
	// -------------------------------------------------------------------------------------------
	export let type = 'text';
	export let placeholder: string | null = null;
	export let readonly: boolean | null = null;
	export let disabled: boolean | null = null;
	export let value: string | null = null;
	export let minlength: number | null = null; // minimum number of characters of value
	export let maxlength: number | null = null; // maximum number of characters of value

	// Label & Description Options
	// -------------------------------------------------------------------------------------------
	export let label: string | null = null;
	export let note: string | null = null;
	export let alt: string | null = null;

	// Standard Validation Options
	// -------------------------------------------------------------------------------------------
	export let validationObjectName = type; // can be used to customize default error messages; e.g. 'credit card'
	export let required: boolean | null = null;
	export let pattern: string | null = null;
	export let patternMessage: string | null = null; // can be used to pass a custom error message when pattern fails

	// Custom Validation Options
	// -------------------------------------------------------------------------------------------
	export let customValidation: CustomValidator = {};

	// Defaults
	// -------------------------------------------------------------------------------------------
	let formProps = {
		minlength
	};
	let validateOnMount = false; // if true, will validate input and show any errors when component is mounted
	let validateOnInput = pattern || maxlength ? true : false; // if true, will validate input and show any errors when user first touches input

	// Use this instead of the minlength approach toallow the user to type extra characters
	// but then show an error as opposed to simply not allowing them to type more characters.
	if (maxlength) {
		const rule = {
			pattern: `^.{0,${maxlength}}$`,
			showMessage: false,
			message: `Must be ${maxlength} characters or less.`
		};
		if (customValidation.errors) {
			customValidation.errors.push(rule);
		} else {
			customValidation.errors = [rule];
		}
	}

	// Handlers
	// -------------------------------------------------------------------------------------------
	function invalidHandler(input: any): InvalidHandlerResponse {
		let res: InvalidHandlerResponse = {
			errors: [],
			warnings: []
		};

		if (input.validity.tooShort) {
			res.errors.push(
				`${
					validationObjectName.charAt(0).toUpperCase() + validationObjectName.slice(1)
				}  must be at least ${minlength} characters.`
			);
		}
		return res;
	}
</script>

<InputBase
	bind:value
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
