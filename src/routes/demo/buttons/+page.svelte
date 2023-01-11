<script lang="ts">
  import { AsyncButton, Button, Card } from "$lib/components/common";

  const uselessFunc = async () => {
		await new Promise((f) => setTimeout(f, 2000));
		console.log('someFunc executed');
	};
</script>

<Card class="mb-4">
  <div slot="header"> Color buttons </div>
  <div class="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
    <Button color="primary" on:click={() => {}}>
      Button
    </Button>

    <Button color="secondary" on:click={() => {}}>
      Button
    </Button>

    <Button color="success" on:click={() => {}}>
      Button
    </Button>

    <Button color="danger" on:click={() => {}}>
      Button
    </Button>

    <Button color="warning" on:click={() => {}}>
      Button
    </Button>

    <Button color="info" on:click={() => {}}>
      Button
    </Button>

    <Button color="white" on:click={() => {}}>
      Button
    </Button>

    <Button color="transparent" on:click={() => {}}>
      Button
    </Button>
  </div>
</Card>


<Card color="info">
  <div slot="header"> With loaders </div>
  <div class="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
    <AsyncButton func={uselessFunc} color="primary" on:click={() => {}}>
      Button
    </AsyncButton>

    <AsyncButton func={uselessFunc} color="secondary" on:click={() => {}}>
      Button
    </AsyncButton>

    <AsyncButton func={uselessFunc} color="success" on:click={() => {}}>
      Button
    </AsyncButton>

    <AsyncButton func={uselessFunc} color="danger" on:click={() => {}}>
      Button
    </AsyncButton>

    <AsyncButton func={uselessFunc} color="warning" on:click={() => {}}>
      Button
    </AsyncButton>

    <AsyncButton func={uselessFunc} color="info" on:click={() => {}}>
      Button
    </AsyncButton>

    <AsyncButton func={uselessFunc} color="white" on:click={() => {}}>
      Button
    </AsyncButton>

    <AsyncButton func={uselessFunc} color="transparent" on:click={() => {}}>
      Button
    </AsyncButton>
  </div>
</Card>


