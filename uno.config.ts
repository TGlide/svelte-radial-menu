import { extractorSvelte } from '@unocss/core';
import presetIcons from '@unocss/preset-icons';
import transformerDirectives from '@unocss/transformer-directives';
import type { VitePluginConfig } from '@unocss/vite';
import { presetPollen } from './uno';

const config: VitePluginConfig = {
	extractors: [extractorSvelte],
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	presets: [presetIcons(), presetPollen() as any],
	transformers: [transformerDirectives()],
	safelist: [...['reload', 'printer'].map((i) => `i-tabler-${i}`)],
};

export default config;
