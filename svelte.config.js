import adapter from '@sveltejs/adapter-auto';
import sveltePreprocess from 'svelte-preprocess';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: sveltePreprocess({
		scss: {
			prependData: '@import "./src/styles/functions.scss";',
		},
	}),

	kit: {
		adapter: adapter(),
		alias: {
			$: './src',
		},
	},
};

export default config;
