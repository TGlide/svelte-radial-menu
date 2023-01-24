import { Rule } from '@unocss/core';
import { makeGlobalStaticRules } from '../utils';

export const align: Rule[] = [
	// contents
	['content-center', { 'align-content': 'center' }],
	['content-start', { 'align-content': 'flex-start' }],
	['content-end', { 'align-content': 'flex-end' }],
	['content-between', { 'align-content': 'space-between' }],
	['content-around', { 'align-content': 'space-around' }],
	['content-evenly', { 'align-content': 'space-evenly' }],
	...makeGlobalStaticRules('content', 'align-content'),

	// items
	['items-start', { 'align-items': 'flex-start' }],
	['items-end', { 'align-items': 'flex-end' }],
	['items-center', { 'align-items': 'center' }],
	['items-baseline', { 'align-items': 'baseline' }],
	['items-stretch', { 'align-items': 'stretch' }],
	...makeGlobalStaticRules('items', 'align-items'),

	// selfs
	['self-auto', { 'align-self': 'auto' }],
	['self-start', { 'align-self': 'flex-start' }],
	['self-end', { 'align-self': 'flex-end' }],
	['self-center', { 'align-self': 'center' }],
	['self-stretch', { 'align-self': 'stretch' }],
	['self-baseline', { 'align-self': 'baseline' }],
	...makeGlobalStaticRules('self', 'align-self'),
];
