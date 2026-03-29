<script lang="ts">
	import Footer from '$lib/Footer.svelte';
	import './normalize.css';
	import 'water.css/out/water.min.css';
	import './styles.css';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<main>
	{@render children?.()}
</main>
<Footer />
