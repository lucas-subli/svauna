<script lang="ts">
  import { Button } from "$lib/components/common";
  import { goto } from '$app/navigation';
</script>

<Button on:click={() => goto('demo/modal')}>
  Modal
</Button>

<Button on:click={() => goto('demo/notifications')}>
  Notifications
</Button>

<Button on:click={() => goto('demo/buttons')}>
  Buttons
</Button>

<Button on:click={() => goto('demo/cards')}>
  Cards
</Button>

