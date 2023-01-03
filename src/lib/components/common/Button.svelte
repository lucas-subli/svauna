<button on:click>
  <slot />
</button>

<style lang="postcss">
	button {
		@apply inline-flex items-center rounded border border-transparent bg-indigo-100 px-2.5 py-1.5 text-xs font-medium text-indigo-700 hover:bg-indigo-200;
	}
</style>
