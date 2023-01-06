// Connect extended colors in manner that still allows them to
// utilize Tailwind's opacity utilities (text-opacity, etc.)
// https://github.com/adamwathan/tailwind-css-variable-text-opacity-demo
function cssVarHelper(cssVariable) {
  return ({ opacityVariable, opacityValue }) => {
    if (opacityValue !== undefined) {
      return `rgba(var(--${cssVariable}), ${opacityValue})`;
    }
    if (opacityVariable !== undefined) {
      return `rgba(var(--${cssVariable}), var(${opacityVariable}, 1))`;
    }
    return `rgba(var(--${cssVariable}))`;
  };
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
				brand: {
					lightest: cssVarHelper('color-brand-lightest'),
					light: cssVarHelper('color-brand-light'),
					DEFAULT: cssVarHelper('color-brand-default'),
					dark: cssVarHelper('color-brand-dark'),
				},
				action: {
					highlight: cssVarHelper('color-action-highlight'),
					hover: cssVarHelper('color-action-hover'),
					DEFAULT: cssVarHelper('color-action-default'),
					focus: cssVarHelper('color-action-focus'),
				},
			}
    },
  },
  plugins: [],
  safelist: [
    {
      pattern: /bg-(fuchsia|teal|rose|emerald|amber|sky|fuchsia)-(100|200|300|500|700)/,
      variants: ['hover', 'disabled'],
    },

    {
      pattern: /text-(fuchsia|teal|rose|emerald|amber|sky|fuchsia)-(100|300|500|700)/,
      variants: ['hover', 'disabled'],
    },
  ],
}
