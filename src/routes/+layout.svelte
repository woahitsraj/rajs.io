<script lang="ts">
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import '../app.css';
	import NavigationTransitions from '$lib/NavigationTransitions.svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	inject({ mode: dev ? 'development' : 'production' });

	let { children }: Props = $props();
</script>

<NavigationTransitions />

{@render children?.()}
