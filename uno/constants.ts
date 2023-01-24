export const globalKeywords = ['inherit', 'initial', 'revert', 'revert-layer', 'unset'];

export const directionMap: Record<string, string[]> = {
	l: ['-left'],
	r: ['-right'],
	t: ['-top'],
	b: ['-bottom'],
	x: ['-left', '-right'],
	y: ['-top', '-bottom'],
	'': [''],
};

export const cornerMap: Record<string, string[]> = {
	l: ['-top-left', '-bottom-left'],
	r: ['-top-right', '-bottom-right'],
	t: ['-top-left', '-top-right'],
	b: ['-bottom-left', '-bottom-right'],
	tl: ['-top-left'],
	lt: ['-top-left'],
	tr: ['-top-right'],
	rt: ['-top-right'],
	bl: ['-bottom-left'],
	lb: ['-bottom-left'],
	br: ['-bottom-right'],
	rb: ['-bottom-right'],
	'': [''],
};
