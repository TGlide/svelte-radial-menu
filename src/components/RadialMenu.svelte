<script lang="ts" context="module">
	export type MenuItem = {
		icon: string;
		label: string;
	};
</script>

<script lang="ts">
	import { scale } from 'svelte/transition';
	import { sineInOut } from 'svelte/easing';

	export let menuItems: MenuItem[];

	let selected: number | null = null;
	let mouseCoords: [number, number] | null = null;

	$: [skew, top, left] = (function getProperties() {
		switch (menuItems.length) {
			case 3:
				return [-30, 48, 40];
			case 4:
				return [0, 55, 55];
			case 5:
				return [18, 62, 59];
			case 6:
				return [30, 66, 63];
			case 7:
				return [38.5, 69, 65];
			case 8:
				return [45, 72, 65];
			default:
				return [0];
		}
	})();

	$: style = [
		`--skew: ${skew}deg`,
		`--top: ${top}%`,
		`--left: ${left}%`,
		`--mouseX: ${mouseCoords ? mouseCoords[0] : 0}px`,
		`--mouseY: ${mouseCoords ? mouseCoords[1] : 0}px`,
	].join(';');

	function getItemStyle(i: number) {
		const rotate = (360 / menuItems.length) * i - 90;
		return `--rotate: ${rotate}deg`;
	}
</script>

<svelte:window
	on:mousedown={(e) => {
		mouseCoords = [e.clientX, e.clientY];
	}}
	on:mouseup={() => {
		mouseCoords = null;
		selected = null;
	}}
/>

{#if mouseCoords}
	<ul
		class="radial-menu"
		{style}
		transition:scale={{ start: 0.9, duration: 150, easing: sineInOut }}
	>
		{#each menuItems.slice(0, menuItems.length) as item, i}
			<li
				class="item"
				style={getItemStyle(i)}
				data-selected={selected === i}
				on:mouseover={() => (selected = i)}
				on:focus={() => (selected = i)}
			>
				<i class={`ti ti-${item.icon}`} />
			</li>
		{/each}
		<div class="inner" on:mouseover={() => (selected = null)} on:focus={() => (selected = null)}>
			{#if selected !== null}
				<span class="label">{menuItems[selected].label}</span>
			{/if}
		</div>
	</ul>
{/if}

<style lang="scss">
	$size: toRem(300);

	.radial-menu {
		background-color: var(--color-gray-11);
		border-radius: var(--radius-full);

		overflow: hidden;

		width: $size;
		height: $size;

		position: absolute;
		top: var(--mouseY);
		left: var(--mouseX);
		translate: -50% -50%;

		user-select: none;
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
