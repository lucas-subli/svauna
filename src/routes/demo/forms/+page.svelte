<script lang="ts">
	import { Card, NumberInput, OptionInput, TextInput, TimeInput } from '$lib/components/common';

	let values = {
		text_disabled: 'Disabled value.',
		text_readonly: 'Read-only value.',
		text_required: null,
		text_pattern: null,
		text_lenght: null,
		checkbox: false,
		paired_source: null,
		paired_match: null,
		password: null,
		email: null,
		number: null,
		url: null,
		tel: null,
		range: null,
		date: null,
		month: null,
		week: null,
		time: null,
		datetime_local: null,
		// checkboxgroup: ['Three'],
		radio: false,
		text: null,
		text2: null,
		// radiogroup: 'two',
		select_preselected: 'Three',
		textarea_disabled:
			'Disabled value. Donec ullamcorper nulla non metus auctor fringilla. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Sed posuere consectetur est at lobortis. Maecenas faucibus mollis interdum.',
		textarea_readonly:
			'Read-only value. Nullam id dolor id nibh ultricies vehicula ut id elit. Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor. Nulla vitae elit libero, a pharetra augue. Nulla vitae elit libero, a pharetra augue. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Nullam id dolor id nibh ultricies vehicula ut id elit.'
	};

	const passwordValidation = {
		errors: [
			{
				pattern: 'password',
				messageIfMatch: true,
				message: "Please choose a password that doesn't include the word 'password'."
			},
			{
				pattern: '[*-/]',
				messageIfMatch: true,
				message: "You've entered a special character we're not able to use."
			}
		],
		warnings: [
			{
				pattern: '[0-9]',
				messageIfMatch: false,
				message: 'Consider adding numbers for a stronger password.'
			},
			{
				pattern: '[\\s]',
				messageIfMatch: false,
				message: 'Consider adding spaces for a stronger password.'
			}
		]
	};
</script>

<Card class="my-4">
	<div slot="header">Basic Input</div>

	<p>You typed: <span class="font-bold">{values.text2 ?? '<untouched>'}</span></p>

	<TextInput placeholder="Placeholder text..." bind:value={values.text2} />

	<TextInput label="Text (Read Only)" bind:value={values.text_readonly} readonly={true} />

	<TextInput label="Text (Disabled)" bind:value={values.text_disabled} disabled={true} />

	<TextInput label="Text (Required)" bind:value={values.text_required} required={true} />

	<TextInput
		label="Text (Standard Pattern Validation)"
		bind:value={values.text_pattern}
		pattern="[O|o]range"
		patternMessage="Are you certain you don't like Orange ?"
	/>

	<TextInput
		label="Text (Custom Validation - lenght)"
		bind:value={values.text_lenght}
		minlength={5}
		maxlength={10}
	/>
</Card>

<Card color="secondary" class="my-4">
	<div slot="header">Special Input</div>

	<TextInput label="Source Value (e.g. Password)" bind:value={values.paired_source} />

	<TextInput
		label="Value that must match (e.g. Password Confirm)"
		bind:value={values.paired_match}
		pattern={values.paired_source ?? '.{0,99}'}
		patternMessage="Values don't match."
		disabled={values.paired_source === null}
	/>

	<TextInput
		label="Email"
		type="email"
		bind:value={values.email}
		note="This will be your username"
		required={true}
	/>

	<TextInput
		label="Password (Required + Custom Validation)"
		type="password"
		bind:value={values.password}
		required={true}
		customValidation={passwordValidation}
	/>

	<TextInput label="URL" type="url" bind:value={values.url} />

	<TextInput label="Tel" type="tel" bind:value={values.tel} />
</Card>

<Card color="info" class="my-4">
	<div slot="header">Numeric Input</div>

	<NumberInput
		label="Number (w/ Immediate Validation)"
		minValue={3}
		maxValue={10}
		type="number"
		bind:value={values.number}
	/>

	<NumberInput label="Range" type="range" minValue={3} maxValue={10} bind:value={values.range} />

	<TextInput
		label="Email"
		type="email"
		bind:value={values.email}
		note="This will be your username"
		required={true}
	/>
</Card>

<Card class="my-4">
	<div slot="header">Date Input</div>

	<TimeInput label="Date" type="date" bind:value={values.date} />

	<TimeInput label="Month" type="month" bind:value={values.month} />

	<TimeInput label="Week" type="week" bind:value={values.week} />

	<TimeInput label="Time" type="time" bind:value={values.time} />

	<TimeInput label="Date Time Local" type="datetime-local" bind:value={values.datetime_local} />
</Card>

<Card class="my-4">
	<div slot="header">Options Input</div>

	<OptionInput
		label="Checkbox"
		type="checkbox"
		note="I'm the best checkbox there is."
		bind:checked={values.checkbox}
	/>

	<OptionInput
		label="Radio"
		type="radio"
		bind:checked={values.radio}
		note="Why is there only one of me?"
	/>

</Card>
