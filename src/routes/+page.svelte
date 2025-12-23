<script lang="ts">
	import Drink from "./drink.svelte";
</script>

<div class="title">
	<h1>BaristaToolkit</h1>
	<p>Nutritional information calculator</p>
</div>

<Drink/>

<style lang="css">
	:root {
		/* using the flexoki palette for themeing */
		--primary-1: #F2F0E5;
		--primary-2: #E6E4D9;
		--primary-3: #DAD8CE;
		--accent: #878580;
		--text-1: #282726;
		--text-2: #1C1B1A;

		font-family: 'DM Mono', Courier, monospace;
		color: var(--text-2);
		background: var(--primary-1);
	}

	.title {
		margin: 1ch;
		padding: 0.5ch;
	}
</style>