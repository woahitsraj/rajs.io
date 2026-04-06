<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { m } from '../paraglide/messages.js';
	import { extractLocaleFromUrl, localizeHref } from '../paraglide/runtime.js';
	import RevealScope from '$lib/RevealScope.svelte';
	import LanguageSelector from '$lib/LanguageSelector.svelte';

	interface Props {
		children?: import('svelte').Snippet;
		footerText?: string;
	}

	const LIGHT_THEME = '#f3ede3';
	const DARK_THEME = '#15110d';

	let { children, footerText = m.profile_name() }: Props = $props();
	let routeId = $derived(page.route.id);
	let currentLocale = $derived(extractLocaleFromUrl(page.url));
	let homeHref = $derived(localizeHref('/', { locale: currentLocale }));
	let workHref = $derived(localizeHref('/work', { locale: currentLocale }));
	let experienceHref = $derived(localizeHref('/experience', { locale: currentLocale }));
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

{#key currentLocale}
	<div class="site-shell">
		<nav class="site-shell__frame">
			<a href={homeHref} data-baffle>{m.nav_home()}</a>
			<div class="page-links">
				<a href={workHref} class:active={routeId === '/(main)/work'} data-baffle>{m.nav_work()}</a>
				<a href={experienceHref} class:active={routeId === '/(main)/experience'} data-baffle>
					{m.nav_experience()}
				</a>
			</div>
			<div class="nav-controls">
				<LanguageSelector />
				<button
					class="theme-toggle"
					class:is-dark={dark}
					onclick={toggle}
					aria-label={m.theme_toggle_aria()}
				>
					<span class="theme-toggle__glyph" aria-hidden="true">
						<span class="theme-toggle__dot"></span>
					</span>
				</button>
			</div>
		</nav>

		<div class="site-shell__page">
			{#key page.url.pathname}
				<RevealScope>
					{@render children?.()}
				</RevealScope>
			{/key}
		</div>

		<footer class="site-shell__frame">
			<span data-baffle>{footerText}</span>
		</footer>
	</div>
{/key}
