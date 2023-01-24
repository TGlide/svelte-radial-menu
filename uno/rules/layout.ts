import { Rule } from '@unocss/core';
import pollen from '../pollen';
import { createDirectionRules } from '../utils';

export const layout: Rule[] = [
	// Size
	...Object.keys(pollen.size).reduce<Rule[]>((acc, key) => {
		return [
			...acc,
			[`w-${key}`, { width: `var(--size-${key})` }],
			[`h-${key}`, { height: `var(--size-${key})` }],
			...createDirectionRules(
				(d) => `m${d}-${key}`,
				(d) => `margin${d}`,
				`var(--size-${key})`,
			),
			...createDirectionRules(
				(d) => `p${d}-${key}`,
				(d) => `padding${d}`,
				`var(--size-${key})`,
			),
			[`gap-${key}`, { gap: `var(--size-${key})` }],
		];
	}, []),
	['h-screen', { height: '100vh' }],
	['w-screen', { width: '100vw' }],
	// Container Widths
	...Object.keys(pollen.width).map((key) => {
		return [`contained-${key}`, { 'max-width': `var(--width-${key})` }] as Rule;
	}),
	// Aspect Ratio
	...Object.keys(pollen.ratio).map((key) => {
		return [`ratio-${key}`, { 'aspect-ratio': `var(--ratio-${key})` }] as Rule;
	}),
];
