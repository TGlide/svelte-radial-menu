<script lang="ts">
	import RadialMenu from '$/components/RadialMenu.svelte';
	import { fade } from 'svelte/transition';

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

	let holdingMouse = false;

	function onMouseDown(e: MouseEvent) {
		const el = e.target as HTMLElement;
		if (el.tagName !== 'BODY') return;
		holdingMouse = true;
	}
</script>

<svelte:window
	on:mousedown={onMouseDown}
	on:mouseup={() => {
		holdingMouse = false;
	}}
/>

<div class="input-wrapper">
	<label for="numItems">Number of menu items: <b>{numItems}</b></label>
	<input name="numItems" type="range" min="3" max={menuItems.length} bind:value={numItems} />
</div>

{#if !holdingMouse}
	<p class="tutorial" transition:fade={{ duration: 150 }}>
		Click and drag anywhere to see the menu.
	</p>
{/if}

<p class="credits">
	<span>
		Done by
		<a href="https://www.thomasglopes.com/" target="_blank" rel="noreferrer">Thomas G. Lopes</a>
	</span>
	<span>
		Based on <a href="https://twitter.com/raunofreiberg" target="_blank" rel="noreferrer">Rauno's</a
		>
		<a href="https://rauno.me/craft/radial-menu" target="_blank" rel="noreferrer">Work</a>
	</span>
</p>

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

	p {
		text-align: center;
	}

	.tutorial {
		position: absolute;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
		pointer-events: none;
	}

	.credits {
		position: absolute;
		bottom: 16px;
		left: 50%;
		translate: -50% 0;

		display: grid;
		gap: 4px;
	}
</style>
