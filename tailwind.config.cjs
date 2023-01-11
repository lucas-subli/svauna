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
        dark: '#6b21a8',
      },
      secondary: {
        lightest: '#f0fdfa',
        light: '#5eead4',
        DEFAULT: '#14b8a6',
        dark: '#115e59',
      },
      success: {
        lightest: '#f7fee7',
        light: '#bef264',
        DEFAULT: '#84cc16',
        dark: '#3f6212',
      },
      danger: {
        lightest: '#fff1f2',
        light: '#fda4af',
        DEFAULT: '#f43f5e',
        dark: '#9f1239',
      },
      warning: {
        lightest: '#fffbeb',
        light: '#fde68a',
        DEFAULT: '#f59e0b',
        dark: '#854d0e',
      },
      info: {
        lightest: '#ecfeff',
        light: '#bfdbfe',
        DEFAULT: '#3b82f6',
        dark: '#1e40af',
      },
      gray: {
        lightest: '#f8fafc',
        light: '#cbd5e1',
        DEFAULT: '#64748b',
        dark: '#1e293b',
      },
    },
    extend: {
		}
  },
  plugins: [],
}
