import { writable } from 'svelte/store';

const id = () => '_' + Math.random().toString(36).substr(2, 9);

const createNotificationStore = () => {
	const timeoutIds = new Set<NodeJS.Timeout>();

	const _notifications = writable<NotificationStore[]>([], () => {
		return () => {
			// clear all the timers
			timeoutIds.forEach((timeoutId) => {
				clearTimeout(timeoutId);
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
		_notifications.update((state) => {
			return [...state, { id: _id, type, message, detail, dismissable, secondsDisplayed }];
		});

		// eternal notification
		if (!secondsDisplayed) return;

		const timeoutId = setTimeout(() => {
			dismiss(_id);
		}, secondsDisplayed * 1000);

		timeoutIds.add(timeoutId);
	};

	const dismiss = (_id: string) => {
		_notifications.update((state) => {
			return state.filter(({ id }) => id !== _id);
		});
	};

	const { subscribe } = _notifications;

	return {
		subscribe,
		publish,
		dismiss,
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

export type NotificationStore = Notification & { type?: NotificationType };

export type Notification = NotificationBase & { id: string };
