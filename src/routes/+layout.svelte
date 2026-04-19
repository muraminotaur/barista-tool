<script lang="ts">
	import favicon from '$lib/assets/favicon.png';

	let { children } = $props();

	//this is for build/load performance
	// export const prerender = true;
	//okay so this does not go here and will not effect performance at all.
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>BaristaToolkit</title>
</svelte:head>

{@render children?.()}
