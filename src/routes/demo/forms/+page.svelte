<script lang="ts">
	import { Card, TextInput } from '$lib/components/common';

	let values = {
		text_disabled: 'Disabled value.',
		text_readonly: 'Read-only value.',
		text_required: null,
		text_pattern: null,
		text_lenght: null,
		checkbox: false,
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
