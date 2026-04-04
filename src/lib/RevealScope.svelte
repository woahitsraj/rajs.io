<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		children?: import('svelte').Snippet;
	}

	let { children }: Props = $props();
	let visible = $state(false);
	let revealFrame = 0;
	let revealTimeout = 0;

	onMount(() => {
		revealFrame = requestAnimationFrame(() => {
			revealTimeout = window.setTimeout(() => {
				visible = true;
			}, 50);
		});

		return () => {
			cancelAnimationFrame(revealFrame);
			clearTimeout(revealTimeout);
		};
	});
</script>

<div class="reveal-scope" class:visible>
	{@render children?.()}
</div>
