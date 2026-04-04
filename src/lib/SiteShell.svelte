<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import RevealScope from '$lib/RevealScope.svelte';

	interface Props {
		children?: import('svelte').Snippet;
		footerText?: string;
	}

	const LIGHT_THEME = '#f3ede3';
	const DARK_THEME = '#15110d';

	let { children, footerText = 'Rajan Singh' }: Props = $props();
	let pathname = $derived(page.url.pathname);
	let dark = $state(false);

	function applyTheme(nextDark: boolean) {
		dark = nextDark;

		const root = document.documentElement;
		const theme = nextDark ? 'dark' : 'light';
		root.dataset.theme = theme;

		const themeMeta = document.querySelector('meta[name="theme-color"]');
		themeMeta?.setAttribute('content', nextDark ? DARK_THEME : LIGHT_THEME);
	}

	onMount(() => {
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

		try {
			const stored = localStorage.getItem('site-theme');
			applyTheme(stored !== null ? stored === 'dark' : prefersDark);
		} catch {
			applyTheme(prefersDark);
		}
	});

	function toggle() {
		const nextDark = !dark;
		applyTheme(nextDark);

		try {
			localStorage.setItem('site-theme', nextDark ? 'dark' : 'light');
		} catch {
			/* noop */
		}
	}
</script>

<div class="site-shell">
	<nav class="site-shell__frame">
		<a href={`${base}/`}>Home</a>
		<div class="page-links">
			<a href={`${base}/work`} class:active={pathname === `${base}/work`}>Work</a>
			<a href={`${base}/experience`} class:active={pathname === `${base}/experience`}>Experience</a>
		</div>
		<button class="theme-toggle" class:is-dark={dark} onclick={toggle} aria-label="toggle theme">
			<span class="theme-toggle__glyph" aria-hidden="true">
				<span class="theme-toggle__dot"></span>
			</span>
		</button>
	</nav>

	<div class="site-shell__page">
		{#key pathname}
			<RevealScope>
				{@render children?.()}
			</RevealScope>
		{/key}
	</div>

	<footer class="site-shell__frame">
		<span>{footerText}</span>
	</footer>
</div>
