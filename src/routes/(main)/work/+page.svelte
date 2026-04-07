<script lang="ts">
	import EntryCard from '$lib/EntryCard.svelte';
	import PageGrid from '$lib/PageGrid.svelte';
	import PageIntro from '$lib/PageIntro.svelte';
	import { m } from '$lib/paraglide/messages.js';

	const projects = [
		{
			name: 'Svelte Summit Partial Hydration Talk',
			href: 'https://youtu.be/pJcbZr5VlV4?t=28774',
			embed: 'https://www.youtube.com/embed/pJcbZr5VlV4?start=28774',
			stack: 'Svelte, SvelteKit, Vite, TypeScript',
			details: [m.work_project_1_detail_1()]
		},
		{
			name: 'Flattered',
			href: 'http://flattered.se/',
			stack: 'Svelte, TypeScript, GraphQL, Node',
			details: [m.work_project_2_detail_1(), m.work_project_2_detail_2()]
		},
		{
			name: 'Sweden e-commerce template',
			href: 'https://www.demostore.se/',
			stack: 'React, TypeScript, Apollo, GraphQL, Node',
			details: [m.work_project_3_detail_1()]
		}
	];

	const revealClasses = ['reveal-2', 'reveal-3', 'reveal-4'];

	function cardRevealClass(index: number) {
		return revealClasses[index] ?? 'reveal-5';
	}
</script>

<svelte:head>
	<title>{m.work_title()} | {m.profile_name()}</title>
</svelte:head>

<PageIntro
	eyebrow={m.work_head_eyebrow()}
	heading={m.work_head_heading()}
	subtitle={m.work_head_subtitle()}
/>

<PageGrid>
	{#each projects as project, index (project.name)}
		<EntryCard
			title={project.name}
			href={project.href}
			metaParts={[project.stack]}
			details={project.details}
			embed={project.embed}
			revealClass={cardRevealClass(index)}
		/>
	{/each}
</PageGrid>
