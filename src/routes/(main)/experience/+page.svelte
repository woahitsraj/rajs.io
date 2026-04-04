<script lang="ts">
	const experience = [
		{
			role: 'Senior Software Engineer',
			company: 'Glide',
			period: 'April 2024 - Present',
			details: [
				'Worked across the stack, fully owning and delivering several critical features including report generation with advanced filtering, object generation using LLMs/AI, and cron scheduling.'
			]
		},
		{
			role: 'Staff Software Engineer',
			company: 'Subscribe Inc',
			period: 'September 2022 - April 2024',
			details: [
				'Worked on a large React and TypeScript-based subscription billing application with many stakeholders and complicated requirements as the most senior member of the frontend team.',
				'Introduced automated testing through Playwright, built tools to help other developers work with complicated forms, and consistently shipped critical features to customers.'
			]
		},
		{
			role: 'Director of Engineering',
			company: 'Hyperlab AB',
			period: 'February 2022 - September 2022',
			details: [
				'Held 1:1s with engineers, interacted directly with customers, and worked with other leadership to quickly deliver work to clients.',
				'Continued to be heavily involved in development in Svelte and worked on individual stores as well as an overall e-commerce framework for reusability of common patterns.'
			]
		},
		{
			role: 'Senior Frontend Engineer',
			company: 'Hyperlab AB',
			period: 'February 2018 - February 2022',
			details: [
				'E-commerce development primarily in React using server-side rendering, TypeScript, GraphQL, Webpack, and other cutting-edge web technologies.',
				'Focused on performance, caching, and tooling to deliver lightweight yet fully featured web apps using Svelte.'
			]
		},
		{
			role: 'Software Engineer',
			company: 'Founded Technologies Inc.',
			period: 'October 2016 - December 2017',
			details: ['Helped build a web application to automate small business legal needs in Canada.']
		},
		{
			role: 'Software Engineer',
			company: 'Workday Inc',
			period: 'July 2014 - August 2015',
			details: []
		}
	];
</script>

<svelte:head>
	<title>Experience | Rajan Singh</title>
</svelte:head>

<header class="page-head reveal reveal-1">
	<p class="eyebrow">Work Experience</p>
	<h1>Experience</h1>
	<p class="subtitle">Roles and responsibilities across my professional career.</p>
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
			<h2>{item.role}</h2>
			<p class="entry-meta">{item.company} <span aria-hidden="true">·</span> {item.period}</p>
			{#if item.details.length > 0}
				<ul class="detail-list">
					{#each item.details as detail (detail)}
						<li>{detail}</li>
					{/each}
				</ul>
			{/if}
		</section>
	{/each}
</main>
