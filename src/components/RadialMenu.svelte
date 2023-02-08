<script lang="ts" context="module">
	export type MenuItem = {
		icon: string;
		label: string;
	};
</script>

<script lang="ts">
	import { scale } from 'svelte/transition';
	import { sineInOut } from 'svelte/easing';
	import { onMount } from 'svelte';
	import { getAngleDifference, normalizeAngle, round } from '$/helpers/math';

	const ITEM_OFFSET = 90;

	export let menuItems: MenuItem[];

	let selected: number | null = null;
	let clickCoords: [number, number] | null = null;
	let mouseCoords: [number, number] | null = null;

	$: [skew, top, left, ringAngleOffset, ringPercent] = (function getProperties() {
		switch (menuItems.length) {
			case 3:
				return [-30, 48, 40, 60, 66.6];
			case 4:
				return [0, 55, 55, 90, 74.9];
			case 5:
				return [18, 62, 59, 108, 80];
			case 6:
				return [30, 66, 63, 120, 83.2];
			case 7:
				return [38.5, 69, 65, 128.7, 85.7];
			case 8:
				return [45, 72, 65, 135, 87.4];
			default:
				return [0, 0, 0, 0, 0];
		}
	})();

	$: selected = (function getMouseSelection() {
		// Given the distance between the center of the menu (clickCoords) and the mouse,
		// selects the given menu item.
		if (clickCoords === null || mouseCoords === null) return null;

		const [clickX, clickY] = clickCoords;
		const [mouseX, mouseY] = mouseCoords;
		const dx = mouseX - clickX;
		const dy = mouseY - clickY;

		const distance = Math.sqrt(dx * dx + dy * dy);
		if (distance < 80) return null;

		const angle = Math.atan2(dy, dx) * (180 / Math.PI);
		const normalizedAngle = normalizeAngle(angle - ITEM_OFFSET);
		const stepAngle = 360 / menuItems.length;

		console.log(normalizedAngle);

		return Math.floor(normalizedAngle / stepAngle);
	})();

	function getRingAngle(index: number | null): number | null {
		if (index === null) return null;

		const newAngle = normalizeAngle((360 / menuItems.length) * index - ringAngleOffset);
		if (ringAngle === null) return newAngle;
		const oldAngle = normalizeAngle(ringAngle || 0);

		const diff = getAngleDifference(oldAngle, newAngle);

		return ringAngle + diff;
	}

	$: ringAngle = getRingAngle(selected);

	let easedRingAngle: number | null = null;

	onMount(() => {
		const frame = window.requestAnimationFrame(function animate() {
			if (ringAngle === null) {
				easedRingAngle = null;
			} else if (easedRingAngle === null) {
				easedRingAngle = ringAngle;
			} else {
				easedRingAngle = round(easedRingAngle + (ringAngle - easedRingAngle) * 0.09, 2);
			}

			window.requestAnimationFrame(animate);
		});

		return () => {
			window.cancelAnimationFrame(frame);
		};
	});

	$: style = [
		`--skew: ${skew}deg`,
		`--top: ${top}%`,
		`--left: ${left}%`,
		`--mouseX: ${clickCoords ? clickCoords[0] : 0}px`,
		`--mouseY: ${clickCoords ? clickCoords[1] : 0}px`,
		`--selectedAngle: ${easedRingAngle}deg`,
		`--ringPercent: ${ringPercent}%`,
	].join(';');

	function getItemStyle(i: number) {
		const rotate = (360 / menuItems.length) * i - ITEM_OFFSET;
		return `--rotate: ${rotate}deg`;
	}

	function onMouseDown(e: MouseEvent) {
		const el = e.target as HTMLElement;
		if (!['BODY', 'HTML', 'MAIN'].includes(el.tagName)) return;
		clickCoords = [e.clientX, e.clientY];
	}

	function onTouchStart(e: TouchEvent) {
		const el = e.target as HTMLElement;
		if (!['BODY', 'HTML', 'MAIN'].includes(el.tagName)) return;
		clickCoords = [e.touches[0].clientX, e.touches[0].clientY];
	}
</script>

<svelte:window
	on:touchstart={onTouchStart}
	on:touchmove={(e) => {
		mouseCoords = [e.touches[0].clientX, e.touches[0].clientY];
	}}
	on:touchend={() => {
		clickCoords = null;
		mouseCoords = null;
	}}
	on:mousedown={onMouseDown}
	on:mousemove={(e) => {
		mouseCoords = [e.clientX, e.clientY];
	}}
	on:mouseup={() => {
		clickCoords = null;
		mouseCoords = null;
	}}
/>

{#if clickCoords}
	<div
		class="radial-menu-wrapper"
		{style}
		transition:scale={{ start: 0.9, duration: 150, easing: sineInOut }}
	>
		<div class="ring" data-has-selected={selected !== null} />
		<ul class="radial-menu">
			{#each menuItems.slice(0, menuItems.length) as item, i}
				{selected === i && console.log(item.label, selected === i, selected, i)}
				<li class="item" style={getItemStyle(i)} data-selected={selected === i}>
					<i class={`ti ti-${item.icon}`} />
				</li>
			{/each}
			<div class="inner">
				{#if selected !== null}
					<span class="label">{menuItems[selected].label}</span>
				{/if}
			</div>
		</ul>
	</div>
{/if}

<style lang="scss">
	$size-num: 300;
	$size: toRem($size-num);

	.radial-menu-wrapper {
		position: absolute;
		top: var(--mouseY);
		left: var(--mouseX);
		translate: -50% -50%;
	}

	.ring {
		position: absolute;
		top: 50%;
		left: 50%;
		translate: -50% -50%;

		$ring-size-num: $size-num + 32;
		$ring-size: toRem($ring-size-num);
		width: $ring-size;
		height: $ring-size;

		background-color: var(--color-gray-11);
		border-radius: 100%;

		&[data-has-selected='true'] {
			background: conic-gradient(
				from var(--selectedAngle),
				var(--color-gray-11) var(--ringPercent),
				var(--color-gray-9) 0,
				var(--color-gray-9) 100%
			);
		}

		&::after {
			content: '';
			background-color: var(--color-gray-12);
			border-radius: 100%;
			position: absolute;
			top: 50%;
			left: 50%;
			translate: -50% -50%;

			$gap-size: toRem($ring-size-num - 24);
			width: $gap-size;
			height: $gap-size;
		}
	}

	.radial-menu {
		position: relative;
		overflow: hidden;

		background-color: var(--color-gray-11);
		border-radius: var(--radius-full);

		width: $size;
		height: $size;
	}

	.inner {
		background-color: var(--color-gray-12);
		border-radius: var(--radius-full);

		position: absolute;
		left: 50%;
		top: 50%;
		translate: -50% -50%;

		$innerSize: calc(0.5 * $size);
		width: $innerSize;
		height: $innerSize;
	}

	.label {
		position: absolute;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
		z-index: 999;
	}

	.item {
		display: block;
		$itemSize: toRem(200);
		width: $itemSize;
		height: $itemSize;

		position: absolute;
		bottom: 50%;
		right: 50%;

		background-color: var(--color-gray-11);
		border-right: 1px solid var(--color-gray-10);

		transform-origin: 100% 100% 0px;
		transform: rotate(var(--rotate)) skew(var(--skew));

		transition: background 200ms ease;

		&[data-selected='true'] {
			background-color: var(--color-gray-10);
		}

		i {
			position: absolute;
			top: var(--top);
			left: var(--left);

			transform: skew(calc(var(--skew) * -1)) rotate(calc(var(--rotate) * -1));
			font-size: 1.5rem;
		}
	}
</style>
