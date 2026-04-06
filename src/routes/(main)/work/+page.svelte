<script lang="ts">
	import { m } from '../../../paraglide/messages.js';

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
</script>

<svelte:head>
	<title>{m.work_title()} | {m.profile_name()}</title>
</svelte:head>

<header class="page-head reveal reveal-1">
	<p class="eyebrow">{m.work_head_eyebrow()}</p>
	<h1>{m.work_head_heading()}</h1>
	<p class="subtitle">{m.work_head_subtitle()}</p>
</header>

<main class="grid">
	{#each projects as project, index (project.name)}
		<section
			class="span-full entry-card reveal"
			class:reveal-2={index === 0}
			class:reveal-3={index === 1}
			class:reveal-4={index === 2}
		>
			<h2>
				<a href={project.href} target="_blank" rel="noopener noreferrer">{project.name}</a>
			</h2>
			<p class="entry-meta">{project.stack}</p>
			<ul class="detail-list">
				{#each project.details as detail (detail)}
					<li>{detail}</li>
				{/each}
			</ul>
			{#if project.embed}
				<div class="video-embed">
					<iframe
						src={project.embed}
						title={project.name}
						loading="lazy"
						allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
						allowfullscreen
					></iframe>
				</div>
			{/if}
		</section>
	{/each}
</main>
