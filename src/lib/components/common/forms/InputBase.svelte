<script lang="ts">
	import type { CustomValidator, InputMode, InvalidHandlerResponse } from '$lib/model/common/form';
	import { onMount } from 'svelte';
	import Errors from './FormError.svelte';

	// Input Options
	// -------------------------------------------------------------------------------------------
	let thisInput: any;
	const uid = Math.floor(Math.random() * 10000000);
	export let type = 'text'; // text, email, password, url, tel, checkbox, radio, number, range, date, month, week, time, datetime-local, search, file, image, color, hidden
	export let indexInGroup = null; // can be used to create explicit ids for inputs within radio and checkbox groups (value must be > 0)
	export let name = type === 'radio' ? 'radiogroup' : `${type}-${uid}`; // set safe default for radiogroups if no name is passed
	export let id = indexInGroup ? `${name}-${indexInGroup}` : `${type}-${uid}`;
	export let tabindex: number | null = null;
	export let placeholder: string | null = null;
	export let value: string | number | null = null;
	export let checked: boolean | null = false; // boolean, used for checkbox / radio inputs
	export let disabled: boolean | null = null;
	export let readonly: boolean | null = null;
	export let inputmode: InputMode = null; // hint to browsers as to the type of virtual keyboard configuration to use (https://tinyurl.com/inputmodeattr)
	export let alt: string | null = null; // alt attribute for the image type; required for accessibility
	export let formProps = {}; // can be used to pass any additional props to the form element

	// Input Style Options
	// -------------------------------------------------------------------------------------------
	export let containerClasses = '';
	export let inputClasses = '';
	export let inheritFontSize = false;

	// Label & Description Options
	// -------------------------------------------------------------------------------------------
	export let label: string | null = null;
	export let labelHidden = false;
	export let optionLabelRight = type === 'checkbox' || type === 'radio' ? true : false; // toggles which side of checkbox/radio input is displayed on
	export let showRequiredHint = true; // toggles display of asterisk next to label for required fields
	export let note: string | null = null;

	// Standard Validation Options
	// -------------------------------------------------------------------------------------------
	// By default, validation and display of error messages will occur 1) after user
	// blurs an input first time and then 2) as user inputs data (after previous blur)
	export let validateOnMount = false; // if true, will validate input and show any errors when component is mounted
	export let validateOnInput = false; // if true, will validate input and show any errors when user first touches input
	export let validationObjectName = type; // can be used to customize default error messages; e.g. 'credit card'
	export let required: boolean | null = null;
	export let pattern: string | null = null; // regex 'pattern' value must match to be valid; only applies to text, email, url, tel, password, search type inputs (https://tinyurl.com/inputpattern2)
	export let patternMessage: string | null = null; // can be used to pass a custom error message when pattern fails

	// Optional Custom Validation
	// -------------------------------------------------------------------------------------------
	// - expects an object with 'errors' and/or 'warnings' arrays of rules (as objects)
	// - first property 'pattern' is regex to evaluate input's value against
	// - second property 'messageIfMatch' is a boolean that determines if message is displayed when pattern matches or misses
	// - third property 'message' is error message displayed when pattern & messageIfMatch align
	// - if multiple errors exists they will be displayed one at a time, in the order added to the arrays
	// - if errors and warnings are both present, errors will be shown first
	// - if a standard 'pattern' is also included (above) & if a value is present, it will be tested before customValidation rules
	export let customValidation: CustomValidator = {};

	// Optional Custom Error
	// -------------------------------------------------------------------------------------------
	export let invalidHandler: ((input: any) => InvalidHandlerResponse) | null = null;

	// Defaults
	// -------------------------------------------------------------------------------------------
	if (!alt && label) alt = label;
	let nonStyledTypes = ['range', 'file', 'image', 'color', 'hidden']; // inputs that have a unique control that shouldn't recieve standard styling options
	let touched = false;
	let blurred = false;
	let errors: string[] = [];
	let warnings: string[] = [];
	// Native validation for phone numbers seems to be unreliable across browsers
	if (type === 'tel') {
		pattern = '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$';
		patternMessage = 'Please enter a valid phone number.';
		validationObjectName = 'phone number';
	}

	// Handlers
	// -------------------------------------------------------------------------------------------
	function checkValidity() {
		if (type !== 'hidden') {
			// clear & re-check for current errors or warnings
			errors = [];
			warnings = [];
			thisInput.checkValidity(); // will fire 'invalid' event if any of standard constraints fail
			if (customValidation?.errors?.length || customValidation?.warnings?.length) {
				checkCustomValidation(); // will test custom rules and populate any related errors/warnings
			}
		}
	}

	function checkCustomValidation() {
		customValidation?.errors?.forEach((rule) => {
			const { pattern, messageIfMatch, message } = rule;
			const regex = new RegExp(pattern, 'g');
			value === null ? (value = '') : (value = value);
			typeof value === 'number' ? (value = value.toString()) : (value = value);
			const validity = regex.test(value); // 'value' is Svelte variable for current value
			if ((validity && messageIfMatch) || (!validity && !messageIfMatch)) errors.push(message);
		});
		customValidation?.warnings?.forEach((rule) => {
			const { pattern, messageIfMatch, message } = rule;
			const regex = new RegExp(pattern, 'g');
			value === null ? (value = '') : (value = value);
			typeof value === 'number' ? (value = value.toString()) : (value = value);
			const validity = regex.test(value);
			if ((validity && messageIfMatch) || (!validity && !messageIfMatch)) warnings.push(message);
		});
	}

	onMount(() => {
		if (validateOnMount) checkValidity();
	});

	function baseInputHandler(e: Event) {
		touched = true;
		const target = e.target as HTMLInputElement;
		if (type.match(/^(number|range)$/)) value = +target.value;
		else if (type.match(/^(checkbox|radio)$/)) checked = target.checked;
		else value = target.value;
		if (validateOnInput || blurred) checkValidity();
		if (!validateOnInput && blurred) checkValidity();
	}

	function baseBlurHandler() {
		let autofocused =
			thisInput.className.includes('autofocused') || thisInput.hasAttribute('autofocus');
		if (touched) blurred = true;
		if (touched) checkValidity();
		if (!touched && required && !autofocused) checkValidity();
	}

	function baseInvalidHandler() {
		// Standard Validation Messages
		if (thisInput.validity.valueMissing) errors = ['This field is required.'];
		if (thisInput.validity.badInput || thisInput.validity.typeMismatch)
			errors = [`Please enter valid ${validationObjectName}.`];
		if (thisInput.validity.patternMismatch && patternMessage) errors = [patternMessage];
		if (thisInput.validity.patternMismatch && !patternMessage)
			errors = [`Please enter valid ${validationObjectName}.`];

		if (invalidHandler) {
			const { errors: customErrors, warnings: customWarnings } = invalidHandler(thisInput);
			if (customErrors.length > 0) errors = customErrors;
			if (customWarnings.length > 0) warnings = customWarnings;
		}
	}
</script>

<div
	class="{type === 'checkbox' || type === 'radio'
		? 'optionInputBlock'
		: 'flex flex-col'} {containerClasses}"
	class:optionLabelRight
	{...$$restProps}
>
	{#if label}
		<label
			for={id}
			id="{id}-label"
			class:hide={labelHidden}
			class="block text-gray {type === 'checkbox' || type === 'radio'
				? null
				: 'mt-3'} 'font-normal'"
		>
			{label}
			{#if required && showRequiredHint}
				<abbr title="Required" class="font-normal text-gray-dark">*</abbr>
			{/if}
		</label>
	{/if}

	<!-- using 'add' class names (e.g. 'addShadow') to avoid collisions with Tailwind class names -->
	<input
		bind:this={thisInput}
		{name}
		{id}
		{type}
		{tabindex}
		{placeholder}
		{value}
		{checked}
		{disabled}
		{readonly}
		{inputmode}
		{alt}
		{required}
		{pattern}
		{...formProps}
		class:inheritFontSize={inheritFontSize && !nonStyledTypes.includes(type)}
		class:leftPadding={!nonStyledTypes.includes(type) && type !== 'checkbox' && type !== 'radio'}
		class:optionInput={type === 'checkbox' || type === 'radio'}
		class:addRounding={!nonStyledTypes.includes(type) && type !== 'radio'}
		class:addBg={!nonStyledTypes.includes(type)}
		class:addBorder={!nonStyledTypes.includes(type)}
		class:addShadow={!nonStyledTypes.includes(type)}
		class:hasWarning={warnings.length !== 0}
		class:hasError={errors.length !== 0}
		class={inputClasses}
		aria-required={required ? true : null}
		aria-disabled={disabled ? true : null}
		aria-labelledby={label ? `${id}-label` : null}
		aria-describedby={note ? `${id}-description` : null}
		aria-invalid={errors.length !== 0 ? true : null}
		on:input={baseInputHandler}
		on:blur={baseBlurHandler}
		on:invalid={baseInvalidHandler}
	/>
	{#if note}
		<p id="{id}-description" class="description-block">{note}</p>
	{/if}
	{#if errors?.length || warnings?.length}
		<div class="error-block">
			<Errors {errors} {warnings} />
		</div>
	{/if}
</div>

<style lang="postcss">
	.hide {
		@apply sr-only;
	}
	input:not(.optionInput, [type='range'], [type='file'], [type='image'], [type='color']) {
		@apply block w-full appearance-none border-2 border-transparent py-2 px-0 text-gray-dark focus:outline-none;
	}
	input[type='range'] {
		@apply border-transparent focus:outline-none accent-primary;
	}
	input.addRounding:not(.optionInput) {
		@apply rounded-md;
	}
	input.optionInput {
		@apply h-4 w-4 border border-transparent text-secondary focus:ring-secondary accent-primary;
	}
	input.addRounding.optionInput {
		@apply rounded;
	}
	input.addBg:not(.optionInput) {
		@apply bg-white bg-opacity-40;
	}
	input.addBg:not([readonly], [disabled]) {
		@apply focus:bg-opacity-20;
	}
	/* input.addBg.optionInput:not(.addBorder):not(:checked) {
		@apply bg-gray-light;
	}
	input.addBg.optionInput.addBorder:not(:checked) {
		@apply bg-gray-light;
	} */
	input.leftPadding {
		@apply px-3;
	}
	input:not(.inheritFontSize) {
		@apply text-sm;
	}
	input:not([readonly], [disabled], [type='range']) {
		@apply placeholder-gray focus:border-secondary focus:ring-secondary;
	}
	input.addBg[readonly] {
		@apply pointer-events-none cursor-default bg-gray bg-opacity-20 shadow-md;
	}
	input.addBg:disabled {
		@apply pointer-events-none cursor-default bg-gray bg-opacity-20 shadow-none;
	}
	input.addShadow:not([readonly], [disabled]) {
		@apply shadow-sm;
	}
	input.hasWarning:not([readonly], [disabled]) {
		@apply text-warning-dark placeholder-warning  focus:border-warning focus:ring-warning;
	}
	input.addBorder.hasWarning:not([readonly], [disabled]) {
		@apply border-warning;
	}
	input.hasError:not([readonly], [disabled]) {
		@apply text-danger-dark placeholder-danger  focus:border-danger focus:ring-danger;
	}
	input.addBorder.hasError:not([readonly], [disabled]) {
		@apply border-danger;
	}
	/* additional helpful psuedo classes that can be styled
    https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#ui:pseudo-classes
    input:placeholder-shown {}
    input:required {}
    input:optional {}
    input:user-invalid {}
	 */
	input.addBorder[disabled] {
		@apply border-opacity-40;
	}
	input.addShadow[disabled] {
		@apply shadow-none;
	}
	input.optionInput[disabled] {
		@apply opacity-40;
	}
	.optionInputBlock {
		@apply inline-grid gap-x-3 gap-y-1;
		grid-template-columns: auto auto;
		align-content: baseline;
	}
	.optionInputBlock input {
		align-self: center;
	}
	.optionInputBlock .error-block {
		grid-column-start: 1;
	}
	.optionLabelRight label {
		grid-column-start: 2;
	}
	.optionLabelRight input {
		grid-column-start: 1;
		grid-row-start: 1;
	}
	.optionLabelRight .description-block {
		grid-column-start: 2;
	}
	.optionLabelRight .error-block {
		grid-column-start: 2;
	}
	.description-block {
		@apply text-xs text-gray;
	}
	:not(.optionInputBlock) .description-block {
		@apply mt-2;
	}
	:not(.optionInputBlock) .error-block {
		@apply mt-2;
	}
	:not(.optionInputBlock) .description-block + .error-block {
		@apply mt-1;
	}
</style>
