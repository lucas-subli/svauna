<script lang="ts">
	import Button from '../Button.svelte';
	import InputBase from './InputBase.svelte';

	// Input Pass-Through Props
	// -------------------------------------------------------------------------------------------
	// input options
	const uid = Math.floor(Math.random() * 10000000);
	let type = 'password';
	export let name = `${type}-${uid}`;
	export let id = name ? `${name}-${uid}` : `${type}-${uid}`;
	export let tabindex: number | null = null;
	export let placeholder: string | null = null;
	export let value: string | null = null;
	export let disabled: boolean | null = null;
	export let readonly: boolean | null = null;
	export let minLength: number | null = null;
	export let maxLength: number | null = null;
	export let size: number | null = null;
	export let containerClasses = '';
	export let inputContainerClasses = '';
	export let inputClasses = '';
	export let inheritFontSize = false;
	export let leftPadding = readonly ? false : true;
	export let rounded = true;
	export let border = true;
	export let bgFill = !border ? true : false;
	export let shadow = true; // won't be applied, irrespective of value, if border is false
	// label & description options
	export let label: string | null = null;
	export let labelHidden = false;
	export let showRequiredHint = true;
	export let note: string | null = null;
	// standard validation options
	export let validateOnMount = false;
	export let validateOnInput = true;
	export let validationObjectName = 'password';
	export let required: boolean | null = null;
	export let pattern: string | null = null;
	export let patternMessage: string | null = null;
	// optional custom validation
	export let customValidation = {};
	export let newPassword = false;
	if (newPassword)
		customValidation = {
			errors: [
				{
					pattern: 'password',
					messageIfMatch: true,
					message: "Please choose a password that doesn't include the word 'password'."
				}
			],
			warnings: [
				{
					pattern: '[\\s]',
					messageIfMatch: false,
					message: 'Consider adding spaces for a stronger password.'
				}
			]
		};
	let obscureText = true;
	$: inputType = obscureText ? 'password' : 'text';
	$: buttonLabel = obscureText ? 'Show' : 'Hide';
	const buttonClickHandler = () => (obscureText = !obscureText);
</script>

<div class="relative {containerClasses}">
	<InputBase
		type={inputType}
		bind:value
		{name}
		{id}
		{label}
		{labelHidden}
		{note}
		{tabindex}
		{placeholder}
		{disabled}
		{readonly}
		{minLength}
		{maxLength}
		{size}
		{inheritFontSize}
		{leftPadding}
		{rounded}
		{border}
		{bgFill}
		{shadow}
		{required}
		{showRequiredHint}
		{validateOnMount}
		{validateOnInput}
		{validationObjectName}
		{pattern}
		{patternMessage}
		{customValidation}
		containerClasses={inputContainerClasses}
		{inputClasses}
		on:input
		on:blur
	/>
	{#if '!disabled && !readonly'}
		<div class="absolute right-1" style={label ? 'top: 2.5rem;' : 'top: 0;'}>
			<Button level="text" on:click={buttonClickHandler}>
				{buttonLabel}
			</Button>
		</div>
	{/if}
</div>
