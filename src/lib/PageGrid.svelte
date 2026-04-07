<script lang="ts">
	interface Props {
		children?: import('svelte').Snippet;
		className?: string;
	}

	let { children, className = '' }: Props = $props();
</script>

<main class={`page-grid ${className}`.trim()}>
	{@render children?.()}
</main>

<style>
	.page-grid {
		display: grid;
		grid-template-columns: repeat(3, minmax(0, 1fr));
		gap: var(--space-16);
		padding: 0 0 var(--space-32);
	}

	.page-grid :global(.page-grid__item) {
		background: var(--site-surface);
		border: 1px solid var(--site-border);
		border-radius: var(--radius-card);
		padding: var(--space-24);
		box-shadow: 0 4px 24px var(--site-shadow);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
		transition-property: opacity, transform, background-color, border-color, box-shadow;
		transition-duration: 0.7s, 0.7s, 0.45s, 0.45s, 0.45s;
		transition-timing-function: ease, ease, ease, ease, ease;
		transition-delay: 0s, 0s, 0s, 0s, 0s;
	}

	.page-grid :global(.page-grid__item--wide) {
		grid-column: span 2;
	}

	.page-grid :global(.page-grid__item--full) {
		grid-column: 1 / -1;
	}

	@media (max-width: 900px) {
		.page-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
	}

	@media (max-width: 768px) {
		.page-grid {
			grid-template-columns: 1fr;
			padding: 0 0 var(--space-32);
		}

		.page-grid :global(.page-grid__item--wide) {
			grid-column: span 1;
		}
	}
</style>
