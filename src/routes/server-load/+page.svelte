<script lang='ts'>
	import { AsyncButton, Button } from '$lib/components/common';
  import type { Butler } from '$lib/model/Butler';

  export let data: {res: Butler[]};

	const someFunc = async () => {
		await new Promise((f) => setTimeout(f, 2000));
		console.log('someFunc executed');
	};
</script>


<h1 class="ml-8"> The list loaded server side on +page.server.ts (thus it blocks navigation)</h1>
{#each data.res as client}
  <div class="m-8">
    <h1 class="text-2xl font-bold">{client.name}</h1>
    <p class="text-gray-600">{client.email}</p>
  </div>
{/each}

<div class="m-8">
  <a href="/">
    <Button color="warning">Back</Button>
  </a>

  <AsyncButton func={someFunc} color="success">I have a spinner</AsyncButton>
</div>
