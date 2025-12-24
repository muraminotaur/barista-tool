<script lang="ts">
	import favicon from '$lib/assets/favicon.png';

	let { children } = $props();

	//this is for build/load performance
	export const prerender = true;
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children?.()}
