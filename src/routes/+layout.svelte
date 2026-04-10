<script lang="ts">
	import '../app.css';
	import NavigationTransitions from '$lib/NavigationTransitions.svelte';
	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<NavigationTransitions />

{@render children?.()}
