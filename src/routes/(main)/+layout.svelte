<script lang="ts">
	import SiteShell from '$lib/SiteShell.svelte';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
</script>

<SiteShell>
	{@render children?.()}
</SiteShell>
