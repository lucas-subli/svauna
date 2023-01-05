<script lang="ts">
	import cat from '$lib/assets/cat01.jpg';
	import { AppImage, Button } from '$lib/components/common';
	import type { Butler } from '$lib/model/Butler';
	import { onMount } from 'svelte';
	import ButlerList from './ButlerList.svelte';

	let res: Promise<Butler[]> | undefined = undefined;

	onMount(() => {
		res = fetch(`/api/butlers`)
			.then((res) => res.json())
			.then((res: Butler[]) => res);
	});

</script>

<div class="m-8">
	<a href="/">
		<Button color="warning">Back</Button>
	</a>
</div>

<AppImage src={cat} alt="A cat" loading="eager" />

<ButlerList list={res} />
