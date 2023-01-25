<script lang="ts">
	type MenuItem = {
		icon: string;
		label: string;
	};

	const menuItems = [
		{ icon: 'reload', label: 'Reload' },
		{ icon: 'printer', label: 'print' },
		{ icon: 'reload', label: 'Reload' },
		{ icon: 'printer', label: 'print' },
		{ icon: 'reload', label: 'Reload' },
		{ icon: 'printer', label: 'print' },
	] satisfies MenuItem[];

	const skew = (function getSkew() {
		switch (menuItems.length) {
			case 3:
				return -30;
			case 5:
				return 18;
			case 6:
				return 30;
			case 7:
				return 38.5;
			case 8:
				return 45;
			default:
				return 0;
		}
	})();
</script>

<ul class="radial-menu" style:--skew={`${skew}deg`}>
	{#each menuItems as item, i}
		{@const rotate = (360 / menuItems.length) * i - 90}
		<li class="item" style:--rotate={`${rotate}deg`}>
			<div class={`icon i-tabler-${item.icon}`} />
		</li>
	{/each}
</ul>

<style lang="scss">
	.radial-menu {
		background-color: var(--color-gray-11);
		border-radius: var(--radius-full);

		overflow: hidden;

		$size: 300rem / 16;
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

			$innerSize: $size * 0.5;
			width: $innerSize;
			height: $innerSize;
		}
	}

	.item {
		display: block;
		$itemSize: 200rem / 16;
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

		.icon {
			position: absolute;
			top: 70%;
			left: 70%;

			transform: skew(calc(var(--skew) * -1)) rotate(calc(var(--rotate) * -1));
			translate: -50% -50%;
			font-size: 1.5rem;
		}
	}
</style>
