<script lang="ts">
  import type { GroupOption } from '$lib/model/common/form';
	import { onMount } from 'svelte';
	import Errors from './FormError.svelte';
	const uid = Math.floor(Math.random() * 10000000);
	// Group Options
	// -------------------------------------------------------------------------------------------
	let thisGroup: any;
	export let groupLabel: string | null = null; // optional label header for input group
	export let options: GroupOption[]  = [];
	export let group: GroupOption[] = []; // selected items
	export let name = `radiogroup-${uid}`;
	export let tabindex: number | null = null;

	// Input Options
	// -------------------------------------------------------------------------------------------
	let thisInput: any;

	// Input Style Options – applies to all inputs in group
	// -------------------------------------------------------------------------------------------
	export let containerClasses = '';
	export let inputClasses = '';
	export let inheritFontSize = false;
	export let displayAsRow = true; // toggles horizontal or vertical display of options

	// Label & Description Options – applies to all inputs in group
	// -------------------------------------------------------------------------------------------
	// optional label and note for each input are passed in through 'options' array
	export let labelHidden = false;
	export let optionLabelRight = true; // toggles which side of radioinput is displayed on
	export let showRequiredHint = true; // toggles display of asterisk next to label for required fields

	// Standard Validation Options – applies to all inputs in group
	// -------------------------------------------------------------------------------------------
	// optional 'required' validation passed in through 'options' array
	export let validateOnMount = false; // if true, will validate input and show any errors when component is mounted
	export let required: boolean | null = null;
	let errors: string[] = [];
	let warnings: string[] = [];

	// Handlers
	// -------------------------------------------------------------------------------------------
	function checkValidity() {
		// clear & re-check for current errors or warnings
		errors = [];
		warnings = [];
		thisInput.checkValidity(); // will fire 'invalid' event if any of standard constraints fail
	}

	onMount(() => {
		if (validateOnMount) checkValidity();
	});

	function inputHandler() {
		checkValidity();
	}

	function blurHandler(group: any, i: number) {
		const groupClasses = group.className;
		// run validation after user has interacted with last input
		if (groupClasses.includes('touched')) {
			checkValidity();
		}
		if (!groupClasses.includes('touched') && i === options.length) {
			checkValidity();
			group.classList.add('touched');
		}
	}

	function invalidHandler() {
		// Standard Validation Messages (displayed as single error message for input group)
		if (thisInput.validity.valueMissing) errors = ['This choice is required.'];
	}

</script>

<div class={groupLabel ? 'mt-4' : null} bind:this={thisGroup} {...$$restProps}>
	<div class="space-y-1">
		{#if groupLabel}
			<p class="font-medium">
				{groupLabel}
				{#if required && showRequiredHint}
					<abbr title="Required" class="font-normal text-gray-500">*</abbr>
				{/if}
		</p>
		{/if}
		{#if errors?.length || warnings?.length}
			<div class="error-block">
				<Errors {errors} {warnings} />
			</div>
		{/if}
	</div>
	<div class="flex {displayAsRow ? 'space-x-6' : 'flex-col space-y-4 items-start'}">
		{#each options as radio, i}
			<div class="optionInputBlock {containerClasses}" class:optionLabelRight>
				{#if radio.label}
					<label
						for="{name}-{i + 1}"
						id="{name}-{i + 1}-label"
						class:hide={labelHidden}
						class="block text-gray-700 font-normal"
					>
						{radio.label}
					</label>
				{/if}
				<input
					bind:this={thisInput}
					type="radio"
					{name}
					id="{name}-{i + 1}"
					{tabindex}
					value={radio.value ? radio.value : radio.label ? radio.label : null}
					bind:group
					checked={radio.checked ? radio.checked : null}
					disabled={radio.disabled ? radio.disabled : null}
					readonly={radio.readonly ? radio.readonly : null}
					{required}
					class:inheritFontSize
					class:hasWarning={warnings.length !== 0}
					class:hasError={errors.length !== 0}
					class="{inputClasses} {!radio.label ? 'mt-1' : null}"
					aria-required={radio.required ? radio.required : null}
					aria-disabled={radio.disabled ? radio.disabled : null}
					aria-labelledby={radio.label ? `${name}-${i + 1}-label` : null}
					aria-describedby={radio.note ? `${name}-${i + 1}-description` : null}
					aria-invalid={errors.length !== 0 ? true : null}
					on:input={inputHandler}
					on:blur={() => blurHandler(thisGroup, i+1)}
					on:invalid={invalidHandler}
				/>
				<!-- using 'add' class names (e.g. 'addShadow') to avoid collisions with Tailwind class names -->
				{#if radio.note}
					<p id="{name}-{i + 1}-description" class="description-block">{radio.note}</p>
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
		@apply w-4 h-4 border border-transparent text-secondary focus:ring-secondary bg-gray;
	}

	input.leftPadding {
		@apply px-3;
	}

	input:not(.inheritFontSize) {
		@apply text-sm;
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
