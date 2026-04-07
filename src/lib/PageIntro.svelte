<script lang="ts">
	interface Props {
		eyebrow: string;
		heading: string;
		subtitle: string;
		revealClass?: string;
	}

	let { eyebrow, heading, subtitle, revealClass = 'reveal-1' }: Props = $props();
</script>

<header class={`page-intro reveal ${revealClass}`.trim()}>
	<p class="page-intro__eyebrow" data-baffle>{eyebrow}</p>
	<h1 class="page-intro__heading" data-baffle>{heading}</h1>
	<p class="page-intro__subtitle" data-baffle>{subtitle}</p>
</header>

<style>
	.page-intro {
		padding: var(--space-48) 0 var(--space-24);
		display: flex;
		flex-direction: column;
		gap: var(--space-12);
		max-width: 52rem;
	}

	.page-intro__eyebrow {
		font-size: var(--text-body);
		font-style: italic;
		color: var(--site-text-muted);
		margin: 0;
	}

	.page-intro__heading {
		font-family: var(--font-display);
		font-size: clamp(3rem, 7vw, 6rem);
		font-weight: 300;
		line-height: 1;
		margin: 0;
		letter-spacing: -0.03em;
		color: var(--site-text);
		transition: color 0.45s ease;
	}

	.page-intro__subtitle {
		font-size: var(--text-subtitle);
		color: var(--site-text-muted);
		margin: 0;
		letter-spacing: 0.02em;
		transition: color 0.45s ease;
	}

	@media (max-width: 768px) {
		.page-intro {
			padding: var(--space-32) 0 var(--space-24);
		}

		.page-intro__heading {
			line-height: 1;
		}
	}
</style>
