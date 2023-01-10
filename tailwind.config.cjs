/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#eeeeee',
      primary: {
        lightest: '#fdf4ff',
        light: '#f0abfc',
        DEFAULT: '#a855f7',
        dark: '#7e22ce',
      },
      secondary: {
        lightest: '#f0fdfa',
        light: '#5eead4',
        DEFAULT: '#14b8a6',
        dark: '#0f766e',
      },
      success: {
        lightest: '#f7fee7',
        light: '#bef264',
        DEFAULT: '#84cc16',
        dark: '#4d7c0f',
      },
      danger: {
        lightest: '#fff1f2',
        light: '#fda4af',
        DEFAULT: '#f43f5e',
        dark: '#be123c',
      },
      warning: {
        lightest: '#fffbeb',
        light: '#fde68a',
        DEFAULT: '#fbbf24',
        dark: '#ca8a04',
      },
      info: {
        lightest: '#ecfeff',
        light: '#bfdbfe',
        DEFAULT: '#60a5fa',
        dark: '#1d4ed8',
      },
      gray: {
        lightest: '#f8fafc',
        light: '#cbd5e1',
        DEFAULT: '#64748b',
        dark: '#334155',
      },
    },
    extend: {
		}
  },
  plugins: [],
}
