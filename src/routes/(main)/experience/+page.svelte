<script lang="ts">
	import { m } from '../../../paraglide/messages.js';

	const experience = [
		{
			role: m.exp_1_role(),
			company: 'Glide',
			period: m.exp_1_period(),
			details: [m.exp_1_detail_1()]
		},
		{
			role: m.exp_2_role(),
			company: 'Subscribe Inc',
			period: m.exp_2_period(),
			details: [m.exp_2_detail_1(), m.exp_2_detail_2()]
		},
		{
			role: m.exp_3_role(),
			company: 'Hyperlab AB',
			period: m.exp_3_period(),
			details: [m.exp_3_detail_1(), m.exp_3_detail_2()]
		},
		{
			role: m.exp_4_role(),
			company: 'Hyperlab AB',
			period: m.exp_4_period(),
			details: [m.exp_4_detail_1(), m.exp_4_detail_2()]
		},
		{
			role: m.exp_5_role(),
			company: 'Founded Technologies Inc.',
			period: m.exp_5_period(),
			details: [m.exp_5_detail_1()]
		},
		{
			role: m.exp_6_role(),
			company: 'Workday Inc',
			period: m.exp_6_period(),
			details: []
		}
	];
</script>

<svelte:head>
	<title>{m.experience_title()} | {m.profile_name()}</title>
</svelte:head>

<header class="page-head reveal reveal-1">
	<p class="eyebrow" data-baffle>{m.experience_head_eyebrow()}</p>
	<h1 data-baffle>{m.experience_head_heading()}</h1>
	<p class="subtitle" data-baffle>{m.experience_head_subtitle()}</p>
</header>

<main class="grid">
	{#each experience as item, index (item.role + item.company + item.period)}
		<section
			class="span-full entry-card reveal"
			class:reveal-2={index === 0}
			class:reveal-3={index === 1}
			class:reveal-4={index === 2}
			class:reveal-5={index >= 3}
		>
			<h2 data-baffle>{item.role}</h2>
			<p class="entry-meta">
				<span data-baffle>{item.company}</span> <span aria-hidden="true">·</span>
				<span data-baffle>{item.period}</span>
			</p>
			{#if item.details.length > 0}
				<ul class="detail-list">
					{#each item.details as detail (detail)}
						<li data-baffle>{detail}</li>
					{/each}
				</ul>
			{/if}
		</section>
	{/each}
</main>
