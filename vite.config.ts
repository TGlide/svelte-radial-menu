import { sveltekit } from '@sveltejs/kit/vite';
import type { UserConfig } from 'vite';
import Unocss from '@unocss/vite';
import unoConfig from './uno.config';

const config: UserConfig = {
	plugins: [
		Unocss({
			...unoConfig
		}),
		sveltekit()
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
};

export default config;
