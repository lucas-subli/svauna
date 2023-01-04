/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
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
