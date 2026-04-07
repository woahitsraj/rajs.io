<script lang="ts">
	import DetailList from '$lib/DetailList.svelte';

	interface Props {
		title: string;
		metaParts?: string[];
		details?: string[];
		href?: string;
		embed?: string;
		revealClass?: string;
		metaBaffle?: boolean;
	}

	let {
		title,
		metaParts = [],
		details = [],
		href,
		embed,
		revealClass = 'reveal-2',
		metaBaffle = false
	}: Props = $props();

	function baffleAttributes(enabled: boolean) {
		return enabled ? { 'data-baffle': true } : {};
	}
</script>

<section class={`entry-card page-grid__item page-grid__item--full reveal ${revealClass}`.trim()}>
	<h2 class="entry-card__title">
		{#if href}
			<a {href} target="_blank" rel="noopener noreferrer" data-baffle>{title}</a>
		{:else}
			<span data-baffle>{title}</span>
		{/if}
	</h2>

	{#if metaParts.length > 0}
		<p class="entry-card__meta">
			{#each metaParts as part, index (part)}
				<span {...baffleAttributes(metaBaffle)}>{part}</span>
				{#if index < metaParts.length - 1}
					<span class="entry-card__separator" aria-hidden="true">·</span>
				{/if}
			{/each}
		</p>
	{/if}

	<DetailList items={details} />

	{#if embed}
		<div class="entry-card__video">
			<iframe
				src={embed}
				{title}
				loading="lazy"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowfullscreen
			></iframe>
		</div>
	{/if}
</section>

<style>
	.entry-card__title {
		font-family: var(--font-display);
		font-size: 1.5rem;
		line-height: 1.2;
		letter-spacing: -0.02em;
		margin: 0 0 0.5rem;
		color: var(--site-text);
		transition: color 0.45s ease;
	}

	.entry-card__title a {
		color: var(--site-accent);
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		font-weight: inherit;
		text-decoration-line: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 0.16em;
		text-decoration-color: color-mix(in srgb, var(--site-accent) 45%, transparent);
		transition:
			color 0.25s ease,
			text-decoration-color 0.25s ease;
	}

	.entry-card__title a::after {
		content: '↗';
		font-size: 0.9rem;
		line-height: 1;
	}

	.entry-card__title a:hover {
		color: var(--site-text);
		text-decoration-color: var(--site-accent);
	}

	.entry-card__meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.35rem;
		font-size: var(--text-caption);
		letter-spacing: 0.04em;
		color: var(--site-text-muted);
		margin: 0 0 var(--space-16);
	}

	.entry-card__video {
		margin-top: var(--space-24);
		border: 1px solid var(--site-border);
		border-radius: calc(var(--radius-card) - 2px);
		overflow: hidden;
		background: rgba(0, 0, 0, 0.18);
		box-shadow: 0 8px 24px var(--site-shadow);
		transition:
			border-color 0.45s ease,
			box-shadow 0.45s ease,
			background-color 0.45s ease;
	}

	.entry-card__video iframe {
		display: block;
		width: 100%;
		aspect-ratio: 16 / 9;
		border: 0;
	}
</style>
