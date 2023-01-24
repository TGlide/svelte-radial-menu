import { Rule } from '@unocss/core';
import pollen from '../pollen';

export const typography: Rule[] = [
	// Font Size
	...Object.keys(pollen.scale).map((key) => {
		return [`fs-${key}`, { 'font-size': `var(--scale-${key})` }] as Rule;
	}),
	...Object.keys(pollen.scaleFluid).map((key) => {
		return [`fs-fluid-${key}`, { 'font-size': `var(--scale-fluid-${key})` }] as Rule;
	}),
	// Font Family
	...Object.keys(pollen.font).map((key) => {
		return [`font-${key}`, { 'font-family': `var(--font-${key})` }] as Rule;
	}),
	// Font Weight
	...Object.keys(pollen.weight).map((key) => {
		return [`weight-${key}`, { 'font-variation-settings': `'wght' var(--weight-${key})` }] as Rule;
	}),
	// Line Height
	...Object.keys(pollen.line).map((key) => {
		return [`line-${key}`, { 'line-height': `var(--line-${key})` }] as Rule;
	}),
	// Letter Spacing
	...Object.keys(pollen.letter).map((key) => {
		return [`letter-${key}`, { 'letter-spacing': `var(--letter-${key})` }] as Rule;
	}),
	// Prose Width
	...Object.keys(pollen.prose).map((key) => {
		return [`prose-${key}`, { 'max-width': `var(--prose-${key})` }] as Rule;
	}),
];
