<script lang="ts">
	import type { Butler } from '$lib/model/Butler';

	export let list: Promise<Butler[]> | undefined = undefined;
</script>

<div class="m-8">
	<h1>The list loaded on a server API call no navigation blocked</h1>

	{#await list}
		{#each [0, 1, 2] as number}
			<div class="animate-pulse flex flex-col m-1 space-y-1 mb-1">
				<div class="h-8 w-40 bg-slate-200 rounded"></div>
				<div class="h-4 w-80 bg-slate-200 rounded"></div>
			</div>
		{/each}
	{:then butlers}
		{#if !butlers || butlers?.length === 0}
			<p>There are no butlers</p>
		{:else}
			{#each butlers as butler}
				<h1 class="text-2xl font-bold">{butler.name}</h1>
				<p class="text-gray-600">{butler.email}</p>
			{/each}
		{/if}
	{:catch error}
		<p style="color: red">{error.message}</p>
	{/await}

</div>
