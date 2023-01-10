<script lang="ts">
	import cat from '$lib/assets/cat01.jpg';
	import { AppImage, Button, Modal, Notification } from '$lib/components/common';
  import Button2 from '$lib/components/common/Button2.svelte';
	import type { Butler } from '$lib/model/Butler';
	import { notifications } from '$lib/stores/notifications';
	import { onMount } from 'svelte';
	import ButlerList from './ButlerList.svelte';

	let res: Promise<Butler[]> | undefined = undefined;

	onMount(() => {
		res = fetch(`/api/butlers`)
			.then((res) => res.json())
			.then((res: Butler[]) => res);
	});

	const defaultNotification = () => {
		notifications.default({
			message: 'Default message'
		});
	};
</script>

<div class="m-8">
	<a href="/">
		<Button color="warning">Back</Button>
	</a>
  <Button color="secondary">Modal</Button>
	<!-- <Modal modalHeading="I'm a Modal" affordanceButtonLabel="Modal">
    <p slot="content">‘Are their heads off?’ shouted the Queen.</p>
  </Modal> -->
	<Button color="success" on:click={defaultNotification}>Notification</Button>
  <Button2>me</Button2>
</div>

<ButlerList list={res} />

<div class="prose mb-1">
	<h1 class="!mb-2 !text-3xl">Svelte modal component</h1>
	<p class="text-sm leading-6 text-gray">
		By default component displays an inline affordance, as button or link. Can be configured to
		optionally display multiple or 0 actions, text and/or form content, and custom headings and
		icons. Modal will close via click on background or 'escape' key.
	</p>
	<p class="text-sm leading-6 text-gray">
		See <a
			href="https://github.com/ClaytonFarr/sveltekit-netlify-stripe-fauna-example/blob/master/src/lib/components/Modal.svelte"
			>component code</a
		> for all configuration options.
	</p>
</div>

<div class="text-sm">
	<p class="mb-3"><em>Defaults to button with 'Open' label</em></p>
	<Modal modalHeading="I'm a Modal"
		><p slot="content">‘Are their heads off?’ shouted the Queen.</p></Modal
	>
</div>

<AppImage src={cat} alt="A cat" loading="eager" />

<Notification />
