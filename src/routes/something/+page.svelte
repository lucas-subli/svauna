<script>
	import { AsyncButton, Button } from '$lib/components/common';

	const someFunc = async () => {
		await new Promise((f) => setTimeout(f, 2000));
		console.log('someFunc executed');
	};
</script>



<div class="m-8">
  <a href="/">
    <Button color="warning">Back</Button>
  </a>

  <AsyncButton func={someFunc} color="success">I have a spinner</AsyncButton>
</div>
