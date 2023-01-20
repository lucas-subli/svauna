<script lang="ts">
  import type { GroupOption } from '$lib/model/common/form';
	import { onMount } from 'svelte';
	import FormError from './FormError.svelte';
	const uid = Math.floor(Math.random() * 10000000);

	// Group Options
	// -------------------------------------------------------------------------------------------
	let thisGroup: any;
	export let groupLabel: string | null = null; // optional label header for input group
	export let options: GroupOption[] = [];
	export let group: GroupOption[] = []; // selected items
	export let name = `checkboxgroup-${uid}`;
	export let tabindex: number | null = null;

	// Input Options
	// -------------------------------------------------------------------------------------------
	let thisInput: any[] = [];

  // Input Style Options – applies to all inputs in group
	// -------------------------------------------------------------------------------------------
	export let containerClasses = '';
	export let inputClasses = '';
	export let inheritFontSize = false;
	export let displayAsRow = true; // toggles horizontal or vertical display of options
	export let bgFill = true;

	// Label & Description Options – applies to all inputs in group
	// -------------------------------------------------------------------------------------------
	// optional label and note for each input are passed in through 'options' array
	export let labelHidden = false;
	export let optionLabelRight = true; // toggles which side of checkbox input is displayed on
	export let showRequiredHint = true; // toggles display of asterisk next to label for required fields

	// Standard Validation Options – applies to all inputs in group
	// -------------------------------------------------------------------------------------------
	// optional 'required' validation passed in through 'options' array
	export let validateOnMount = false; // if true, will validate input and show any errors when component is mounted
	let errors: string[][] = [];
	let warnings: string[][] = [];
	// Handlers
	// -------------------------------------------------------------------------------------------
	function checkValidity(input: any, i: number): void {
		// clear & re-check for current errors or warnings
		errors[i] = [];
		warnings[i] = [];
		input.checkValidity(); // will fire 'invalid' event if any of standard constraints fail
	}

	onMount(() => {
		if (validateOnMount) {
			const inputs = Array.from(thisGroup.querySelectorAll('input'));
			inputs.forEach((input: any) => input.checkValidity());
		}
	});

	function invalidHandler(input: any, i: number) {
		// Standard Validation Messages
		if (input.validity.valueMissing) errors[i] = ['This is required.'];
	}

</script>

<div class={groupLabel ? 'mt-4' : null} bind:this={thisGroup} {...$$restProps}>
	{#if groupLabel}
		<p class="font-medium">{groupLabel}</p>
	{/if}
	<div class="flex {displayAsRow ? 'space-x-6' : 'flex-col space-y-4 items-start'}">
		{#each options as checkbox, i}
			<div class="optionInputBlock {containerClasses}" class:optionLabelRight>
				{#if checkbox.label}
					<label
						for="{name}-{i + 1}"
						id="{name}-{i + 1}-label"
						class:hide={labelHidden}
						class="block text-gray-700 font-normal"
					>
						{checkbox.label}
						{#if checkbox.required && showRequiredHint}
							<abbr title="Required" class="font-normal text-gray-500">*</abbr>
						{/if}
					</label>
				{/if}
				<input
					bind:this={thisInput[i]}
					type="checkbox"
					{name}
					id="{name}-{i + 1}"
					{tabindex}
					value={checkbox.value ? checkbox.value : checkbox.label ? checkbox.label : null}
					bind:group
					checked={checkbox.checked ? checkbox.checked : null}
					indeterminate={checkbox.indeterminate ? checkbox.indeterminate : null}
					disabled={checkbox.disabled ? checkbox.disabled : null}
					readonly={checkbox.readonly ? checkbox.readonly : null}
					required={checkbox.required ? checkbox.required : null}
					class:inheritFontSize
					class:addBg={bgFill}
					class:hasWarning={warnings[i] && warnings[i].length !== 0}
					class:hasError={errors[i] && errors[i].length !== 0}
					class="{inputClasses} {!checkbox.label ? 'mt-1' : null}"
					aria-required={checkbox.required ? checkbox.required : null}
					aria-disabled={checkbox.disabled ? checkbox.disabled : null}
					aria-labelledby={checkbox.label ? `${name}-${i + 1}-label` : null}
					aria-describedby={checkbox.note ? `${name}-${i + 1}-description` : null}
					aria-invalid={errors.length !== 0 ? true : null}
					on:input={() => checkValidity(thisInput[i], i)}
					on:blur={() => checkValidity(thisInput[i], i)}
					on:invalid={() => invalidHandler(thisInput[i], i)}
				/>
				<!-- using 'add' class names (e.g. 'addShadow') to avoid collisions with Tailwind class names -->
				{#if checkbox.note}
					<p id="{name}-{i + 1}-description" class="description-block">{checkbox.note}</p>
				{/if}
				{#if errors[i]?.length || warnings[i]?.length}
					<div class="error-block">
						<FormError errors={errors[i]} warnings={warnings[i]} />
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>

<style lang="postcss">
	.hide {
		@apply sr-only;
	}

	input {
		@apply w-4 h-4 border border-transparent text-secondary focus:ring-secondary rounded;
	}

	input.addBg:not(.addBorder):not(:checked) {
		@apply bg-gray-light;
	}

	input.addBg.addBorder:not(:checked) {
		@apply bg-gray-lightest;
	}

	input.leftPadding {
		@apply px-3;
	}

	input:not(.inheritFontSize) {
		@apply text-sm;
	}

	input.addBorder {
		@apply border-gray-light;
	}

	input:not([readonly], [disabled]) {
		@apply focus:ring-secondary focus:border-secondary;
	}

	input[readonly] {
		@apply bg-transparent focus:ring-transparent focus:border-transparent cursor-default pointer-events-none;
	}

	input.hasWarning:not([disabled]) {
		@apply focus:ring-warning focus:border-warning;
	}

	input.addBorder.hasWarning:not([disabled]) {
		@apply border-warning;
	}

	input.hasError:not([disabled]) {
		@apply focus:ring-danger focus:border-danger;
	}

	input.addBorder.hasError:not([disabled]) {
		@apply border-danger;
	}

	input[disabled],
	input[readonly] {
		@apply opacity-60;
	}

  input.addBorder[disabled] {
		@apply border-opacity-40;
	}

  input.addShadow[disabled] {
		@apply shadow-none;
	}

  .optionInputBlock {
		@apply inline-grid gap-x-3 gap-y-1;
		grid-template-columns: auto auto;
		align-content: baseline;
	}

  input {
		align-self: center;
	}

  .error-block {
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
</style>
