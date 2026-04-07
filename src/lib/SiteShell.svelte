<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { m } from '$lib/paraglide/messages.js';
	import { extractLocaleFromUrl, localizeHref } from '$lib/paraglide/runtime.js';
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

<style>
	.site-shell {
		--shell-gutter: var(--space-32);
		font-family: var(--font-body);
		background-color: var(--site-bg);
		color: var(--site-text);
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		position: relative;
		overflow-x: hidden;
		transition:
			background-color 0.45s ease,
			color 0.45s ease;
	}

	.site-shell__frame,
	.site-shell__page {
		position: relative;
		width: min(100%, var(--site-max-width));
		margin-inline: auto;
		padding-inline: var(--shell-gutter);
		box-sizing: border-box;
	}

	.site-shell__page {
		z-index: 10;
		display: flex;
		flex: 1;
		flex-direction: column;
	}

	.site-shell :global(a) {
		transition:
			color 0.25s ease,
			text-decoration-color 0.25s ease,
			background-color 0.25s ease,
			border-color 0.25s ease;
	}

	.site-shell :global(a:focus-visible) {
		outline: 2px solid var(--site-accent);
		outline-offset: 3px;
	}

	nav,
	footer {
		position: relative;
		box-sizing: border-box;
	}

	nav {
		z-index: 20;
		display: grid;
		grid-template-columns: 1fr auto 1fr;
		align-items: center;
		padding-block: 1.2rem;
	}

	nav::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		height: 1px;
		background: var(--site-rule);
		transition: background-color 0.45s ease;
	}

	nav > a {
		justify-self: start;
		font-size: var(--text-body);
		letter-spacing: 0.08em;
		color: var(--site-accent);
		text-decoration: none;
	}

	nav > a:hover {
		color: var(--site-text);
	}

	.page-links {
		display: flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-24);
	}

	.page-links a {
		font-size: var(--text-body);
		color: var(--site-text-muted);
		text-decoration: none;
	}

	.page-links a:hover,
	.page-links a.active {
		color: var(--site-accent);
	}

	.nav-controls {
		justify-self: end;
		display: flex;
		align-items: center;
		gap: 0.75rem;
	}

	.theme-toggle {
		justify-self: end;
		background: none;
		border: 1px solid var(--site-rule);
		color: var(--site-text-muted);
		font-family: var(--font-body);
		font-size: 1rem;
		cursor: pointer;
		width: 2rem;
		height: 2rem;
		border-radius: var(--radius-round);
		display: none;
		align-items: center;
		justify-content: center;
		padding: 0;
		transition:
			border-color 0.45s ease,
			color 0.45s ease,
			background-color 0.45s ease;
	}

	:global(html.js) .site-shell .theme-toggle {
		display: flex;
	}

	.theme-toggle:hover {
		border-color: var(--site-accent);
		color: var(--site-accent);
	}

	.theme-toggle__icon {
		width: 0.8rem;
		height: 0.8rem;
		max-width: 100%;
		max-height: 100%;
		display: block;
		overflow: hidden;
		flex-shrink: 0;
	}

	.theme-toggle__sun *,
	.theme-toggle__moon * {
		fill: none;
		stroke: currentColor;
		stroke-width: 1.75;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.theme-toggle__sun,
	.theme-toggle__moon {
		transform-origin: 12px 12px;
	}

	.theme-toggle__sun {
		opacity: 1;
	}

	.theme-toggle__moon {
		opacity: 0;
	}

	.theme-toggle.is-dark .theme-toggle__sun {
		opacity: 0;
	}

	.theme-toggle.is-dark .theme-toggle__moon {
		opacity: 1;
	}

	footer {
		display: flex;
		align-items: center;
		justify-content: center;
		padding-block: var(--space-24);
		margin-top: auto;
	}

	footer::before {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		height: 1px;
		background: var(--site-rule);
		transition: background-color 0.45s ease;
	}

	footer span {
		font-size: var(--text-caption);
		color: var(--site-text-muted);
		letter-spacing: 0.08em;
		transition: color 0.45s ease;
	}

	@media (max-width: 768px) {
		.site-shell {
			--shell-gutter: var(--space-24);
		}

		nav {
			grid-template-columns: auto 1fr auto;
			padding-block: 1rem;
		}

		.page-links {
			gap: var(--space-16);
		}

		.nav-controls {
			gap: 0.5rem;
		}
	}
</style>
