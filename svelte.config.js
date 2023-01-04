import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';
import sveltePreprocess from 'svelte-preprocess';
import importAssets from 'svelte-preprocess-import-assets';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: [
		importAssets({
			sources: (defaultSources) => {
				return [
					...defaultSources,
					{
						tag: 'Image',
						srcAttributes: ['src']
					}
				];
			}
		}),
		sveltePreprocess(),
		vitePreprocess()
	],
	kit: {
		adapter: adapter()
	}
};

export default config;
