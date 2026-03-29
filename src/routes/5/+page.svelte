<script lang="ts">
	import { onMount } from 'svelte';

	let dark = $state(false);
	let ruleWidth = $state(0);

	onMount(() => {
		try {
			const stored = localStorage.getItem('d5-theme');
			if (stored !== null) dark = stored === 'dark';
			else dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		} catch { /* noop */ }

		// Animate the rule extending
		requestAnimationFrame(() => {
			setTimeout(() => { ruleWidth = 100; }, 200);
		});
	});

	function toggle() {
		dark = !dark;
		try {
			localStorage.setItem('d5-theme', dark ? 'dark' : 'light');
		} catch { /* noop */ }
	}
</script>

<svelte:head>
	<title>Rajan Singh — Developer</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link
		href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400;1,600&family=Jost:wght@300;400;500;600&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="page" class:dark>
	<!-- Decorative large number -->
	<div class="deco-num" aria-hidden="true">01</div>

	<!-- Header / Nav -->
	<header>
		<div class="header-left">
			<span class="edition">Portfolio — 2025</span>
		</div>
		<nav class="header-nav">
			<a href="/">Home</a>
			<div class="design-nav">
				{#each [1, 2, 3, 4, 5] as n}
					<a href="/{n}" class:active={n === 5}>0{n}</a>
				{/each}
			</div>
		</nav>
		<div class="header-right">
			<button onclick={toggle} class="toggle" aria-label="toggle theme">
				{dark ? 'Light' : 'Dark'}
			</button>
		</div>
	</header>

	<!-- Animated rule -->
	<div class="top-rule" style="width: {ruleWidth}%;"></div>

	<!-- Hero section -->
	<section class="hero">
		<div class="hero-main">
			<p class="pre-title">Full-Stack Developer</p>
			<h1 class="name">
				<span class="name-first">Rajan</span>
				<span class="name-last">Singh</span>
			</h1>
		</div>
		<div class="hero-aside">
			<blockquote>
				<p>"Programming isn't just a career — it's been a lifelong hobby."</p>
			</blockquote>
			<div class="aside-meta">
				<div class="meta-entry">
					<span class="meta-label">Company</span>
					<span class="meta-value">Glide</span>
				</div>
				<div class="meta-entry">
					<span class="meta-label">Location</span>
					<span class="meta-value">Sweden 🇸🇪</span>
				</div>
				<div class="meta-entry">
					<span class="meta-label">Citizenship</span>
					<span class="meta-value">🇺🇸 · 🇨🇦</span>
				</div>
			</div>
		</div>
	</section>

	<!-- Thin gold rule -->
	<div class="gold-rule"></div>

	<!-- Main content -->
	<main class="content-grid">
		<!-- Bio column -->
		<div class="col-bio">
			<h2 class="section-title">About</h2>
			<p>
				I'm a developer currently at Glide. I'm experienced in React, Svelte, and TypeScript but
				I'm always learning new things. For me, programming isn't just a career — it's been a
				lifelong hobby.
			</p>
			<p>
				I attend development-related meet-ups and conferences, listen to development podcasts, and
				I'm always keen to try new things, which got me hooked onto React and Svelte early.
			</p>
			<p>
				I'm a strong believer in long periods of undistracted deep work as popularized by Cal
				Newport to perform at a high level. I speak English natively and Japanese and Swedish at
				conversational fluency.
			</p>
		</div>

		<!-- Details column -->
		<div class="col-details">
			<!-- Stack -->
			<div class="detail-section">
				<h3 class="detail-title">Technical</h3>
				<div class="detail-rule"></div>
				<ul class="detail-list">
					<li>React</li>
					<li>Svelte / SvelteKit</li>
					<li>TypeScript</li>
					<li>Node.js</li>
				</ul>
			</div>

			<!-- Languages -->
			<div class="detail-section">
				<h3 class="detail-title">Languages</h3>
				<div class="detail-rule"></div>
				<ul class="detail-list">
					<li>English <em>— Native</em></li>
					<li>Japanese <em>— Conversational</em></li>
					<li>Swedish <em>— Conversational</em></li>
				</ul>
			</div>

			<!-- Contact -->
			<div class="detail-section">
				<h3 class="detail-title">Contact</h3>
				<div class="detail-rule"></div>
				<ul class="social-links">
					<li>
						<a href="https://github.com/woahitsraj" target="_blank" rel="noopener noreferrer">
							<span class="link-arrow">→</span> GitHub
						</a>
					</li>
					<li>
						<a href="https://www.linkedin.com/in/woahitsraj/" target="_blank" rel="noopener noreferrer">
							<span class="link-arrow">→</span> LinkedIn
						</a>
					</li>
					<li>
						<a href="https://instagram.com/woahitsraj" target="_blank" rel="noopener noreferrer">
							<span class="link-arrow">→</span> Instagram
						</a>
					</li>
					<li>
						<a href="https://twitter.com/woahitsraj" target="_blank" rel="noopener noreferrer">
							<span class="link-arrow">→</span> Twitter
						</a>
					</li>
				</ul>
			</div>
		</div>
	</main>

	<!-- Bottom strip -->
	<div class="gold-rule"></div>
	<footer>
		<span>Rajan Singh</span>
		<span class="footer-center">EN · JP · SV</span>
		<span>© 2025</span>
	</footer>
</div>

<style>
	:global(html),
	:global(body) {
		margin: 0;
		padding: 0;
	}

	.page {
		--bg: #f8f3ec;
		--bg2: #ede6d8;
		--text: #1c1a17;
		--text-muted: #7a6e60;
		--gold: #b8904a;
		--gold-light: rgba(184, 144, 74, 0.12);
		--rule: rgba(28, 26, 23, 0.12);
		--gold-rule: rgba(184, 144, 74, 0.4);

		font-family: 'Jost', sans-serif;
		background: var(--bg);
		color: var(--text);
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		position: relative;
		overflow-x: hidden;
		transition: background 0.4s, color 0.4s;
	}

	.page.dark {
		--bg: #0e0c0a;
		--bg2: #16120d;
		--text: #e8ddd0;
		--text-muted: #8a7e70;
		--gold: #d4a842;
		--gold-light: rgba(212, 168, 66, 0.1);
		--rule: rgba(232, 221, 208, 0.1);
		--gold-rule: rgba(212, 168, 66, 0.3);
	}

	/* Large decorative number */
	.deco-num {
		position: fixed;
		top: 50%;
		right: -2rem;
		transform: translateY(-50%);
		font-family: 'Cormorant Garamond', serif;
		font-size: clamp(18rem, 30vw, 38rem);
		font-weight: 300;
		color: var(--text);
		opacity: 0.025;
		pointer-events: none;
		user-select: none;
		z-index: 0;
		line-height: 1;
		letter-spacing: -0.05em;
	}

	/* Header */
	header {
		position: relative;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.2rem 2.5rem;
		border-bottom: 1px solid var(--rule);
	}

	.edition {
		font-family: 'Jost', sans-serif;
		font-size: 0.68rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--text-muted);
	}

	.header-nav {
		display: flex;
		align-items: center;
		gap: 1.5rem;
	}

	.header-nav a {
		font-family: 'Jost', sans-serif;
		font-size: 0.72rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--text-muted);
		text-decoration: none;
		transition: color 0.2s;
	}

	.header-nav a:hover {
		color: var(--gold);
	}

	.design-nav {
		display: flex;
		gap: 1rem;
	}

	.design-nav a {
		font-family: 'Jost', sans-serif;
		font-size: 0.72rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--text-muted);
		text-decoration: none;
		transition: color 0.2s;
	}

	.design-nav a:hover,
	.design-nav a.active {
		color: var(--gold);
	}

	.toggle {
		background: none;
		border: 1px solid var(--rule);
		color: var(--text-muted);
		font-family: 'Jost', sans-serif;
		font-size: 0.68rem;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		cursor: pointer;
		padding: 0.3rem 0.8rem;
		transition: all 0.2s;
	}

	.toggle:hover {
		border-color: var(--gold);
		color: var(--gold);
	}

	/* Animated rule */
	.top-rule {
		height: 1px;
		background: var(--gold);
		transition: width 1.2s cubic-bezier(0.25, 0.1, 0.25, 1);
		position: relative;
		z-index: 10;
	}

	/* Hero */
	.hero {
		position: relative;
		z-index: 10;
		display: grid;
		grid-template-columns: 1.4fr 1fr;
		gap: 4rem;
		padding: 4rem 2.5rem 3rem;
		align-items: end;
	}

	.pre-title {
		font-family: 'Jost', sans-serif;
		font-size: 0.72rem;
		letter-spacing: 0.25em;
		text-transform: uppercase;
		color: var(--gold);
		margin: 0 0 1.2rem;
	}

	h1.name {
		font-family: 'Cormorant Garamond', serif;
		font-weight: 300;
		font-size: clamp(4rem, 10vw, 9rem);
		line-height: 0.9;
		letter-spacing: -0.02em;
		margin: 0;
	}

	.name-first {
		display: block;
		color: var(--text);
	}

	.name-last {
		display: block;
		font-style: italic;
		color: var(--gold);
	}

	.hero-aside {
		padding-bottom: 0.5rem;
	}

	blockquote {
		margin: 0 0 2rem;
		padding: 0 0 0 1.5rem;
		border-left: 2px solid var(--gold);
	}

	blockquote p {
		font-family: 'Cormorant Garamond', serif;
		font-size: 1.15rem;
		font-style: italic;
		font-weight: 300;
		line-height: 1.6;
		color: var(--text);
		margin: 0;
	}

	.aside-meta {
		display: flex;
		flex-direction: column;
		gap: 0.6rem;
	}

	.meta-entry {
		display: flex;
		gap: 1rem;
		align-items: baseline;
	}

	.meta-label {
		font-size: 0.65rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--text-muted);
		min-width: 6rem;
	}

	.meta-value {
		font-family: 'Cormorant Garamond', serif;
		font-size: 1rem;
		color: var(--text);
	}

	/* Gold rule */
	.gold-rule {
		position: relative;
		z-index: 10;
		height: 1px;
		background: var(--gold-rule);
		margin: 0 2.5rem;
	}

	/* Main content */
	.content-grid {
		position: relative;
		z-index: 10;
		display: grid;
		grid-template-columns: 1.5fr 1fr;
		gap: 5rem;
		padding: 3rem 2.5rem;
		flex: 1;
	}

	/* Bio column */
	.col-bio h2.section-title {
		font-family: 'Cormorant Garamond', serif;
		font-size: 1.8rem;
		font-weight: 300;
		font-style: italic;
		color: var(--text);
		margin: 0 0 1.5rem;
		letter-spacing: -0.01em;
	}

	.col-bio p {
		font-family: 'Jost', sans-serif;
		font-size: 0.92rem;
		line-height: 1.85;
		color: var(--text);
		margin: 0 0 1.2rem;
		font-weight: 300;
		max-width: 55ch;
	}

	/* Details column */
	.detail-section {
		margin-bottom: 2rem;
	}

	h3.detail-title {
		font-family: 'Jost', sans-serif;
		font-size: 0.65rem;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--gold);
		margin: 0 0 0.5rem;
		font-weight: 500;
	}

	.detail-rule {
		height: 1px;
		background: var(--rule);
		margin-bottom: 1rem;
		position: relative;
	}

	.detail-rule::after {
		content: '';
		position: absolute;
		left: 0;
		top: 0;
		width: 2rem;
		height: 1px;
		background: var(--gold);
	}

	.detail-list {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.detail-list li {
		font-family: 'Jost', sans-serif;
		font-size: 0.88rem;
		font-weight: 300;
		color: var(--text);
		padding: 0.35rem 0;
		border-bottom: 1px solid var(--rule);
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
	}

	.detail-list li:last-child { border-bottom: none; }

	.detail-list li em {
		font-style: italic;
		color: var(--text-muted);
		font-size: 0.8rem;
	}

	.social-links {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.social-links li {
		padding: 0.35rem 0;
		border-bottom: 1px solid var(--rule);
	}

	.social-links li:last-child { border-bottom: none; }

	.social-links a {
		font-family: 'Jost', sans-serif;
		font-size: 0.85rem;
		font-weight: 400;
		color: var(--text);
		text-decoration: none;
		display: flex;
		align-items: center;
		gap: 0.5rem;
		transition: color 0.2s;
	}

	.social-links a:hover {
		color: var(--gold);
	}

	.social-links a:hover .link-arrow {
		transform: translateX(4px);
	}

	.link-arrow {
		color: var(--gold);
		font-size: 0.8rem;
		transition: transform 0.2s;
	}

	/* Footer */
	footer {
		position: relative;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 2.5rem;
		font-family: 'Jost', sans-serif;
		font-size: 0.65rem;
		letter-spacing: 0.15em;
		text-transform: uppercase;
		color: var(--text-muted);
		margin-top: auto;
	}

	.footer-center {
		color: var(--gold);
		letter-spacing: 0.25em;
	}

	@media (max-width: 900px) {
		.hero {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
		.content-grid {
			grid-template-columns: 1fr;
			gap: 2rem;
		}
	}

	@media (max-width: 640px) {
		header { padding: 1rem 1.5rem; flex-wrap: wrap; gap: 0.5rem; }
		.hero { padding: 2rem 1.5rem; }
		.gold-rule { margin: 0 1.5rem; }
		.content-grid { padding: 2rem 1.5rem; }
		footer { padding: 1rem 1.5rem; }
	}
</style>
