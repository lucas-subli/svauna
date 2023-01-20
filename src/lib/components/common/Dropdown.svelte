<script lang="ts">
	import { dropdownIn, dropdownOut } from '$lib/model/common/animations';
	import { assertIsNode } from '$lib/utils/helpers';
	import { onMount } from 'svelte';

  export let label: string = 'Dropdown';

	// State
	let open = false;
	let dropdown: HTMLElement | null = null;


	onMount(() => {
		const outsideClickHandler = (event: MouseEvent) => {
			assertIsNode(event.target);
			if (open && !dropdown?.contains(event.target)) {
				open = false;
			}
		};
		const escapeModalHandler = (event: KeyboardEvent) => {
			if (open && event.key === 'Escape') {
				open = false;
			}
		};
		// add listeners when element is added to the DOM
		document.addEventListener('click', outsideClickHandler, false);
		document.addEventListener('keyup', escapeModalHandler, false);
		// remove listeners when element is removed from the DOM
		return () => {
			document.removeEventListener('click', outsideClickHandler, false);
			document.removeEventListener('keyup', escapeModalHandler, false);
		};
	});
</script>

<div bind:this={dropdown} class="relative inline-block text-left">
	<div>
		<button
			on:click={() => (open = !open)}
			type="button"
			class="dropdown-btn"
			id="menu-button"
			aria-expanded="true"
			aria-haspopup="true"
		>
			{label}
			<svg
				class="-mr-1 ml-2 h-5 w-5"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 20 20"
				fill="currentColor"
				aria-hidden="true"
			>
				<path
					fill-rule="evenodd"
					d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
					clip-rule="evenodd"
				/>
			</svg>
		</button>
	</div>

	{#if open}
		<div
			in:dropdownIn={{ duration: 100 }}
			out:dropdownOut={{ duration: 75 }}
			class="dropdown-menu"
			role="menu"
			aria-orientation="vertical"
			aria-labelledby="menu-button"
			tabindex="-1"
		>
			<div class="" role="none">
        <slot></slot>
			</div>
		</div>
	{/if}
</div>

<style lang="postcss">
	.dropdown-btn {
		@apply inline-flex w-full justify-center rounded-md bg-gradient-to-b from-primary/30  to-primary/20 px-4 py-2 text-sm font-medium text-primary-dark shadow-sm hover:bg-gradient-to-b hover:from-primary/60 hover:to-primary/30 focus:outline-none disabled:bg-primary-light disabled:bg-opacity-20 disabled:text-primary;
	}

	.dropdown-menu {
		@apply absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-gradient-to-b from-primary/30 to-primary/20 text-sm font-medium  text-primary-dark shadow-lg ring-1 ring-primary ring-opacity-5 focus:outline-none disabled:bg-primary-light disabled:bg-opacity-20 disabled:text-primary;
	}
</style>
