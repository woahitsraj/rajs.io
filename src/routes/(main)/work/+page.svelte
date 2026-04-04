<script lang="ts">
	const projects = [
		{
			name: 'Svelte Summit Partial Hydration Talk',
			href: 'https://youtu.be/pJcbZr5VlV4?t=28774',
			embed: 'https://www.youtube.com/embed/pJcbZr5VlV4?start=28774',
			stack: 'Svelte, SvelteKit, Vite, TypeScript',
			details: [
				'Gave a talk at the first in-person Svelte Summit in fall 2022 about partial hydration to improve performance in e-commerce sites.'
			]
		},
		{
			name: 'Flattered',
			href: 'http://flattered.se/',
			stack: 'Svelte, TypeScript, GraphQL, Node',
			details: [
				'Fast, responsive, and stylish e-commerce site built with cutting-edge web technology.',
				'Handled localization, internationalization, geo-IP redirect, currency formatting, SEO, Google Tag Manager, and Google Analytics.'
			]
		},
		{
			name: 'Sweden e-commerce template',
			href: 'https://www.demostore.se/',
			stack: 'React, TypeScript, Apollo, GraphQL, Node',
			details: [
				'Developed a re-stylable template used by one UI library with server-side rendering, analytics, and many other features used by one of Sweden’s largest e-commerce providers.'
			]
		}
	];
</script>

<svelte:head>
	<title>Work | Rajan Singh</title>
</svelte:head>

<header class="page-head reveal reveal-1">
	<p class="eyebrow">Stuff I&apos;ve done</p>
	<h1>Work</h1>
	<p class="subtitle">Selected projects, web sites, and talks.</p>
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
