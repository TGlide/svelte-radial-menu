import { extractorSvelte, type Rule } from '@unocss/core';
import presetIcons from '@unocss/preset-icons';
import rules from './uno/rules';
import type { VitePluginConfig } from '@unocss/vite';
import transformerDirectives from '@unocss/transformer-directives';

const config: VitePluginConfig = {
	extractors: [extractorSvelte],
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	presets: [presetIcons() as any],
	rules: [
		...Object.values(rules).reduce<Rule[]>((acc, curr) => {
			acc.push(...curr);
			return acc;
		}, [])
	],
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	transformers: [transformerDirectives() as any],
	variants: [
		// hover:
		(matcher) => {
			if (!matcher.startsWith('hover:')) return matcher;
			return {
				// slice `hover:` prefix and passed to the next variants and rules
				matcher: matcher.slice(6),
				selector: (s) => `${s}:hover`
			};
		}
	],
	safelist: [...['reload', 'printer'].map((i) => `i-tabler-${i}`)]
};

export default config;
