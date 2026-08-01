<script lang="ts">
	import Drink from "./drink.svelte";
	import Header from "$lib/components/Header.svelte";
</script>

<Header/>
<div class="title">
	<h1>BaristaToolkit</h1>
	<p>Nutritional information calculator</p>
</div>

<Drink/>

<div class="notes">
	<h3>Mino's Notes</h3>
	<div class="version">
		<a href="https://github.com/muraminotaur/barista-tool" target="_blank" rel="noreferrer">
			<code>version-1.4 (hanwoo)</code>
		</a>
	</div>

	<h5>Additions</h5>
	<ul>
		<li>Presets!</li>
	</ul>
	<div class="subnote">
		Currently there are presets for all Medium Iced <i>Jet Coffee</i> Jet Squad drinks. 
		The UI for the select boxes don't update properly, but the underlying calculations are correct and present.
	</div>
	<h5>Changes</h5>
	<ul>
		<li>Change of lemonade formula in home store, data updated.</li>
		<li style="margin-left:2em">Because of this, chiller mix was also updated.</li>
	</ul>
	<!-- <h5>Things that don't work</h5>
	<ul>
		<li>Autofill blocks/guided mode</li>
	</ul> -->
</div>

<style lang="css">
	@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap');

	:global{
		:root {
			/* using the flexoki palette for themeing */
			--primary-1: #F7EDDE;
			--primary-2: #F9F5F1;
			--accent: #878580;
			--accent-highlight: rgba(135, 133, 128, 0.1);
			--text-1: #0E0707;
			--text-2: #261312;
			--secondary-1: #EBD3AD;
			--secondary-2: #CFA88C;
	
			font-family: "IBM Plex Mono", Courier, monospace;
			font-kerning: -0.05ch;
			color: var(--text-2);
			background: var(--primary-1);

			--border-width: 0.25ch;
			--border-radius: 2ch;
		}
		::selection {
			color: var(--text-1);
			background: var(--secondary-2);
		}
		::-moz-selection {
			color: var(--text-1);
			background: var(--secondary-2);
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
		border-radius: var(--border-radius);
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
		border-radius: var(--border-radius);
		padding: 0.75ch;
	}
	.notes a {
		text-decoration: none;
	}

	.subnote {
		font-size: 11pt;
		background-color: var(--accent-highlight);
		width: fit-content;
		margin: 2ch;
		padding: 1ch;
		border-radius: var(--border-radius);
		border: var(--border-width) solid var(--accent);
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