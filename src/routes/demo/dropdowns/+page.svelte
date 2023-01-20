<script lang="ts">
	import { Card, Dropdown } from '$lib/components/common';
</script>

<div class="h-full w-full space-y-4">
	<Card class="pt-8">
		<div slot="header">Dropdown</div>
    I am too lazy to make all color, but the idea is there.
    <br>
		<Dropdown label="Options">
			<div
				class="text-primary-dark block px-4 py-2 text-sm rounded-t hover:bg-gradient-to-b hover:from-primary/60 hover:to-primary/30"
				role="menuitem"
				tabindex="-1"
				id="menu-item-0"
			>
				Account settings
			</div>
			<div
				class="text-primary-dark block px-4 py-2 text-sm rounded-b hover:bg-gradient-to-b hover:from-primary/60 hover:to-primary/30"
				role="menuitem"
				tabindex="-1"
				id="menu-item-0"
			>
				Account settings
			</div>
		</Dropdown>
	</Card>
</div>
