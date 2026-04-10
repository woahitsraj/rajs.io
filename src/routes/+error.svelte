<script lang="ts">
	import { page } from '$app/state';
	import SiteShell from '$lib/SiteShell.svelte';
	import { m } from '$lib/paraglide/messages.js';
	import { localizeHref } from '$lib/paraglide/runtime.js';

	let status = $derived(page.status);
	let message = $derived(
		status === 404
			? m.error_not_found_description()
			: (page.error?.message ?? m.error_generic_description())
	);
</script>

<svelte:head>
	<title
		>{status === 404 ? m.error_not_found_title() : m.error_generic_title()} | {m.profile_name()}</title
	>
</svelte:head>

<SiteShell footerText={m.profile_name()}>
	<main class="error-page reveal reveal-1">
		<section class="error-card">
			<p class="error-code">{status}</p>
			<h1 data-baffle>
				{status === 404 ? m.error_not_found_heading() : m.error_generic_description()}
			</h1>
			<p class="error-message" data-baffle>{message}</p>
			<div class="error-actions">
				<a href={localizeHref('/')} data-baffle>{m.error_back_home()}</a>
			</div>
		</section>
	</main>
</SiteShell>

<style>
	.error-page {
		display: flex;
		flex: 1;
		align-items: center;
		justify-content: center;
		padding: var(--space-48) 0;
	}

	.error-card {
		width: min(100%, 42rem);
		background: var(--site-surface);
		border: 1px solid var(--site-border);
		border-radius: calc(var(--radius-card) + 4px);
		padding: clamp(1.75rem, 4vw, 3rem);
		box-shadow: 0 12px 40px var(--site-shadow);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		transition:
			background-color 0.45s ease,
			border-color 0.45s ease,
			box-shadow 0.45s ease;
	}

	.error-code {
		font-family: var(--font-display);
		font-size: clamp(3rem, 9vw, 6rem);
		line-height: 0.9;
		letter-spacing: -0.04em;
		color: var(--site-accent);
		margin: 0 0 0.75rem;
	}

	.error-card h1 {
		font-family: var(--font-display);
		font-size: clamp(2rem, 6vw, 4rem);
		font-weight: 300;
		line-height: 1;
		letter-spacing: -0.03em;
		color: var(--site-text);
		margin: 0 0 1rem;
		transition: color 0.45s ease;
	}

	.error-message {
		font-size: var(--text-body);
		line-height: 1.8;
		color: var(--site-text);
		max-width: 34rem;
		margin: 0 0 1.5rem;
		transition: color 0.45s ease;
	}

	.error-actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-12);
	}

	.error-actions a {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		padding: 0.7rem 1.2rem;
		border: 1px solid var(--site-border);
		border-radius: var(--radius-pill);
		color: var(--site-accent);
		text-decoration: none;
		background: transparent;
		transition:
			border-color 0.45s ease,
			color 0.45s ease,
			background-color 0.45s ease;
	}

	.error-actions a:hover {
		border-color: var(--site-accent);
		background: var(--site-accent-soft);
	}

	@media (max-width: 768px) {
		.error-page {
			padding: var(--space-32) 0;
		}
	}
</style>
