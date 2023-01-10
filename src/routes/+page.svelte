<script>
	import working from '$lib/assets/working.avif';
	import AppImage from '$lib/components/common/AppImage.svelte';
</script>

<div class="relative">
	<div class="bg-gray-lightest absolute inset-x-0 bottom-0 h-1/2" />
	<div class="mx-auto max-w-7xl sm:px-6 lg:px-8">
		<div class="relative shadow-xl sm:overflow-hidden sm:rounded-2xl">
			<div class="absolute inset-0">
				<AppImage
					class="h-full w-full object-cover"
					src={working}
					loading="eager"
					alt="People working on laptops"
				/>
				<div
					class="absolute inset-0 bg-gradient-to-r from-primary-dark to-secondary mix-blend-multiply"
				/>
			</div>
			<div class="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
				<h1 class="text-center text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
					<span class="block text-white">Bacon ipsum dolor</span>
					<span class="block text-primary-light">amet turkey porchetta</span>
				</h1>
				<p class="mx-auto mt-6 max-w-lg text-center text-xl text-primary-light sm:max-w-3xl">
					Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo.
					Elit sunt amet fugiat veniam occaecat fugiat aliqua.
				</p>
				<div class="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
					<div class="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
						<a
							href="server-load"
							class="flex items-center justify-center rounded-md border border-transparent bg-success-lightest bg-opacity-60 px-4 py-3 text-base font-medium text-success-dark shadow-sm hover:bg-secondary-light hover:bg-opacity-70 sm:px-8"
						>
							Server Load
						</a>
						<a
							href="api-call"
							class="flex items-center justify-center rounded-md border border-transparent bg-primary bg-opacity-60 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-opacity-70 sm:px-8"
						>
							API call
						</a>
            <a
							href="demo"
							class="flex items-center justify-center rounded-md border border-transparent bg-secondary bg-opacity-60 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-opacity-70 sm:px-8"
						>
							Demos
						</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
