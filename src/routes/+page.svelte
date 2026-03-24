<script lang="ts">
	import Drink from "./drink.svelte";
</script>

<div class="title">
	<h1>BaristaToolkit</h1>
	<p>Nutritional information calculator</p>
</div>

<Drink/>

<div class="notes">
	<h3>Mino's Notes</h3>
	<div class="version">
		<a href="https://github.com/muraminotaur/barista-tool" target="_blank" rel="noreferrer">
			<code>version-1.2.1 (highland-cattle)</code>
		</a>
	</div>

	<h5>1.2.1 HOTFIX UPDATE:</h5>
	<p>
		Freeze mix has been recalculated and is now accurate.
	</p>

	<h5>Additions</h5>
	<p>
		This version update adds more nutritional data, optimizes function calls, and reorganizes code for ease of reading.
	</p>
	<ul>
		<li>Added lemonade, chiller, and apple juice data.</li>
	</ul>
	<h5>Changes</h5>
	<ul>
		<li>Moved array manipulation and regrouping function to <code>utility.ts</code> to optimize performance.</li>
		<li>Set cold brew data to be similar to espresso data.</li>
	</ul>
	<h5>Things that don't work</h5>
	<ul>
		<li>Autofill blocks/guided mode</li>
		<li>Presets</li>
		<li>Blended energy drinks</li>
		<div class="subnote">
			Still need to calculate base unit value. This has been difficult since the energy 
			concentrate nutritional information isn't listed anywhere and I'm unable to find
			resources that would point me to this. For now, assume it's very high in sugar and sodium.
		</div>
	</ul>
</div>

<style lang="css">
	@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');

	:global{
		:root {
			/* using the flexoki palette for themeing */
			--primary-1: #F2F0E5;
			--primary-2: #E6E4D9;
			--primary-3: #DAD8CE;
			--accent: #878580;
			--accent-highlight: rgba(135, 133, 128, 0.1);
			--text-1: #282726;
			--text-2: #1C1B1A;
	
			font-family: "IBM Plex Mono", Courier, monospace;
			font-kerning: -0.05ch;
			color: var(--text-2);
			background: var(--primary-1);
		}
	}

	.title {
		margin: 1ch auto;
		width: 50%;
		padding: 0.5ch;
		text-align: center;
	}

	.version {
		text-align: center;
	}

	.notes {
		margin: 1em auto;
		width: 40%;
		border: solid 1px var(--accent);
		border-radius: 2ch;
		padding: 1em;
	}
	.notes h3 {
		text-align: center;
		font-weight: 400;
		font-style: italic;
	}
	.notes code {
		background-color: var(--accent-highlight);
		border: 1px solid var(--accent);
		border-radius: 2ch;
		padding: 0.75ch;
	}
	.notes a {
		text-decoration: none;
	}

	.subnote {
		font-style: italic;
		font-size: 11pt;
		background-color: var(--accent-highlight);
		width: fit-content;
		margin: 1ch;
	}
	ul li {
		margin: 0%;
	}

	@media only screen and (max-width: 640px) {
		.title {
			width: auto;
		}
		.notes {
			font-size: 10pt;
			width: auto;
			margin: 1ch;
		}
		.subnote {
			font-size: 10pt;
			font-style: normal;
		}
	}
</style>