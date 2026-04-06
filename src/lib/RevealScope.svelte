<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		children?: import('svelte').Snippet;
	}

	function isLocaleTransitionActive() {
		return (
			typeof document !== 'undefined' &&
			document.documentElement.hasAttribute('data-locale-transition')
		);
	}

	let { children }: Props = $props();
	let visible = $state(isLocaleTransitionActive());
	let revealFrame = 0;
	let revealTimeout = 0;

	onMount(() => {
		if (isLocaleTransitionActive()) {
			visible = true;
			return;
		}

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
