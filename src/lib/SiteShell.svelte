<script lang="ts">
	import { base } from '$app/paths';
	import { onMount } from 'svelte';

	interface Props {
		children?: import('svelte').Snippet;
		footerText?: string;
	}

	let { children, footerText = 'Rajan Singh' }: Props = $props();
	let dark = $state(false);
	let visible = $state(false);

	onMount(() => {
		try {
			const stored = localStorage.getItem('site-theme');
			if (stored !== null) dark = stored === 'dark';
			else dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		} catch {
			/* noop */
		}

		requestAnimationFrame(() => {
			setTimeout(() => {
				visible = true;
			}, 50);
		});
	});

	function toggle() {
		dark = !dark;
		try {
			localStorage.setItem('site-theme', dark ? 'dark' : 'light');
		} catch {
			/* noop */
		}
	}
</script>

<div class="site-shell" class:dark class:visible>
	<div class="noise" aria-hidden="true"></div>

	<nav>
		<a href={`${base}/`}>home</a>
		<button onclick={toggle} aria-label="toggle theme">
			{dark ? '○' : '●'}
		</button>
	</nav>

	{@render children?.()}

	<footer>
		<span>{footerText}</span>
	</footer>
</div>
