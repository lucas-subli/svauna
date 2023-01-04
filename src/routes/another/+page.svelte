<script>
	import { AppImage, Button } from '$lib/components/common';
  import cat from '$lib/assets/cat01.jpg'
</script>

<AppImage src={cat} alt="A cat" loading='eager' />
<div class="m-8">
	<a href="/">
		<Button color="warning">Back</Button>
	</a>
</div>
