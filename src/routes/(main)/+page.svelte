<script lang="ts">
	import {
		siBluesky,
		siGithub,
		siGoodreads,
		siInstagram,
		siLetterboxd,
		siThreads,
		siX
	} from 'simple-icons';
	import type { SimpleIcon } from 'simple-icons';
	import type { PageData } from './$types';
	import resume from '$lib/assets/Rajan Singh Resume.pdf';
	import me from '$lib/assets/me.jpeg';

	interface Props {
		data: PageData;
	}

	type LinkIcon = Pick<SimpleIcon, 'path'> | 'resume';

	interface SocialLink {
		label: string;
		href: string;
		icon?: LinkIcon;
	}

	const socialLinks: SocialLink[] = [
		{ label: 'Resume', href: resume, icon: 'resume' },
		{ label: 'GitHub', href: 'https://github.com/woahitsraj', icon: siGithub },
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/woahitsraj/' },
		{ label: 'Bluesky', href: 'https://bsky.app/profile/woahitsraj.com', icon: siBluesky },
		{ label: 'Goodreads', href: 'https://www.goodreads.com/woahitsraj', icon: siGoodreads },
		{ label: 'Letterboxd', href: 'https://letterboxd.com/woahitsraj/', icon: siLetterboxd },
		{ label: 'Instagram', href: 'https://instagram.com/woahitsraj', icon: siInstagram },
		{ label: 'Threads', href: 'https://www.threads.net/@woahitsraj', icon: siThreads },
		{ label: 'Twitter', href: 'https://twitter.com/woahitsraj', icon: siX }
	];

	function isCustomIcon(icon?: LinkIcon): icon is 'resume' {
		return typeof icon === 'string';
	}

	function flagFromCountryCode(code?: string) {
		if (!code || code.length !== 2) return '🇸🇪';
		return String.fromCodePoint(
			...code
				.toUpperCase()
				.split('')
				.map((char) => 127397 + char.charCodeAt(0))
		);
	}

	let { data }: Props = $props();
	let city = $derived(data.city);
	let country = $derived(data.country);
	let countryCode = $derived(data.countryCode);
	let locationCountry = $derived(country ?? 'Sweden');
	let locationCity = $derived(city ?? 'Gothenburg');
	let locationFlag = $derived(flagFromCountryCode(countryCode ?? 'SE'));
</script>

<svelte:head>
	<title>Rajan Singh</title>
</svelte:head>

<header class="hero reveal reveal-1">
	<figure class="portrait">
		<img src={me} alt="Rajan Singh" />
	</figure>
	<div>
		<p class="eyebrow">Hi! I'm</p>
		<h1>Rajan<br /><em>Singh</em></h1>
		<p class="subtitle">Full-stack developer</p>
	</div>
</header>

<main class="grid">
	<section class="span-2 reveal reveal-2">
		<h2>About</h2>
		<p>
			I'm a developer currently at <a href="https://withglide.com/">Glide</a>. I'm experienced in
			React/Svelte and Typescript but I'm always learning new things. For me programming isn't just
			a career, it's been a lifelong hobby.
		</p>
		<p>
			I attend development related meet-ups and conferences, listen to development podcast and I am
			always keen to try new things which got me hooked onto React and Svelte early.
		</p>
		<p>I'm an American 🇺🇸 and Canadian 🇨🇦 citizen but currently I call Sweden 🇸🇪 my home.</p>
		<p>
			I'm a strong believer in long periods of undistracted "deep work" to get things done. I speak
			English natively and I speak Japanese 🇯🇵 and Swedish 🇸🇪 at conversational fluency.
		</p>
	</section>

	<section class="reveal reveal-3">
		<h2>Skills</h2>
		<dl class="skills-list">
			<div>
				<dt>Programming Languages</dt>
				<dd>TypeScript, JavaScript, HTML, CSS, Bash</dd>
			</div>
			<div>
				<dt>Frameworks and Tools</dt>
				<dd>
					React, Svelte, SvelteKit, Drizzle, tRPC, SQL, GraphQL, Node, Webpack, Git, Vite, Unix,
					PWAs
				</dd>
			</div>
		</dl>
	</section>

	<section class="location reveal reveal-4">
		<h2>Location</h2>
		<p class="flag" aria-hidden="true">{locationFlag}</p>
		<p class="country">{locationCountry}</p>
		<p class="city">{locationCity}</p>
	</section>

	<section class="languages reveal reveal-5">
		<h2>Languages</h2>
		<ul>
			<li>
				<span>🇺🇸 English</span>
				<em>Native</em>
			</li>
			<li>
				<span>🇯🇵 Japanese</span>
				<em>Conversational</em>
			</li>
			<li>
				<span>🇸🇪 Swedish</span>
				<em>Conversational</em>
			</li>
		</ul>
	</section>

	<section class="reveal reveal-5">
		<h2>Connect</h2>
		<div class="links">
			{#each socialLinks as link (link.href)}
				<a href={link.href} target="_blank" rel="noopener noreferrer" class:text-only={!link.icon}>
					{#if link.icon}
						<span class="link-icon" aria-hidden="true">
							{#if isCustomIcon(link.icon)}
								<svg class="stroke-icon" viewBox="0 0 24 24" focusable="false">
									<path d="M8 3.5h6.25l4.25 4.25V19A1.5 1.5 0 0 1 17 20.5H8A1.5 1.5 0 0 1 6.5 19V5A1.5 1.5 0 0 1 8 3.5Z" />
									<path d="M14.25 3.5V8h4.25" />
									<path d="M9 12h6" />
									<path d="M9 15h6" />
								</svg>
							{:else}
								<svg viewBox="0 0 24 24" focusable="false">
									<path d={link.icon.path}></path>
								</svg>
							{/if}
						</span>
					{/if}
					<span class="link-label">{link.label}</span>
				</a>
			{/each}
		</div>
	</section>
</main>
