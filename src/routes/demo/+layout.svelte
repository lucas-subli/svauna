<script>
	import bg1 from '$lib/assets/bg02.jpeg';
	import { AppImage } from '$lib/components/common';
</script>

<div class="cool-bg">
	<AppImage
		class="object-cover"
		src={bg1}
		loading="eager"
		alt="People working on laptops"
	/>
</div>

<div class="main">
	<slot />
</div>

<div class="circle1" />
<div class="circle2" />
<div class="circle3" />
<div class="circle4" />
<div class="circle5" />

<style lang="postcss">
	.main {
		font-family: 'Poppins', sans-serif;
		min-height: 100vh;
		display: flex;
    flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.cool-bg {
		height: 100vh;
		width: 100vw;
		background: linear-gradient(to right top, #65efc9, #6cdbeb);
		display: flex;
		align-items: center;
		justify-content: center;
		position: fixed;
		z-index: -50;
	}

	.circle1,
	.circle2,
	.circle3,
	.circle4,
	.circle5 {
		background: linear-gradient(
			to right bottom,
			rgba(255, 255, 255, 0.4),
			rgba(255, 255, 255, 0.3)
		);
		backdrop-filter: blur(0.3rem);
		position: fixed;
		border-radius: 50%;
	}

	.circle1 {
		top: 5%;
		right: 15%;
		height: 20rem;
		width: 20rem;
		background: linear-gradient(
			to right bottom,
			rgba(167, 234, 255, 0.6),
			rgba(255, 255, 255, 0.1)
		);
		z-index: -49;
	}
	.circle2 {
		bottom: 5%;
		left: 16%;
		height: 25rem;
		width: 25rem;
		background: linear-gradient(to left bottom, rgba(231, 185, 255, 0.4), rgba(255, 189, 217, 0.3));
		z-index: -48;
	}
	.circle3 {
		bottom: 5%;
		right: 29%;
		height: 8rem;
		width: 8rem;
		background: linear-gradient(
			to right bottom,
			rgba(215, 255, 202, 0.5),
			rgba(205, 255, 255, 0.3)
		);
		z-index: -47;
	}
	.circle4 {
		top: -25%;
		left: -16%;
		height: 34rem;
		width: 34rem;
		background: linear-gradient(
			to right bottom,
			rgba(255, 200, 200, 0.4),
			rgba(200, 255, 215, 0.3)
		);
		z-index: -46;
	}
	.circle5 {
		bottom: 15%;
		right: 6%;
		height: 11rem;
		width: 11rem;
		z-index: -45;
	}
</style>
