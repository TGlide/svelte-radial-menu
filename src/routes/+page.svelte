<script lang="ts">
	import RadialMenu from '$/components/RadialMenu.svelte';

	type MenuItem = {
		icon: string;
		label: string;
	};

	const menuItems = [
		{ icon: 'adjustments-horizontal', label: 'Settings' },
		{ icon: 'arrow-left', label: 'Back' },
		{ icon: 'printer', label: 'Print' },
		{ icon: 'reload', label: 'Reload' },
		{ icon: 'arrow-right', label: 'Forward' },
		{ icon: 'activity', label: 'Activity' },
		{ icon: 'pizza', label: 'Eat!' },
		{ icon: 'printer', label: 'Print' },
	] satisfies MenuItem[];

	let numItems = 6;
</script>

<div class="input-wrapper">
	<label for="numItems">Number of menu items: <b>{numItems}</b></label>
	<input
		name="numItems"
		type="range"
		min="3"
		max={menuItems.length}
		bind:value={numItems}
		on:mousedown={(e) => {
			e.stopPropagation();
		}}
	/>
</div>

<RadialMenu menuItems={menuItems.slice(0, numItems)} />

<style lang="scss">
	.input-wrapper {
		position: absolute;
		top: 128px;
		left: 50%;
		translate: -50% 0;

		display: grid;
		gap: 4px;

		input {
			color: red;
		}
	}
</style>
