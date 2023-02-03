import type { Rule } from '@unocss/core';

export const opacity: Rule[] = [
	[/(op|opacity)-(\d+)/, ([, , v]) => ({ opacity: parseInt(v) / 100 })],
];
