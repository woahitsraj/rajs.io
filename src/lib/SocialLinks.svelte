<script lang="ts">
	import type { SimpleIcon } from 'simple-icons';

	type LinkIcon = Pick<SimpleIcon, 'path'>;

	interface SocialLink {
		label: string;
		href: string;
		icon?: LinkIcon;
	}

	interface Props {
		links: SocialLink[];
	}

	let { links }: Props = $props();
</script>

<div class="social-links">
	{#each links as link (link.href)}
		<a href={link.href} target="_blank" rel="noopener noreferrer" class:text-only={!link.icon}>
			{#if link.icon}
				<span class="social-links__icon" aria-hidden="true">
					<svg viewBox="0 0 24 24" focusable="false">
						<path d={link.icon.path}></path>
					</svg>
				</span>
			{/if}
			<span class="social-links__label" data-baffle>{link.label}</span>
		</a>
	{/each}
</div>

<style>
	.social-links {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-12);
	}

	.social-links a {
		display: inline-flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.38rem 1rem 0.38rem 0.42rem;
		border: 1px solid var(--site-border);
		border-radius: var(--radius-pill);
		color: var(--site-text);
		text-decoration: none;
		font-size: var(--text-body);
		line-height: 1;
		background: color-mix(in srgb, var(--site-surface) 88%, var(--site-bg) 12%);
		box-shadow: inset 0 1px 0 var(--site-ring);
		transition:
			border-color 0.45s ease,
			color 0.45s ease,
			background-color 0.45s ease,
			box-shadow 0.45s ease;
	}

	.social-links a.text-only {
		padding-left: 1rem;
	}

	.social-links a:hover {
		border-color: var(--site-accent);
		color: var(--site-text);
		background: color-mix(in srgb, var(--site-accent-soft) 72%, var(--site-surface) 28%);
		box-shadow:
			inset 0 1px 0 var(--site-ring),
			0 8px 20px var(--site-shadow);
	}

	.social-links__icon {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		flex-shrink: 0;
		border-radius: var(--radius-round);
		border: 1px solid color-mix(in srgb, var(--site-accent) 18%, var(--site-border));
		background: color-mix(in srgb, var(--site-accent-soft) 78%, var(--site-bg) 22%);
		color: var(--site-accent);
		transition:
			color 0.45s ease,
			background-color 0.45s ease,
			border-color 0.45s ease;
	}

	.social-links__icon svg {
		width: 1rem;
		height: 1rem;
		display: block;
		fill: currentColor;
	}

	.social-links__label {
		transition: color 0.45s ease;
	}

	.social-links a:hover .social-links__icon {
		color: var(--site-bg);
		background: var(--site-accent);
		border-color: var(--site-accent);
	}
</style>
