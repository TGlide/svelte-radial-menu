import { Rule } from '@unocss/core';
import { globalKeywords } from '../constants';

export const position: Rule[] = [
	[/^(?:position-|pos-)?(relative|absolute|fixed|sticky)$/, ([, v]) => ({ position: v })],
	[
		/^(?:position-|pos-)([-\w]+)$/,
		([, v]) => (globalKeywords.includes(v) ? { position: v } : undefined),
	],
	[/^(?:position-|pos-)?(static)$/, ([, v]) => ({ position: v })],
];
