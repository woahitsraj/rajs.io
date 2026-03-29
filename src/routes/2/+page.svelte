<script lang="ts">
	import { onMount } from 'svelte';

	let dark = $state(false);

	const marqueeItems = [
		'REACT',
		'SVELTE',
		'TYPESCRIPT',
		'NODE.JS',
		'FULL-STACK',
		'GLIDE',
		'SWEDEN',
		'DEEP WORK',
		'OPEN SOURCE',
		'REACT',
		'SVELTE',
		'TYPESCRIPT',
		'NODE.JS',
		'FULL-STACK',
		'GLIDE',
		'SWEDEN',
		'DEEP WORK',
		'OPEN SOURCE'
	];

	onMount(() => {
		try {
			const stored = localStorage.getItem('d2-theme');
			if (stored !== null) dark = stored === 'dark';
			else dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		} catch { /* noop */ }
	});

	function toggle() {
		dark = !dark;
		try {
			localStorage.setItem('d2-theme', dark ? 'dark' : 'light');
		} catch { /* noop */ }
	}
</script>

<svelte:head>
	<title>Rajan Singh — Portfolio</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link
		href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Mono:wght@300;400;500&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="page" class:dark>
	<!-- Background monogram -->
	<div class="bg-mono" aria-hidden="true">RS</div>

	<!-- Header / Nav -->
	<header>
		<div class="nav-left">
			<a href="/">← HOME</a>
		</div>
		<div class="nav-center">RAJAN SINGH / PORTFOLIO</div>
		<div class="nav-right">
			<div class="design-nav">
				{#each [1, 2, 3, 4, 5] as n}
					<a href="/{n}" class:active={n === 2}>/0{n}</a>
				{/each}
			</div>
			<button onclick={toggle} class="toggle">{dark ? 'LIGHT' : 'DARK'}</button>
		</div>
	</header>

	<!-- Hero -->
	<section class="hero">
		<div class="name-block">
			<div class="name-line">RAJAN</div>
			<div class="name-line name-line-2">SINGH</div>
		</div>
		<div class="hero-meta">
			<div class="rule-red"></div>
			<div class="meta-row">
				<span class="meta-item">FULL-STACK DEVELOPER</span>
				<span class="meta-sep">×</span>
				<span class="meta-item">GLIDE</span>
				<span class="meta-sep">×</span>
				<span class="meta-item">SWEDEN</span>
			</div>
		</div>
	</section>

	<!-- Marquee Strip -->
	<div class="marquee-wrap" aria-hidden="true">
		<div class="marquee-inner">
			{#each marqueeItems as item}
				<span class="marquee-item">{item}</span>
				<span class="marquee-sep">◆</span>
			{/each}
		</div>
	</div>

	<!-- Info Grid -->
	<section class="grid-section">
		<div class="grid-col">
			<div class="col-label">STACK</div>
			<div class="col-rule"></div>
			<ul class="col-list">
				<li>React</li>
				<li>Svelte</li>
				<li>TypeScript</li>
				<li>Node.js</li>
			</ul>
		</div>
		<div class="grid-col">
			<div class="col-label">ABOUT</div>
			<div class="col-rule"></div>
			<p class="col-bio">
				Developer at Glide. Deep work devotee and lifelong coder. English native; Japanese and
				Swedish at conversational fluency. American and Canadian citizen.
			</p>
		</div>
		<div class="grid-col">
			<div class="col-label">CONTACT</div>
			<div class="col-rule"></div>
			<ul class="col-list links">
				<li><a href="https://github.com/woahitsraj" target="_blank" rel="noopener noreferrer">GITHUB</a></li>
				<li><a href="https://www.linkedin.com/in/woahitsraj/" target="_blank" rel="noopener noreferrer">LINKEDIN</a></li>
				<li><a href="https://instagram.com/woahitsraj" target="_blank" rel="noopener noreferrer">INSTAGRAM</a></li>
				<li><a href="https://twitter.com/woahitsraj" target="_blank" rel="noopener noreferrer">TWITTER</a></li>
			</ul>
		</div>
	</section>

	<!-- Footer rule -->
	<div class="footer-rule"></div>
	<footer>
		<span>© 2025 RAJAN SINGH</span>
		<span>EN · JP · SV</span>
	</footer>
</div>

<style>
	:global(html),
	:global(body) {
		margin: 0;
		padding: 0;
	}

	.page {
		--bg: #f5f4f2;
		--text: #0d0d0d;
		--text-muted: #555;
		--red: #d90000;
		--rule: #0d0d0d;
		--mono-opacity: 0.04;
		--col-rule-color: #0d0d0d;

		font-family: 'DM Mono', 'Courier New', monospace;
		background: var(--bg);
		color: var(--text);
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		position: relative;
		overflow-x: hidden;
		transition: background 0.3s, color 0.3s;
	}

	.page.dark {
		--bg: #0d0d0d;
		--text: #f0f0f0;
		--text-muted: #888;
		--rule: #f0f0f0;
		--mono-opacity: 0.04;
		--col-rule-color: #333;
	}

	/* Background monogram */
	.bg-mono {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-family: 'Bebas Neue', sans-serif;
		font-size: clamp(22rem, 45vw, 60rem);
		line-height: 0.85;
		letter-spacing: -0.03em;
		color: var(--text);
		opacity: var(--mono-opacity);
		pointer-events: none;
		user-select: none;
		z-index: 0;
	}

	header {
		position: relative;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 2rem;
		border-bottom: 2px solid var(--text);
		font-size: 0.7rem;
		letter-spacing: 0.12em;
	}

	header a {
		color: var(--text);
		text-decoration: none;
		transition: color 0.15s;
	}

	header a:hover {
		color: var(--red);
	}

	.nav-center {
		font-size: 0.65rem;
		letter-spacing: 0.15em;
		color: var(--text-muted);
	}

	.nav-right {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.design-nav {
		display: flex;
		gap: 1rem;
	}

	.design-nav a {
		color: var(--text-muted);
		text-decoration: none;
		font-size: 0.68rem;
		letter-spacing: 0.1em;
		transition: color 0.15s;
	}

	.design-nav a:hover,
	.design-nav a.active {
		color: var(--red);
	}

	.toggle {
		background: none;
		border: 1.5px solid var(--text);
		color: var(--text);
		font-family: inherit;
		font-size: 0.65rem;
		letter-spacing: 0.1em;
		cursor: pointer;
		padding: 0.25rem 0.7rem;
		transition: all 0.2s;
	}

	.toggle:hover {
		background: var(--red);
		border-color: var(--red);
		color: #fff;
	}

	/* Hero */
	.hero {
		position: relative;
		z-index: 10;
		padding: 2rem 2rem 0;
	}

	.name-block {
		line-height: 0.88;
		margin-bottom: 1.5rem;
	}

	.name-line {
		font-family: 'Bebas Neue', sans-serif;
		font-size: clamp(6rem, 17vw, 18rem);
		letter-spacing: -0.02em;
		color: var(--text);
		display: block;
	}

	.name-line-2 {
		color: var(--red);
	}

	.hero-meta {
		margin-bottom: 0;
	}

	.rule-red {
		height: 4px;
		background: var(--red);
		margin-bottom: 1rem;
		width: 100%;
	}

	.meta-row {
		display: flex;
		align-items: center;
		gap: 1rem;
		font-size: clamp(0.65rem, 1.5vw, 0.9rem);
		letter-spacing: 0.15em;
		padding-bottom: 1rem;
	}

	.meta-item {
		color: var(--text);
	}

	.meta-sep {
		color: var(--red);
	}

	/* Marquee */
	.marquee-wrap {
		position: relative;
		z-index: 10;
		background: var(--red);
		overflow: hidden;
		padding: 0.6rem 0;
		white-space: nowrap;
	}

	.marquee-inner {
		display: inline-flex;
		animation: marquee-scroll 22s linear infinite;
	}

	.marquee-item {
		font-family: 'Bebas Neue', sans-serif;
		font-size: 1.4rem;
		letter-spacing: 0.15em;
		color: #fff;
		padding: 0 0.5rem;
	}

	.marquee-sep {
		font-size: 0.9rem;
		color: rgba(255, 255, 255, 0.5);
		align-self: center;
		padding: 0 0.3rem;
	}

	@keyframes marquee-scroll {
		from { transform: translateX(0); }
		to { transform: translateX(-50%); }
	}

	/* Grid */
	.grid-section {
		position: relative;
		z-index: 10;
		display: grid;
		grid-template-columns: 1fr 2fr 1fr;
		gap: 0;
		border-top: 1px solid var(--col-rule-color);
		margin-top: 2rem;
		flex: 1;
	}

	.grid-col {
		padding: 2rem;
		border-right: 1px solid var(--col-rule-color);
	}

	.grid-col:last-child {
		border-right: none;
	}

	.col-label {
		font-size: 0.65rem;
		letter-spacing: 0.2em;
		color: var(--red);
		margin-bottom: 0.75rem;
	}

	.col-rule {
		height: 1px;
		background: var(--col-rule-color);
		margin-bottom: 1.25rem;
	}

	.col-list {
		list-style: none;
		padding: 0;
		margin: 0;
		font-size: 0.85rem;
		line-height: 2.2;
		color: var(--text);
	}

	.col-list.links li a {
		color: var(--text);
		text-decoration: none;
		letter-spacing: 0.1em;
		font-size: 0.75rem;
		display: flex;
		align-items: center;
		gap: 0.4rem;
		transition: color 0.15s;
	}

	.col-list.links li a::before {
		content: '→';
		color: var(--red);
	}

	.col-list.links li a:hover {
		color: var(--red);
	}

	.col-bio {
		font-size: 0.82rem;
		line-height: 1.85;
		color: var(--text);
		margin: 0;
		font-weight: 300;
	}

	/* Footer */
	.footer-rule {
		height: 2px;
		background: var(--text);
		position: relative;
		z-index: 10;
	}

	footer {
		position: relative;
		z-index: 10;
		display: flex;
		justify-content: space-between;
		padding: 0.75rem 2rem;
		font-size: 0.65rem;
		letter-spacing: 0.12em;
		color: var(--text-muted);
	}

	@media (max-width: 768px) {
		.grid-section {
			grid-template-columns: 1fr;
		}
		.grid-col {
			border-right: none;
			border-bottom: 1px solid var(--col-rule-color);
		}
		.meta-row {
			flex-wrap: wrap;
		}
		header {
			flex-direction: column;
			gap: 0.5rem;
			align-items: flex-start;
		}
		.nav-right { align-self: flex-end; }
	}
</style>
