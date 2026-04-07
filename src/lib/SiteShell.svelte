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
					type="button"
					onclick={toggle}
					aria-label={m.theme_toggle_aria()}
					aria-pressed={dark}
				>
					<svg class="theme-toggle__icon" viewBox="0 0 24 24" aria-hidden="true">
						<g class="theme-toggle__sun">
							<circle class="theme-toggle__sun-core" cx="12" cy="12" r="4"></circle>
							<g class="theme-toggle__rays">
								<path d="M12 2.75v2.5"></path>
								<path d="M12 18.75v2.5"></path>
								<path d="m5.46 5.46 1.77 1.77"></path>
								<path d="m16.77 16.77 1.77 1.77"></path>
								<path d="M2.75 12h2.5"></path>
								<path d="M18.75 12h2.5"></path>
								<path d="m5.46 18.54 1.77-1.77"></path>
								<path d="m16.77 7.23 1.77-1.77"></path>
							</g>
						</g>
						<g class="theme-toggle__moon">
							<path d="M15.5 4.5a7.5 7.5 0 1 0 0 15 8 8 0 1 1 0-15Z"></path>
						</g>
					</svg>
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
