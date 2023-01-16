<script lang="ts">
  import { Card, Button } from '$lib/components/common';
  import { notifications } from '$lib/stores/notification';

  const defaultNotification = () => {
		notifications.default({
			message: 'Default message',
		});
	};
	const infoNotification = () => {
		notifications.info({
			message: 'Info message',
			detail: '2 second display',
			secondsDisplayed: 2,
		});
	};
	const successNotification = () => {
		notifications.success({
			message: 'Success message',
			detail: 'Message detail',
			dismissable: false,
      secondsDisplayed: -1,
		});
	};
	const warningNotification = () => {
		notifications.warning({
			message: 'Warning message',
			detail: 'Message detail',
      secondsDisplayed: -1,
		});
	};
	const dangerNotification = () => {
		notifications.danger({
			message: 'Danger message',
			detail: 'Message detail',
      secondsDisplayed: -1,
		});
	};

</script>

<Card>
  <div class="flex flex-col">
    <Button color="primary" class="m-2" on:click={defaultNotification}>
      Default
    </Button>
    <Button color="info" class="m-2" on:click={infoNotification}>
      Info
    </Button>
    <Button color="success" class="m-2" on:click={successNotification}>
      Success
    </Button>
    <Button color="warning" class="m-2" on:click={warningNotification}>
      Warning
    </Button>
    <Button color="danger" class="m-2" on:click={dangerNotification}>
      Danger
    </Button>
  </div>
</Card>
