export function dropdownIn(node: HTMLElement, { duration }: { duration: number }) {
	return {
		duration,
		css: (t: number) => {
			return `
        transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
        transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
        transition-duration: ${duration}ms;
        transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
        opacity: ${t};
        --tw-scale-x: ${t * 0.05 + 0.95};
        --tw-scale-y: ${t * 0.05 + 0.95};
        );`;
		}
	};
}

export function dropdownOut(node: HTMLElement, { duration }: { duration: number }) {
	return {
		duration,
		css: (t: number) => {
			return `
        transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
        transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
        transition-duration: ${duration}ms;
        transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
        opacity: ${t};
        --tw-scale-x: ${t * 0.05 + 0.95};
        --tw-scale-y: ${t * 0.05 + 0.95};
        );`;
		}
	};
}
