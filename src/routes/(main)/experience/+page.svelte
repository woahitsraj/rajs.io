<script lang="ts">
	import EntryCard from '$lib/EntryCard.svelte';
	import PageGrid from '$lib/PageGrid.svelte';
	import PageIntro from '$lib/PageIntro.svelte';
	import { m } from '$lib/paraglide/messages.js';

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

	const revealClasses = ['reveal-2', 'reveal-3', 'reveal-4'];

	function cardRevealClass(index: number) {
		return revealClasses[index] ?? 'reveal-5';
	}
</script>

<svelte:head>
	<title>{m.experience_title()} | {m.profile_name()}</title>
</svelte:head>

<PageIntro
	eyebrow={m.experience_head_eyebrow()}
	heading={m.experience_head_heading()}
	subtitle={m.experience_head_subtitle()}
/>

<PageGrid>
	{#each experience as item, index (item.role + item.company + item.period)}
		<EntryCard
			title={item.role}
			metaParts={[item.company, item.period]}
			metaBaffle={true}
			details={item.details}
			revealClass={cardRevealClass(index)}
		/>
	{/each}
</PageGrid>
