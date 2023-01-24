import { Rule } from '@unocss/core';
import { globalKeywords } from '../constants';
import pollen from '../pollen';
import { createCornerRules, createDirectionRules } from '../utils';

const borderStyles = ['solid', 'dashed', 'dotted', 'double', 'hidden', 'none', ...globalKeywords];

export const border: Rule[] = [
	// Style
	...borderStyles.reduce<Rule[]>((acc, style) => {
		return [
			...acc,
			...createDirectionRules(
				(d) => (d ? `border-${d}-${style}` : `border-${style}`),
				(d) => `border${d}-style`,
				style,
			),
		];
	}, []),
	// Colors
	...Object.keys(pollen.color).reduce<Rule[]>((acc, key) => {
		return [
			...acc,
			...createDirectionRules(
				(d) => (d ? `border-${d}-${key}` : `border-${key}`),
				(d) => `border${d}-color`,
				`var(--color-${key})`,
			),
		];
	}, []),
	// Width
	...Object.keys(pollen.size).reduce<Rule[]>((acc, key) => {
		return [
			...acc,
			...createDirectionRules(
				(d) => (d ? `border-${d}-${key}` : `border-${key}`),
				(d) => `border${d}-width`,
				`var(--size-${key})`,
			),
		];
	}, []),
	// Radius
	...Object.keys(pollen.radius).reduce<Rule[]>((acc, key) => {
		return [
			...acc,
			...createCornerRules(
				(d) => (d ? `rounded-${d}-${key}` : `rounded-${key}`),
				(d) => `border${d}-radius`,
				`var(--radius-${key})`,
			),
		];
	}, []),
];
