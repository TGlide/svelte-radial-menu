import { Rule } from '@unocss/core';

export const flex: Rule[] = [
	// display
	['flex', { display: 'flex' }],
	['inline-flex', { display: 'inline-flex' }],
	['flex-inline', { display: 'inline-flex' }],

	// flex
	[/^flex-(\d+)$/, ([, d]) => ({ flex: d })],
	['flex-1', { flex: '1 1 0%' }],
	['flex-auto', { flex: '1 1 auto' }],
	['flex-initial', { flex: '0 1 auto' }],
	['flex-none', { flex: 'none' }],

	// shrink/grow/basis
	[/^(?:flex-)?shrink(?:-(.*))?$/, ([, d = '']) => ({ 'flex-shrink': d })],
	[/^(?:flex-)?grow(?:-(.*))?$/, ([, d = '']) => ({ 'flex-grow': d })],
	[/^(?:flex-)?basis-(.+)$/, ([, d]) => ({ 'flex-basis': d })],

	// directions
	['flex-row', { 'flex-direction': 'row' }],
	['flex-row-reverse', { 'flex-direction': 'row-reverse' }],
	['flex-col', { 'flex-direction': 'column' }],
	['flex-col-reverse', { 'flex-direction': 'column-reverse' }],

	// wraps
	['flex-wrap', { 'flex-wrap': 'wrap' }],
	['flex-wrap-reverse', { 'flex-wrap': 'wrap-reverse' }],
	['flex-nowrap', { 'flex-wrap': 'nowrap' }],
];
