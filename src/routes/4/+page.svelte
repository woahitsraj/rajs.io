<script lang="ts">
	import { onMount } from 'svelte';

	let dark = $state(false);

	const skills = [
		'REACT', '★', 'SVELTE', '◆', 'TYPESCRIPT', '★', 'NODE.JS', '◆',
		'FULL-STACK', '★', 'WEB DEV', '◆', 'OPEN SOURCE', '★', 'GLIDE', '◆',
		'REACT', '★', 'SVELTE', '◆', 'TYPESCRIPT', '★', 'NODE.JS', '◆',
		'FULL-STACK', '★', 'WEB DEV', '◆', 'OPEN SOURCE', '★', 'GLIDE', '◆'
	];

	onMount(() => {
		try {
			const stored = localStorage.getItem('d4-theme');
			if (stored !== null) dark = stored === 'dark';
			else dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		} catch { /* noop */ }
	});

	function toggle() {
		dark = !dark;
		try {
			localStorage.setItem('d4-theme', dark ? 'dark' : 'light');
		} catch { /* noop */ }
	}
</script>

<svelte:head>
	<title>RAJAN SINGH ★ DEVELOPER</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link
		href="https://fonts.googleapis.com/css2?family=Righteous&family=Exo+2:wght@400;600;700;800&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="page" class:dark>
	<!-- Background shapes -->
	<div class="shapes" aria-hidden="true">
		<div class="shape s-circle1"></div>
		<div class="shape s-circle2"></div>
		<div class="shape s-triangle1"></div>
		<div class="shape s-triangle2"></div>
		<div class="shape s-star1">★</div>
		<div class="shape s-star2">★</div>
		<div class="shape s-diamond1">◆</div>
		<div class="shape s-diamond2">◆</div>
		<div class="shape s-squiggle1"></div>
		<div class="shape s-ring1"></div>
		<div class="shape s-ring2"></div>
		<div class="shape s-donut1"></div>
	</div>

	<!-- Nav -->
	<nav>
		<a href="/" class="home-link">★ HOME ★</a>
		<div class="design-nav">
			{#each [1, 2, 3, 4, 5] as n}
				<a href="/{n}" class:active={n === 4}>0{n}</a>
			{/each}
		</div>
		<button onclick={toggle} class="toggle">{dark ? '☀' : '☾'}</button>
	</nav>

	<!-- Hero -->
	<header class="hero">
		<div class="hero-tag">✦ AVAILABLE FOR WORK ✦</div>
		<h1 class="hero-name">
			<span class="line1">RAJAN</span>
			<span class="line2">SINGH</span>
		</h1>
		<p class="hero-role">FULL-STACK DEVELOPER</p>
	</header>

	<!-- Marquee -->
	<div class="marquee-outer">
		<div class="marquee-track">
			{#each skills as s}
				<span class:sep={s === '★' || s === '◆'}>{s}</span>
			{/each}
		</div>
	</div>

	<!-- Cards grid -->
	<main class="cards">
		<!-- About card -->
		<div class="card card-about card-pink">
			<div class="card-num">01</div>
			<h2>ABOUT ME</h2>
			<p>
				Developer at <strong>Glide</strong>. I build things for the web and have been coding as a
				hobby long before it became my career. I love conferences, podcasts, and diving into new
				tech.
			</p>
			<p>Based in <strong>Sweden 🇸🇪</strong></p>
		</div>

		<!-- Stack card -->
		<div class="card card-stack card-cyan">
			<div class="card-num">02</div>
			<h2>STACK</h2>
			<div class="tag-cloud">
				<span class="tag">React</span>
				<span class="tag">Svelte</span>
				<span class="tag">TypeScript</span>
				<span class="tag">Node.js</span>
				<span class="tag">CSS</span>
				<span class="tag">HTML</span>
			</div>
		</div>

		<!-- Languages card -->
		<div class="card card-lang card-yellow">
			<div class="card-num">03</div>
			<h2>LANGUAGES</h2>
			<div class="lang-rows">
				<div class="lang-row"><span>🇺🇸</span><span>English</span><span class="native">NATIVE</span></div>
				<div class="lang-row"><span>🇯🇵</span><span>Japanese</span><span>CONV.</span></div>
				<div class="lang-row"><span>🇸🇪</span><span>Swedish</span><span>CONV.</span></div>
			</div>
		</div>

		<!-- Links card -->
		<div class="card card-links card-white">
			<div class="card-num">04</div>
			<h2>FIND ME</h2>
			<div class="link-grid">
				<a href="https://github.com/woahitsraj" target="_blank" rel="noopener noreferrer">
					<span class="link-star">★</span>GITHUB
				</a>
				<a href="https://www.linkedin.com/in/woahitsraj/" target="_blank" rel="noopener noreferrer">
					<span class="link-star">★</span>LINKEDIN
				</a>
				<a href="https://instagram.com/woahitsraj" target="_blank" rel="noopener noreferrer">
					<span class="link-star">★</span>INSTAGRAM
				</a>
				<a href="https://twitter.com/woahitsraj" target="_blank" rel="noopener noreferrer">
					<span class="link-star">★</span>TWITTER
				</a>
			</div>
		</div>
	</main>

	<footer>
		<span class="footer-star">★</span>
		<span>RAJAN SINGH © 2025</span>
		<span class="footer-star">★</span>
	</footer>
</div>

<style>
	:global(html),
	:global(body) {
		margin: 0;
		padding: 0;
	}

	.page {
		--bg: #fff740;
		--bg2: #ffe800;
		--text: #111;
		--pink: #ff2dd4;
		--cyan: #00d4ff;
		--lime: #7fff00;
		--orange: #ff7700;
		--card-white: #fff;
		--nav-text: #111;
		--border: #111;
		--shadow: rgba(0,0,0,0.18);

		font-family: 'Exo 2', 'Arial Black', sans-serif;
		background: var(--bg);
		color: var(--text);
		min-height: 100vh;
		display: flex;
		flex-direction: column;
		position: relative;
		overflow-x: hidden;
	}

	.page.dark {
		--bg: #18002a;
		--bg2: #22003a;
		--text: #fff740;
		--pink: #ff2dd4;
		--cyan: #00d4ff;
		--lime: #aaff00;
		--card-white: #2a004a;
		--nav-text: #fff740;
		--border: #ff2dd4;
		--shadow: rgba(255,45,212,0.2);
	}

	/* ---- Background shapes ---- */
	.shapes {
		position: fixed;
		inset: 0;
		pointer-events: none;
		z-index: 0;
		overflow: hidden;
	}

	.shape {
		position: absolute;
	}

	/* Large circles */
	.s-circle1 {
		width: 220px; height: 220px;
		border-radius: 50%;
		border: 4px solid var(--pink);
		top: 5%; right: 8%;
		animation: float1 7s ease-in-out infinite;
	}

	.s-circle2 {
		width: 120px; height: 120px;
		border-radius: 50%;
		background: var(--cyan);
		opacity: 0.25;
		bottom: 15%; left: 5%;
		animation: float2 9s ease-in-out infinite reverse;
	}

	/* Triangles */
	.s-triangle1 {
		width: 0; height: 0;
		border-left: 50px solid transparent;
		border-right: 50px solid transparent;
		border-bottom: 86px solid var(--pink);
		opacity: 0.6;
		top: 60%; right: 4%;
		animation: spin-slow 14s linear infinite;
	}

	.s-triangle2 {
		width: 0; height: 0;
		border-left: 30px solid transparent;
		border-right: 30px solid transparent;
		border-bottom: 52px solid var(--cyan);
		opacity: 0.5;
		top: 30%; left: 3%;
		animation: spin-slow 18s linear infinite reverse;
	}

	/* Stars */
	.s-star1 {
		font-size: 4rem;
		color: var(--pink);
		top: 12%; left: 12%;
		animation: spin-slow 12s linear infinite;
		opacity: 0.7;
	}

	.s-star2 {
		font-size: 2.5rem;
		color: var(--cyan);
		bottom: 20%; right: 15%;
		animation: spin-slow 10s linear infinite reverse;
		opacity: 0.6;
	}

	/* Diamonds */
	.s-diamond1 {
		font-size: 3rem;
		color: var(--lime);
		top: 45%; left: 2%;
		opacity: 0.5;
		animation: float1 6s ease-in-out infinite;
	}

	.s-diamond2 {
		font-size: 5rem;
		color: var(--orange);
		bottom: 5%; right: 25%;
		opacity: 0.3;
		animation: float2 8s ease-in-out infinite;
	}

	/* Rings */
	.s-ring1 {
		width: 80px; height: 80px;
		border-radius: 50%;
		border: 6px solid var(--cyan);
		opacity: 0.4;
		top: 75%; left: 20%;
		animation: float1 11s ease-in-out infinite;
	}

	.s-ring2 {
		width: 50px; height: 50px;
		border-radius: 50%;
		border: 4px solid var(--pink);
		opacity: 0.5;
		top: 20%; right: 30%;
		animation: float2 7s ease-in-out infinite;
	}

	/* Squiggle using box-shadow trick */
	.s-squiggle1 {
		width: 100px; height: 8px;
		border-radius: 4px;
		background: var(--pink);
		opacity: 0.4;
		top: 85%; left: 50%;
		transform: rotate(-20deg);
		animation: float1 5s ease-in-out infinite;
	}

	.s-donut1 {
		width: 60px; height: 60px;
		border-radius: 50%;
		border: 8px solid var(--lime);
		opacity: 0.4;
		top: 50%; right: 20%;
		animation: spin-slow 16s linear infinite;
	}

	@keyframes float1 {
		0%, 100% { transform: translateY(0px); }
		50% { transform: translateY(-20px); }
	}

	@keyframes float2 {
		0%, 100% { transform: translateY(0px) rotate(0deg); }
		50% { transform: translateY(-14px) rotate(8deg); }
	}

	@keyframes spin-slow {
		from { transform: rotate(0deg); }
		to { transform: rotate(360deg); }
	}

	/* ---- Nav ---- */
	nav {
		position: relative;
		z-index: 20;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1rem 1.5rem;
		border-bottom: 3px solid var(--border);
	}

	.home-link {
		font-family: 'Righteous', sans-serif;
		font-size: 0.8rem;
		color: var(--nav-text);
		text-decoration: none;
		letter-spacing: 0.12em;
		transition: color 0.15s;
	}

	.home-link:hover { color: var(--pink); }

	.design-nav {
		display: flex;
		gap: 0.75rem;
	}

	.design-nav a {
		font-family: 'Righteous', sans-serif;
		font-size: 0.8rem;
		color: var(--nav-text);
		text-decoration: none;
		transition: color 0.15s;
		letter-spacing: 0.05em;
	}

	.design-nav a:hover,
	.design-nav a.active {
		color: var(--pink);
	}

	.toggle {
		background: var(--text);
		border: 3px solid var(--border);
		color: var(--bg);
		font-size: 1.1rem;
		cursor: pointer;
		width: 2.2rem;
		height: 2.2rem;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s;
	}

	.toggle:hover {
		background: var(--pink);
		border-color: var(--pink);
		color: #fff;
		transform: rotate(20deg);
	}

	/* ---- Hero ---- */
	.hero {
		position: relative;
		z-index: 10;
		text-align: center;
		padding: 3rem 2rem 1rem;
	}

	.hero-tag {
		font-family: 'Righteous', sans-serif;
		font-size: 0.75rem;
		letter-spacing: 0.2em;
		background: var(--pink);
		color: #fff;
		display: inline-block;
		padding: 0.3rem 1rem;
		margin-bottom: 1rem;
		border: 2px solid var(--border);
	}

	.hero-name {
		font-family: 'Righteous', sans-serif;
		line-height: 0.9;
		margin: 0 0 0.5rem;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.line1 {
		font-size: clamp(4rem, 14vw, 12rem);
		color: var(--text);
		-webkit-text-stroke: 2px var(--border);
		letter-spacing: -0.02em;
	}

	.line2 {
		font-size: clamp(4rem, 14vw, 12rem);
		color: var(--pink);
		-webkit-text-stroke: 2px var(--border);
		letter-spacing: -0.02em;
	}

	.hero-role {
		font-family: 'Righteous', sans-serif;
		font-size: clamp(0.75rem, 2vw, 1.1rem);
		letter-spacing: 0.3em;
		color: var(--text);
		margin: 0;
		border: 3px solid var(--border);
		display: inline-block;
		padding: 0.4rem 1.5rem;
		background: var(--cyan);
		color: #111;
	}

	/* Marquee */
	.marquee-outer {
		position: relative;
		z-index: 10;
		background: var(--text);
		overflow: hidden;
		padding: 0.5rem 0;
		border-top: 3px solid var(--border);
		border-bottom: 3px solid var(--border);
		margin: 1.5rem 0;
		white-space: nowrap;
	}

	.marquee-track {
		display: inline-flex;
		gap: 0.6rem;
		animation: marquee-y2k 18s linear infinite;
		font-family: 'Righteous', sans-serif;
		font-size: 1rem;
		color: var(--bg);
		padding: 0 1rem;
	}

	.marquee-track span {
		letter-spacing: 0.1em;
	}

	.marquee-track span.sep {
		color: var(--pink);
	}

	@keyframes marquee-y2k {
		from { transform: translateX(0); }
		to { transform: translateX(-50%); }
	}

	/* Cards */
	.cards {
		position: relative;
		z-index: 10;
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.2rem;
		padding: 0 1.5rem 1.5rem;
	}

	.card {
		border: 3px solid var(--border);
		padding: 1.5rem;
		position: relative;
		box-shadow: 5px 5px 0 var(--border);
		transition: transform 0.2s, box-shadow 0.2s;
	}

	.card:hover {
		transform: translate(-3px, -3px);
		box-shadow: 8px 8px 0 var(--border);
	}

	.card-about { background: var(--pink); color: #fff; transform: rotate(-0.5deg); }
	.card-stack { background: var(--cyan); color: #111; transform: rotate(0.7deg); }
	.card-lang  { background: var(--bg); color: var(--text); transform: rotate(-0.3deg); }
	.card-links { background: var(--card-white); color: var(--text); transform: rotate(0.4deg); }

	.page.dark .card-about { background: var(--pink); }
	.page.dark .card-stack { background: var(--cyan); }
	.page.dark .card-lang  { background: var(--bg2); color: var(--text); }
	.page.dark .card-links { background: var(--card-white); color: #fff740; }

	.card:hover {
		transform: rotate(0deg) translate(-3px, -3px) !important;
	}

	.card-num {
		position: absolute;
		top: 0.5rem;
		right: 0.75rem;
		font-family: 'Righteous', sans-serif;
		font-size: 2.5rem;
		opacity: 0.15;
		line-height: 1;
	}

	.card h2 {
		font-family: 'Righteous', sans-serif;
		font-size: 1.1rem;
		letter-spacing: 0.15em;
		margin: 0 0 1rem;
		border-bottom: 2px solid currentColor;
		padding-bottom: 0.5rem;
	}

	.card-about p {
		font-size: 0.88rem;
		line-height: 1.7;
		margin: 0 0 0.5rem;
	}

	.card-about strong { text-decoration: underline; }

	/* Stack */
	.tag-cloud {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.tag {
		background: #111;
		color: var(--cyan);
		font-family: 'Righteous', sans-serif;
		font-size: 0.7rem;
		letter-spacing: 0.1em;
		padding: 0.25rem 0.6rem;
		border: 2px solid #111;
	}

	/* Languages */
	.lang-rows { display: flex; flex-direction: column; gap: 0.6rem; }
	.lang-row {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.88rem;
		border-bottom: 1px dashed currentColor;
		padding-bottom: 0.5rem;
	}
	.lang-row span:nth-child(2) { flex: 1; }
	.lang-row .native {
		font-family: 'Righteous', sans-serif;
		font-size: 0.65rem;
		background: var(--pink);
		color: #fff;
		padding: 0.1rem 0.4rem;
	}
	.lang-row span:last-child:not(.native) {
		font-size: 0.65rem;
		font-family: 'Righteous', sans-serif;
		opacity: 0.7;
	}

	/* Links */
	.link-grid {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 0.5rem;
	}

	.link-grid a {
		display: flex;
		align-items: center;
		gap: 0.3rem;
		font-family: 'Righteous', sans-serif;
		font-size: 0.72rem;
		letter-spacing: 0.1em;
		color: inherit;
		text-decoration: none;
		padding: 0.4rem 0.6rem;
		border: 2px solid var(--border);
		transition: all 0.15s;
	}

	.link-grid a:hover {
		background: var(--pink);
		color: #fff;
		border-color: var(--pink);
		transform: translate(-2px, -2px);
		box-shadow: 2px 2px 0 #111;
	}

	.link-star { color: var(--pink); }

	/* Footer */
	footer {
		position: relative;
		z-index: 10;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 1rem;
		padding: 1rem;
		border-top: 3px solid var(--border);
		font-family: 'Righteous', sans-serif;
		font-size: 0.7rem;
		letter-spacing: 0.15em;
		margin-top: auto;
	}

	.footer-star { color: var(--pink); font-size: 1rem; }

	@media (max-width: 640px) {
		.cards { grid-template-columns: 1fr; }
		.link-grid { grid-template-columns: 1fr 1fr; }
	}
</style>
