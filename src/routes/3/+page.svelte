<script lang="ts">
	import { onMount } from 'svelte';
	import me from '$lib/assets/me.jpg';

	let dark = $state(false);
	let visible = $state(false);

	onMount(() => {
		try {
			const stored = localStorage.getItem('d3-theme');
			if (stored !== null) dark = stored === 'dark';
			else dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		} catch {
			/* noop */
		}

		// Trigger entrance animations
		requestAnimationFrame(() => {
			setTimeout(() => {
				visible = true;
			}, 50);
		});
	});

	function toggle() {
		dark = !dark;
		try {
			localStorage.setItem('d3-theme', dark ? 'dark' : 'light');
		} catch {
			/* noop */
		}
	}
</script>

<svelte:head>
	<title>Rajan Singh</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link
		href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,700;1,9..144,300;1,9..144,400&family=Lora:ital,wght@0,400;0,500;1,400&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="page" class:dark class:visible>
	<!-- Noise texture overlay -->
	<div class="noise" aria-hidden="true"></div>

	<!-- Top nav -->
	<nav>
		<a class="home-link" href="/">← home</a>
		<div class="design-nav">
			{#each [1, 2, 3, 4, 5] as n}
				<a href="/{n}" class:active={n === 3}>{n}</a>
			{/each}
		</div>
		<button onclick={toggle} aria-label="toggle theme" class="toggle">
			{dark ? '○' : '●'}
		</button>
	</nav>

	<!-- Decorative kanji -->
	<div class="kanji-deco" aria-hidden="true">創</div>

	<!-- Hero -->
	<header class="hero delay-1">
		<div class="ink-circle" aria-hidden="true"></div>
		<div class="hero-text">
			<p class="greeting">Hello, I am</p>
			<h1>Rajan<br /><em>Singh</em></h1>
			<p class="subtitle">Full-Stack Developer</p>
		</div>
	</header>

	<!-- Bento Grid -->
	<main class="bento">
		<!-- About card — wide -->
		<div class="card card-about delay-2">
			<div class="card-label">About</div>
			<p>
				I build things for the web. Currently developing at <strong>Glide</strong>. I believe in
				long periods of undistracted deep work to perform at a high level. Programming has been a
				lifelong hobby before it became a career.
			</p>
			<p>I attend meetups, listen to dev podcasts, and I'm always eager to try new technologies.</p>
		</div>

		<!-- Stack card -->
		<div class="card card-stack delay-3">
			<div class="card-label">Stack</div>
			<ul>
				<li><span class="dot"></span>React</li>
				<li><span class="dot"></span>Svelte</li>
				<li><span class="dot"></span>TypeScript</li>
				<li><span class="dot"></span>Node.js</li>
			</ul>
		</div>

		<!-- Location card -->
		<div class="card card-location delay-4">
			<div class="card-label">Location</div>
			<div class="location-flag">🇸🇪</div>
			<div class="location-name">Sweden</div>
			<div class="location-sub">Göteborg / Stockholm</div>
		</div>

		<!-- Languages card -->
		<div class="card card-languages delay-4">
			<div class="card-label">Languages</div>
			<div class="lang-list">
				<div class="lang">
					<span class="lang-flag">🇺🇸</span>
					<span class="lang-name">English</span>
					<span class="lang-level">Native</span>
				</div>
				<div class="lang">
					<span class="lang-flag">🇯🇵</span>
					<span class="lang-name">Japanese</span>
					<span class="lang-level">Conversational</span>
				</div>
				<div class="lang">
					<span class="lang-flag">🇸🇪</span>
					<span class="lang-name">Swedish</span>
					<span class="lang-level">Conversational</span>
				</div>
			</div>
		</div>

		<!-- Contact card — wide -->
		<div class="card card-contact delay-5">
			<div class="card-label">Connect</div>
			<div class="contact-links">
				<a href="https://github.com/woahitsraj" target="_blank" rel="noopener noreferrer">
					<span class="link-icon">⌥</span> GitHub
				</a>
				<a href="https://www.linkedin.com/in/woahitsraj/" target="_blank" rel="noopener noreferrer">
					<span class="link-icon">⌥</span> LinkedIn
				</a>
				<a href="https://instagram.com/woahitsraj" target="_blank" rel="noopener noreferrer">
					<span class="link-icon">⌥</span> Instagram
				</a>
				<a href="https://twitter.com/woahitsraj" target="_blank" rel="noopener noreferrer">
					<span class="link-icon">⌥</span> Twitter
				</a>
			</div>
		</div>
	</main>

	<footer class="delay-5">
		<span class="footer-mark">宣</span>
		<span class="footer-text">Rajan Singh — 2025</span>
	</footer>
</div>

<style>
	:global(html),
	:global(body) {
		margin: 0;
		padding: 0;
	}

	.page {
		--bg: #f3ede3;
		--bg2: #ede6d8;
		--text: #1a1410;
		--text-muted: #7a6a58;
		--accent: #5a7e52;
		--accent-light: rgba(90, 126, 82, 0.1);
		--card-bg: rgba(255, 255, 255, 0.65);
		--card-border: rgba(26, 20, 16, 0.1);
		--card-shadow: rgba(26, 20, 16, 0.06);
		--ink-circle: rgba(26, 20, 16, 0.08);
		--rule: rgba(26, 20, 16, 0.15);

		font-family: 'Lora', Georgia, serif;
		background: var(--bg);
		color: var(--text);
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		position: relative;
		overflow-x: hidden;
	}

	.page.dark {
		--bg: #15110d;
		--bg2: #1c1710;
		--text: #e0d4c4;
		--text-muted: #8a7a68;
		--accent: #7ab880;
		--accent-light: rgba(122, 184, 128, 0.1);
		--card-bg: rgba(28, 23, 16, 0.8);
		--card-border: rgba(224, 212, 196, 0.1);
		--card-shadow: rgba(0, 0, 0, 0.3);
		--ink-circle: rgba(224, 212, 196, 0.06);
		--rule: rgba(224, 212, 196, 0.12);
	}

	/* Noise overlay using SVG */
	.noise {
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: 1;
		opacity: 0.03;
		background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
		background-size: 256px 256px;
	}

	/* Decorative kanji in corner */
	.kanji-deco {
		position: fixed;
		bottom: -2rem;
		right: -1rem;
		font-size: clamp(14rem, 25vw, 22rem);
		color: var(--text);
		opacity: 0.025;
		pointer-events: none;
		user-select: none;
		z-index: 0;
		font-family: 'Fraunces', serif;
		line-height: 1;
	}

	/* Entrance animations */
	.delay-1,
	.delay-2,
	.delay-3,
	.delay-4,
	.delay-5 {
		opacity: 0;
		transform: translateY(20px);
		transition:
			opacity 0.7s ease,
			transform 0.7s ease;
	}

	.visible .delay-1 {
		opacity: 1;
		transform: translateY(0);
		transition-delay: 0.1s;
	}
	.visible .delay-2 {
		opacity: 1;
		transform: translateY(0);
		transition-delay: 0.25s;
	}
	.visible .delay-3 {
		opacity: 1;
		transform: translateY(0);
		transition-delay: 0.38s;
	}
	.visible .delay-4 {
		opacity: 1;
		transform: translateY(0);
		transition-delay: 0.5s;
	}
	.visible .delay-5 {
		opacity: 1;
		transform: translateY(0);
		transition-delay: 0.62s;
	}

	nav {
		position: relative;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.2rem 2rem;
		border-bottom: 1px solid var(--rule);
	}

	.home-link {
		font-family: 'Lora', serif;
		font-size: 0.82rem;
		color: var(--text-muted);
		text-decoration: none;
		transition: color 0.2s;
	}

	.home-link:hover {
		color: var(--accent);
	}

	.design-nav {
		display: flex;
		gap: 1.5rem;
	}

	.design-nav a {
		font-family: 'Lora', serif;
		font-size: 0.82rem;
		color: var(--text-muted);
		text-decoration: none;
		transition: color 0.2s;
	}

	.design-nav a:hover,
	.design-nav a.active {
		color: var(--accent);
	}

	.toggle {
		background: none;
		border: 1px solid var(--rule);
		color: var(--text-muted);
		font-family: 'Lora', serif;
		font-size: 1rem;
		cursor: pointer;
		width: 2rem;
		height: 2rem;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s;
	}

	.toggle:hover {
		border-color: var(--accent);
		color: var(--accent);
	}

	/* Hero */
	.hero {
		position: relative;
		z-index: 10;
		padding: 3rem 2rem 2rem;
		display: flex;
		align-items: flex-start;
		gap: 3rem;
	}

	.ink-circle {
		flex-shrink: 0;
		width: clamp(80px, 12vw, 140px);
		height: clamp(80px, 12vw, 140px);
		border-radius: 50%;
		border: 1px solid var(--ink-circle);
		box-shadow:
			inset 0 0 0 6px var(--ink-circle),
			inset 0 0 0 20px var(--bg);
		background: var(--bg);
		margin-top: 0.5rem;
	}

	.greeting {
		font-family: 'Lora', serif;
		font-size: 0.9rem;
		font-style: italic;
		color: var(--text-muted);
		margin: 0 0 0.4rem;
	}

	h1 {
		font-family: 'Fraunces', serif;
		font-size: clamp(3rem, 8vw, 6rem);
		font-weight: 300;
		line-height: 1;
		color: var(--text);
		margin: 0 0 0.5rem;
		letter-spacing: -0.02em;
	}

	h1 em {
		font-style: italic;
		color: var(--accent);
	}

	.subtitle {
		font-family: 'Lora', serif;
		font-size: 1rem;
		color: var(--text-muted);
		margin: 0;
		letter-spacing: 0.02em;
	}

	/* Bento grid */
	.bento {
		position: relative;
		z-index: 10;
		display: grid;
		grid-template-columns: 2fr 1fr 1fr;
		grid-template-rows: auto auto;
		gap: 1rem;
		padding: 0 2rem 2rem;
	}

	.card {
		background: var(--card-bg);
		border: 1px solid var(--card-border);
		border-radius: 16px;
		padding: 1.5rem;
		box-shadow: 0 4px 24px var(--card-shadow);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
	}

	.card-about {
		grid-column: span 2;
	}

	.card-contact {
		grid-column: span 2;
	}

	.card-label {
		font-family: 'Lora', serif;
		font-size: 0.7rem;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--accent);
		margin-bottom: 1rem;
	}

	.card-about p {
		font-size: 0.92rem;
		line-height: 1.8;
		color: var(--text);
		margin: 0 0 0.75rem;
	}

	.card-about strong {
		color: var(--accent);
		font-weight: 500;
	}

	/* Stack card */
	.card-stack ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.card-stack li {
		display: flex;
		align-items: center;
		gap: 0.6rem;
		font-size: 0.9rem;
		padding: 0.4rem 0;
		border-bottom: 1px solid var(--card-border);
		color: var(--text);
	}

	.card-stack li:last-child {
		border-bottom: none;
	}

	.dot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--accent);
		flex-shrink: 0;
	}

	/* Location card */
	.location-flag {
		font-size: 2.5rem;
		margin-bottom: 0.4rem;
	}

	.location-name {
		font-family: 'Fraunces', serif;
		font-size: 1.4rem;
		font-weight: 300;
		color: var(--text);
	}

	.location-sub {
		font-size: 0.78rem;
		color: var(--text-muted);
		margin-top: 0.2rem;
	}

	/* Languages card */
	.lang-list {
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
	}

	.lang {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.lang-flag {
		font-size: 1rem;
	}

	.lang-name {
		flex: 1;
		font-size: 0.85rem;
		color: var(--text);
	}

	.lang-level {
		font-size: 0.7rem;
		color: var(--text-muted);
		font-style: italic;
	}

	/* Contact card */
	.contact-links {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem;
	}

	.contact-links a {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.45rem 1rem;
		border: 1px solid var(--card-border);
		border-radius: 100px;
		color: var(--text);
		text-decoration: none;
		font-size: 0.8rem;
		transition: all 0.2s;
		background: transparent;
	}

	.contact-links a:hover {
		border-color: var(--accent);
		color: var(--accent);
		background: var(--accent-light);
	}

	.link-icon {
		color: var(--accent);
		font-size: 0.75rem;
	}

	/* Footer */
	footer {
		position: relative;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		padding: 1.5rem 2rem;
		border-top: 1px solid var(--rule);
		margin-top: auto;
	}

	.footer-mark {
		font-size: 1.2rem;
		color: var(--accent);
		opacity: 0.7;
	}

	.footer-text {
		font-size: 0.75rem;
		color: var(--text-muted);
		letter-spacing: 0.08em;
	}

	@media (max-width: 768px) {
		.bento {
			grid-template-columns: 1fr;
		}
		.card-about,
		.card-contact {
			grid-column: span 1;
		}
		.hero {
			flex-direction: column;
			gap: 1.5rem;
			padding: 2rem 1.5rem 1.5rem;
		}
		nav {
			padding: 1rem 1.5rem;
		}
		.bento {
			padding: 0 1.5rem 2rem;
		}
	}
</style>
