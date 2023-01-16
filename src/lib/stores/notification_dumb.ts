import { writable } from 'svelte/store';

const id = () => '_' + Math.random().toString(36).substr(2, 9);

const createNotificationStore = () => {
	// const timeoutIds = new Set<NodeJS.Timeout>();
  const countdownIds = new Map<string, NodeJS.Timer>();

	const _notifications = writable<NotificationStore[]>([], () => {
		return () => {
			// clear all the countdowns
      countdownIds.forEach((countdownId) => {
        clearInterval(countdownId);
      });

			_notifications.set([]);
		};
	});

	const publish = ({
		message,
		detail = null,
		type = 'default',
		dismissable = true,
		secondsDisplayed = 5
	}: NotificationBase & { type?: NotificationType }) => {
		const _id = id();
		const eternal = !secondsDisplayed || secondsDisplayed <= 0;
		if (eternal) dismissable = true;

		_notifications.update((state) => {
			return [
				...state,
				{
					id: _id,
					type,
					message,
					detail,
					dismissable,
					secondsDisplayed,
					msRemaining: secondsDisplayed * 1000
				}
			];
		});

		// eternal notification
		if (eternal) return;

		// const timeoutId = setTimeout(() => {
		// 	dismiss(_id);
		// }, secondsDisplayed * 1000);

		// timeoutIds.add(timeoutId);

		const countdownId = setInterval(countdown, 100, _id);
    countdownIds.set(_id, countdownId);
	};

  const removeTimer = (_id: string) => {
    const countdownId = countdownIds.get(_id);
    if (countdownId) {
      clearInterval(countdownId);
    }
    countdownIds.delete(_id);
  }

	const dismiss = (_id: string) => {
		_notifications.update((state) => {
      removeTimer(_id);
			return state.filter(({ id }) => id !== _id);
		});
	};

	const countdown = (_id: string) => {
    _notifications.update((state) => {
      const foundIndex = state.findIndex(({ id }) => id == _id);
			if (foundIndex != -1) {
				const newValue = state[foundIndex].msRemaining - 100;
				state[foundIndex].msRemaining = newValue;
        console.log(newValue);
				if (newValue <= 0) {
          console.log('dismiss');
					// dismiss
          removeTimer(_id);
					return state.filter(({ id }) => id !== _id);
				}
			}
			// return updated state
			return state;
		});
	};

	const { subscribe } = _notifications;

	return {
		subscribe,
		publish,
		dismiss,
    countdown,
		default: (arg: NotificationBase) => publish({ ...arg }),
		info: (arg: NotificationBase) => publish({ ...arg, type: 'info' }),
		success: (arg: NotificationBase) => publish({ ...arg, type: 'success' }),
		warning: (arg: NotificationBase) => publish({ ...arg, type: 'warning' }),
		danger: (arg: NotificationBase) => publish({ ...arg, type: 'danger' })
	};
};

export const notifications = createNotificationStore();

export type NotificationBase = {
	message: string;
	detail?: string | null;
	dismissable?: boolean;
	secondsDisplayed?: number;
};

type NotificationType = 'default' | 'info' | 'success' | 'warning' | 'danger';

export type NotificationStore = Notification & { type: NotificationType; msRemaining: number };

export type Notification = NotificationBase & { id: string };
