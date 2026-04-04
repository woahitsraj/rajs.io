<script lang="ts">
	import { base } from '$app/paths';
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import RevealScope from '$lib/RevealScope.svelte';

	interface Props {
		children?: import('svelte').Snippet;
		footerText?: string;
	}

	let { children, footerText = 'Rajan Singh' }: Props = $props();
	let pathname = $derived(page.url.pathname);
	let dark = $state(false);

	onMount(() => {
		try {
			const stored = localStorage.getItem('site-theme');
			if (stored !== null) dark = stored === 'dark';
			else dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		} catch {
			/* noop */
		}
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

<div class="site-shell" class:dark>
	<div class="noise" aria-hidden="true"></div>

	<nav>
		<a href={`${base}/`}>Home</a>
		<div class="page-links">
			<a href={`${base}/work`} class:active={pathname === `${base}/work`}>Work</a>
			<a href={`${base}/experience`} class:active={pathname === `${base}/experience`}>Experience</a>
		</div>
		<button onclick={toggle} aria-label="toggle theme">
			{dark ? '○' : '●'}
		</button>
	</nav>

	{#key pathname}
		<RevealScope>
			{@render children?.()}
		</RevealScope>
	{/key}

	<footer>
		<span>{footerText}</span>
	</footer>
</div>
