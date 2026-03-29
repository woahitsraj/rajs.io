<script lang="ts">
	import { onMount } from 'svelte';

	let dark = $state(true);
	let typedChars = $state(0);
	let cursorOn = $state(true);

	const script = `$ init session --user=rajan.singh
$ Verifying identity...   [OK]
$ Loading portfolio...    [OK]
$ Status: ONLINE

 ╔══════════════════════════════════════╗
 ║  RAJAN SINGH                         ║
 ║  Full-Stack Developer                ║
 ╚══════════════════════════════════════╝

$ whoami
  Role:      Developer @ Glide
  Stack:     React · Svelte · TypeScript
  Location:  Sweden  [EN · JP · SV]

$ cat bio.md
  I build things for the web.
  Deep work devotee. Lifelong coder.
  Conference speaker. Podcast listener.
  Hooked on Svelte and React early on.

$ ls -la ./links
  [github]    github.com/woahitsraj
  [linkedin]  linkedin.com/in/woahitsraj
  [instagram] instagram.com/woahitsraj
  [twitter]   twitter.com/woahitsraj

$ _`;

	let displayedLines = $derived(script.slice(0, typedChars).split('\n'));
	let isComplete = $derived(typedChars >= script.length);

	onMount(() => {
		try {
			const stored = localStorage.getItem('d1-theme');
			if (stored !== null) dark = stored === 'dark';
			else dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
		} catch {
			dark = true;
		}

		const cursorTimer = setInterval(() => {
			cursorOn = !cursorOn;
		}, 530);

		let pos = 0;
		function type() {
			if (pos < script.length) {
				typedChars = pos + 1;
				pos++;
				const ch = script[pos - 1];
				const delay = ch === '\n' ? 35 : pos < 100 ? 22 : 14;
				setTimeout(type, delay);
			}
		}
		setTimeout(type, 500);

		return () => clearInterval(cursorTimer);
	});

	function toggle() {
		dark = !dark;
		try {
			localStorage.setItem('d1-theme', dark ? 'dark' : 'light');
		} catch { /* noop */ }
	}

	const socialLinks = [
		{ label: 'github', href: 'https://github.com/woahitsraj' },
		{ label: 'linkedin', href: 'https://www.linkedin.com/in/woahitsraj/' },
		{ label: 'instagram', href: 'https://instagram.com/woahitsraj' },
		{ label: 'twitter', href: 'https://twitter.com/woahitsraj' }
	];
</script>

<svelte:head>
	<title>rajan.singh — terminal</title>
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link
		href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,300;0,400;0,500;0,600;1,300&display=swap"
		rel="stylesheet"
	/>
</svelte:head>

<div class="page" class:light={!dark}>
	<!-- Top bar -->
	<div class="topbar">
		<a class="home-link" href="/">~/home</a>
		<div class="design-nav">
			{#each [1, 2, 3, 4, 5] as n}
				<a href="/{n}" class:active={n === 1}>0{n}</a>
			{/each}
		</div>
		<button class="toggle" onclick={toggle} aria-label="toggle theme">
			{dark ? '[AMBER]' : '[GREEN]'}
		</button>
	</div>

	<!-- Terminal Window -->
	<div class="wrap">
		<div class="terminal">
			<div class="chrome">
				<span class="dot r"></span>
				<span class="dot y"></span>
				<span class="dot g"></span>
				<span class="chrome-title">rajan.singh — bash — 80×24</span>
			</div>
			<div class="screen">
				<div class="scanlines"></div>
				<div class="vignette"></div>
				<pre class="output" aria-live="polite">{#each displayedLines as line, i}<div
							class="line"
							class:header={line.includes('RAJAN SINGH') || line.includes('Full-Stack')}
						>{line || ' '}{#if i === displayedLines.length - 1 && !isComplete}<span
									class="cursor typing">▌</span>{/if}</div>{/each}{#if isComplete}<span
						class="cursor done" class:on={cursorOn}>▌</span>{/if}</pre>
			</div>
		</div>

		<!-- Link strip below terminal -->
		<div class="link-strip">
			{#each socialLinks as l}
				<a href={l.href} target="_blank" rel="noopener noreferrer" class="link-pill">
					<span class="link-prompt">→</span>
					{l.label}
				</a>
			{/each}
		</div>
	</div>
</div>

<style>
	:global(html),
	:global(body) {
		margin: 0;
		padding: 0;
		height: 100%;
	}

	.page {
		--bg: #06090a;
		--screen-bg: #080f09;
		--text: #39ff6b;
		--text-dim: #1a7030;
		--chrome: #111a12;
		--chrome-border: #1e3a20;
		--glow: rgba(57, 255, 107, 0.18);
		--glow-text: 0 0 7px rgba(57, 255, 107, 0.75), 0 0 20px rgba(57, 255, 107, 0.3);
		--link-bg: rgba(57, 255, 107, 0.08);
		--link-border: rgba(57, 255, 107, 0.25);

		font-family: 'IBM Plex Mono', 'Courier New', monospace;
		background: var(--bg);
		color: var(--text);
		min-height: 100vh;
		display: flex;
		flex-direction: column;
	}

	.page.light {
		--bg: #c0aa72;
		--screen-bg: #f4e8ca;
		--text: #5c2200;
		--text-dim: #9a6030;
		--chrome: #a89060;
		--chrome-border: #7a6840;
		--glow: rgba(92, 34, 0, 0.12);
		--glow-text: 0 0 6px rgba(92, 34, 0, 0.5), 0 0 15px rgba(92, 34, 0, 0.2);
		--link-bg: rgba(92, 34, 0, 0.07);
		--link-border: rgba(92, 34, 0, 0.2);
	}

	.topbar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0.6rem 1.5rem;
		font-size: 0.72rem;
		letter-spacing: 0.08em;
		border-bottom: 1px solid var(--text-dim);
		flex-shrink: 0;
	}

	.home-link {
		color: var(--text-dim);
		text-decoration: none;
		transition: color 0.2s;
	}
	.home-link:hover { color: var(--text); }

	.design-nav {
		display: flex;
		gap: 1.2rem;
	}

	.design-nav a {
		color: var(--text-dim);
		text-decoration: none;
		transition: color 0.15s, text-shadow 0.15s;
	}

	.design-nav a:hover,
	.design-nav a.active {
		color: var(--text);
		text-shadow: var(--glow-text);
	}

	.toggle {
		background: none;
		border: 1px solid var(--text-dim);
		color: var(--text-dim);
		font-family: inherit;
		font-size: 0.7rem;
		letter-spacing: 0.05em;
		cursor: pointer;
		padding: 0.2rem 0.6rem;
		transition: all 0.2s;
	}

	.toggle:hover {
		color: var(--text);
		border-color: var(--text);
		box-shadow: 0 0 8px var(--glow);
	}

	.wrap {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 2rem 1rem;
		gap: 1.5rem;
	}

	.terminal {
		width: 100%;
		max-width: 740px;
		border: 1px solid var(--chrome-border);
		border-radius: 10px;
		overflow: hidden;
		box-shadow:
			0 0 30px var(--glow),
			0 0 80px var(--glow),
			0 20px 60px rgba(0, 0, 0, 0.5),
			inset 0 0 30px rgba(0, 0, 0, 0.2);
	}

	.chrome {
		background: var(--chrome);
		padding: 0.55rem 1rem;
		display: flex;
		align-items: center;
		gap: 0.45rem;
		border-bottom: 1px solid var(--chrome-border);
	}

	.dot {
		width: 12px;
		height: 12px;
		border-radius: 50%;
		display: inline-block;
	}
	.dot.r { background: #ff5f57; }
	.dot.y { background: #febc2e; }
	.dot.g { background: #28c840; }

	.chrome-title {
		flex: 1;
		text-align: center;
		font-size: 0.68rem;
		color: var(--text-dim);
		letter-spacing: 0.03em;
	}

	.screen {
		background: var(--screen-bg);
		position: relative;
		min-height: 440px;
		padding: 1.4rem 1.6rem;
	}

	.scanlines {
		position: absolute;
		inset: 0;
		background: repeating-linear-gradient(
			0deg,
			transparent,
			transparent 2px,
			rgba(0, 0, 0, 0.038) 2px,
			rgba(0, 0, 0, 0.038) 4px
		);
		pointer-events: none;
		z-index: 1;
	}

	.vignette {
		position: absolute;
		inset: 0;
		background: radial-gradient(ellipse at center, transparent 55%, rgba(0, 0, 0, 0.45) 100%);
		pointer-events: none;
		z-index: 2;
	}

	.output {
		position: relative;
		z-index: 3;
		margin: 0;
		font-family: inherit;
		font-size: clamp(0.72rem, 1.4vw, 0.88rem);
		line-height: 1.75;
		white-space: pre;
	}

	.line {
		text-shadow: var(--glow-text);
		white-space: pre;
	}

	.line.header {
		font-weight: 600;
		color: var(--text);
	}

	.cursor {
		display: inline-block;
		color: var(--text);
	}

	.cursor.typing {
		animation: blink-fast 0.8s step-end infinite;
	}

	.cursor.done {
		opacity: 0;
	}

	.cursor.done.on {
		opacity: 1;
		text-shadow: var(--glow-text);
	}

	@keyframes blink-fast {
		0%, 100% { opacity: 1; }
		50% { opacity: 0; }
	}

	.link-strip {
		display: flex;
		gap: 0.75rem;
		flex-wrap: wrap;
		justify-content: center;
	}

	.link-pill {
		display: flex;
		align-items: center;
		gap: 0.4rem;
		padding: 0.35rem 0.9rem;
		border: 1px solid var(--link-border);
		background: var(--link-bg);
		color: var(--text);
		text-decoration: none;
		font-size: 0.75rem;
		letter-spacing: 0.05em;
		transition: all 0.2s;
		text-shadow: var(--glow-text);
	}

	.link-pill:hover {
		background: rgba(57, 255, 107, 0.15);
		border-color: var(--text);
		box-shadow: 0 0 12px var(--glow);
	}

	.page.light .link-pill:hover {
		background: rgba(92, 34, 0, 0.1);
	}

	.link-prompt {
		color: var(--text-dim);
	}

	@media (max-width: 600px) {
		.wrap { padding: 1rem 0.5rem; }
		.screen { padding: 1rem; min-height: 360px; }
		.topbar { padding: 0.5rem 1rem; }
		.design-nav { gap: 0.75rem; }
	}
</style>
