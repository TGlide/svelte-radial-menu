<script lang="ts">
	type MenuItem = {
		icon: string;
		label: string;
	};

	const menuItems = [
		{ icon: 'printer', label: 'Print' },
		{ icon: 'arrow-left', label: 'Back' },
		{ icon: 'printer', label: 'print' },
		{ icon: 'reload', label: 'Reload' },
		{ icon: 'arrow-right', label: 'Forward' },
		{ icon: 'printer', label: 'print' },
		{ icon: 'printer', label: 'print' },
		{ icon: 'printer', label: 'print' },
	] satisfies MenuItem[];

	let numItems = 6;
	let selected: number | null = null;

	$: [skew, top, left] = (function getProperties() {
		switch (numItems) {
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

	$: style = [`--skew: ${skew}deg`, `--top: ${top}%`, `--left: ${left}%`].join(';');
</script>

<div class="input-wrapper">
	<input type="range" min="3" max={menuItems.length} bind:value={numItems} />
</div>

<ul class="radial-menu" {style}>
	{#each menuItems.slice(0, numItems) as item, i}
		{@const rotate = (360 / numItems) * i - 90}
		<li
			class="item"
			role="button"
			style:--rotate={`${rotate}deg`}
			on:mouseover={() => (selected = i)}
			on:focus={() => (selected = i)}
			on:mouseout={() => (selected = null)}
			on:blur={() => (selected = null)}
		>
			<i class={`ti ti-${item.icon}`} />
		</li>
	{/each}
	{#if selected !== null}
		<span class="label">{menuItems[selected].label}</span>
	{/if}
</ul>

<style lang="scss">
	.input-wrapper {
		position: absolute;
		top: 128px;
		left: 50%;
		translate: -50% 0;

		input {
			color: red;
		}
	}

	.radial-menu {
		background-color: var(--color-gray-11);
		border-radius: var(--radius-full);

		overflow: hidden;

		$size: toRem(300);
		width: $size;
		height: $size;

		position: absolute;
		top: 50%;
		left: 50%;
		translate: -50% -50%;

		&::after {
			content: '';

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

		&:hover {
			background-color: var(--color-gray-10);
			cursor: pointer;
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
