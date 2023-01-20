<script lang="ts">
  import { AsyncButton, Button, Card } from "$lib/components/common";

  const uselessFunc = async () => {
		await new Promise((f) => setTimeout(f, 2000));
		console.log('useless func executed');
	};
</script>

<Card class="my-4">
  <div slot="header"> Color buttons </div>
  <div class="display">
    <Button color="primary" class="m-2" on:click={() => {}}>
      Button
    </Button>

    <Button color="secondary" class="m-2" on:click={() => {}}>
      Button
    </Button>

    <Button color="success" class="m-2" on:click={() => {}}>
      Button
    </Button>

    <Button color="danger" class="m-2" on:click={() => {}}>
      Button
    </Button>

    <Button color="warning" class="m-2" on:click={() => {}}>
      Button
    </Button>

    <Button color="info" class="m-2" on:click={() => {}}>
      Button
    </Button>

    <Button color="white" class="m-2" on:click={() => {}}>
      Button
    </Button>

    <Button color="transparent" class="m-2" on:click={() => {}}>
      Button
    </Button>
  </div>
</Card>


<Card color="info" class="mb-4">
  <div slot="header"> With loaders </div>
  <div class="display">
    <AsyncButton func={uselessFunc} color="primary" class="m-2">
      Button
    </AsyncButton>

    <AsyncButton func={uselessFunc} color="secondary" class="m-2">
      Button
    </AsyncButton>

    <AsyncButton func={uselessFunc} color="success" class="m-2">
      Button
    </AsyncButton>

    <AsyncButton func={uselessFunc} color="danger" class="m-2">
      Button
    </AsyncButton>

    <AsyncButton func={uselessFunc} color="warning" class="m-2">
      Button
    </AsyncButton>

    <AsyncButton func={uselessFunc} color="info" class="m-2">
      Button
    </AsyncButton>

    <AsyncButton func={uselessFunc} color="white" class="m-2">
      Button
    </AsyncButton>

    <AsyncButton func={uselessFunc} color="transparent" class="m-2">
      Button
    </AsyncButton>
  </div>
</Card>

<Card color="info" class="mb-4">
  <div slot="header"> Disabled </div>
  <div class="display">
    <Button color="primary" class="m-2" disabled on:click={() => {}}>
      Button
    </Button>

    <Button color="secondary" class="m-2" disabled on:click={() => {}}>
      Button
    </Button>
  </div>
</Card>

<Card color="info" class="mb-4">
  <div slot="header"> Sizes </div>
  <div class="flex flex-col">
    <div>
      I am a standard button
      <Button level="standard" class="m-2" on:click={() => {}}>
        Standard
      </Button>
    </div>

    <div>
      I am a fat button
      <Button color="secondary" level="fat" class="m-2" on:click={() => {}}>
        Fat
      </Button>
    </div>

    <div>
      I am a Featured button
      <Button color="info" level="featured" class="m-2" on:click={() => {}}>
        Featured
      </Button>
    </div>

    <div>
      I am a inline button
      <Button color="danger" level="inline" class="m-2" on:click={() => {}}>
        inline
      </Button>
    </div>

    <div>
      I am a text button
      <Button color="warning" level="text" class="m-2" on:click={() => {}}>
        text
      </Button>
    </div>

  </div>
</Card>

<Card color="info" class="mb-4">
  <div slot="header"> Full Width </div>
  <div class="display">
    <Button color="primary" class="m-2" fullwidth>
      Button
    </Button>

    <Button color="secondary" class="m-2" fullwidth>
      Button
    </Button>

  </div>
</Card>


<style lang="postcss">
  .display {
    @apply flex flex-wrap flex-col md:flex-row place-content-center;
  }
</style>
