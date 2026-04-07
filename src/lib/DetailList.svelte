<script lang="ts">
	interface Props {
		items: string[];
	}

	let { items }: Props = $props();
</script>

{#if items.length > 0}
	<ul class="detail-list">
		{#each items as item (item)}
			<li data-baffle>{item}</li>
		{/each}
	</ul>
{/if}

<style>
	.detail-list {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: var(--space-12);
	}

	.detail-list li {
		position: relative;
		padding-left: 1.25rem;
		font-size: var(--text-body);
		line-height: 1.75;
		color: var(--site-text);
	}

	.detail-list li::before {
		content: '';
		position: absolute;
		top: 0.8rem;
		left: 0;
		width: 0.4rem;
		height: 0.4rem;
		border-radius: var(--radius-round);
		background: var(--site-accent);
	}
</style>
