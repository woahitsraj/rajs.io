<script lang="ts">
	import { page } from '$app/state';
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
	import { m } from '$lib/paraglide/messages.js';
	import { extractLocaleFromUrl } from '$lib/paraglide/runtime.js';
	import PageGrid from '$lib/PageGrid.svelte';
	import SocialLinks from '$lib/SocialLinks.svelte';
	import resume from '$lib/assets/Rajan Singh Resume.pdf';
	import me from '$lib/assets/me.jpeg';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	type LinkIcon = Pick<SimpleIcon, 'path'> | 'resume';

	const localeTags: Record<string, string> = {
		en: 'en',
		sv: 'sv',
		jp: 'ja',
		es: 'es'
	};

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
	let currentLocale = $derived(extractLocaleFromUrl(page.url) ?? 'en');
	let socialLinks = $derived([
		{ label: m.link_resume(), href: resume, icon: 'resume' },
		{ label: 'GitHub', href: 'https://github.com/woahitsraj', icon: siGithub },
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/woahitsraj/' },
		{ label: 'Bluesky', href: 'https://bsky.app/profile/woahitsraj.com', icon: siBluesky },
		{ label: 'Goodreads', href: 'https://www.goodreads.com/woahitsraj', icon: siGoodreads },
		{ label: 'Letterboxd', href: 'https://letterboxd.com/woahitsraj/', icon: siLetterboxd },
		{ label: 'Instagram', href: 'https://instagram.com/woahitsraj', icon: siInstagram },
		{ label: 'Threads', href: 'https://www.threads.net/@woahitsraj', icon: siThreads },
		{ label: 'Twitter', href: 'https://twitter.com/woahitsraj', icon: siX }
	] satisfies { label: string; href: string; icon?: LinkIcon }[]);
	let city = $derived(data.city);
	let country = $derived(data.country);
	let countryCode = $derived(data.countryCode);
	let locationCountry = $derived.by(() => {
		if (!countryCode) {
			return country ?? m.home_location_fallback_country();
		}

		try {
			const displayNames = new Intl.DisplayNames([localeTags[currentLocale] ?? 'en'], {
				type: 'region'
			});

			return (
				displayNames.of(countryCode.toUpperCase()) ?? country ?? m.home_location_fallback_country()
			);
		} catch {
			return country ?? m.home_location_fallback_country();
		}
	});
	let locationCity = $derived(city ?? m.home_location_fallback_city());
	let locationFlag = $derived(flagFromCountryCode(countryCode ?? 'SE'));
</script>

<svelte:head>
	<title>{m.profile_name()}</title>
</svelte:head>

<header class="home-hero reveal reveal-1">
	<figure class="home-hero__portrait">
		<img src={me} alt={m.profile_name()} />
	</figure>
	<div class="home-hero__content">
		<p class="home-hero__eyebrow" data-baffle>{m.home_eyebrow()}</p>
		<h1 class="home-hero__title">
			<span data-baffle>{m.profile_name_first()}</span><br /><em data-baffle
				>{m.profile_name_last()}</em
			>
		</h1>
		<p class="home-hero__subtitle" data-baffle>{m.home_subtitle()}</p>
	</div>
</header>

<PageGrid>
	<section class="home-card home-card--about page-grid__item page-grid__item--wide reveal reveal-2">
		<h2 data-baffle>{m.home_about_heading()}</h2>
		<p>
			<span data-baffle>{m.home_about_p1_before()}</span><a href="https://withglide.com/">Glide</a
			><span data-baffle>{m.home_about_p1_after()}</span>
		</p>
		<p data-baffle>{m.home_about_p2()}</p>
		<p data-baffle>{m.home_about_p3()}</p>
		<p data-baffle>{m.home_about_p4()}</p>
	</section>

	<section class="home-card home-card--skills page-grid__item reveal reveal-3">
		<h2 data-baffle>{m.home_skills_heading()}</h2>
		<dl class="skills-list">
			<div>
				<dt data-baffle>{m.home_skills_programming_languages()}</dt>
				<dd data-baffle>{m.home_skills_programming_languages_list()}</dd>
			</div>
			<div>
				<dt data-baffle>{m.home_skills_frameworks_tools()}</dt>
				<dd data-baffle>{m.home_skills_frameworks_tools_list()}</dd>
			</div>
		</dl>
	</section>

	<section class="home-card home-card--location page-grid__item reveal reveal-4">
		<h2 data-baffle>{m.home_location_heading()}</h2>
		<p class="flag" aria-hidden="true">{locationFlag}</p>
		<p class="country" data-baffle>{locationCountry}</p>
		<p class="city" data-baffle>{locationCity}</p>
	</section>

	<section class="home-card home-card--languages page-grid__item reveal reveal-5">
		<h2 data-baffle>{m.home_languages_heading()}</h2>
		<ul>
			<li>
				<span data-baffle>{m.home_language_english()}</span>
				<em data-baffle>{m.home_language_native()}</em>
			</li>
			<li>
				<span data-baffle>{m.home_language_japanese()}</span>
				<em data-baffle>{m.home_language_conversational()}</em>
			</li>
			<li>
				<span data-baffle>{m.home_language_swedish()}</span>
				<em data-baffle>{m.home_language_conversational()}</em>
			</li>
			<li>
				<span data-baffle>{m.home_language_spanish()}</span>
				<em data-baffle>{m.home_language_elementary()}</em>
			</li>
		</ul>
	</section>

	<section class="home-card home-card--connect page-grid__item reveal reveal-5">
		<h2 data-baffle>{m.home_connect_heading()}</h2>
		<SocialLinks links={socialLinks} />
	</section>
</PageGrid>

<style>
	.home-hero {
		padding: var(--space-48) 0 var(--space-32);
		display: flex;
		align-items: center;
		gap: 2.5rem;
	}

	.home-hero__portrait {
		flex-shrink: 0;
		width: clamp(120px, 15vw, 180px);
		height: clamp(120px, 15vw, 180px);
		padding: 0.6rem;
		margin: 0;
		border-radius: var(--radius-round);
		border: 1px solid var(--site-ring);
		background: var(--site-bg);
		box-shadow:
			inset 0 0 0 6px var(--site-ring),
			inset 0 0 0 20px var(--site-bg);
		transition:
			background-color 0.45s ease,
			border-color 0.45s ease,
			box-shadow 0.45s ease;
	}

	.home-hero__portrait img {
		display: block;
		width: 100%;
		height: 100%;
		border-radius: var(--radius-round);
		object-fit: cover;
		object-position: center 24%;
		filter: saturate(0.96) contrast(1.02);
	}

	.home-hero__content {
		max-width: 44rem;
	}

	.home-hero__eyebrow {
		font-size: var(--text-body);
		font-style: italic;
		color: var(--site-text-muted);
		margin: 0 0 0.45rem;
	}

	.home-hero__title {
		font-family: var(--font-display);
		font-size: clamp(3rem, 7vw, 6rem);
		font-weight: 300;
		line-height: 1;
		margin: 0 0 0.65rem;
		letter-spacing: -0.03em;
		color: var(--site-text);
		transition: color 0.45s ease;
	}

	.home-hero__title em {
		font-style: italic;
		color: var(--site-accent);
		transition: color 0.45s ease;
	}

	.home-hero__subtitle {
		font-size: var(--text-subtitle);
		color: var(--site-text-muted);
		margin: 0;
		letter-spacing: 0.02em;
		transition: color 0.45s ease;
	}

	.home-card h2 {
		font-size: var(--text-caption);
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--site-accent);
		margin: 0 0 var(--space-16);
		font-weight: 400;
		transition: color 0.45s ease;
	}

	.home-card--about p {
		font-size: var(--text-body);
		line-height: 1.8;
		color: var(--site-text);
		margin: 0 0 0.75rem;
		transition: color 0.45s ease;
	}

	.home-card--about p:last-child {
		margin-bottom: 0;
	}

	.home-card--about a {
		color: var(--site-accent);
		font-weight: 500;
		text-decoration-line: underline;
		text-decoration-thickness: 1px;
		text-underline-offset: 0.18em;
		text-decoration-color: rgba(122, 184, 128, 0.45);
	}

	.home-card--about a:hover {
		color: var(--site-text);
		text-decoration-color: var(--site-accent);
	}

	.skills-list {
		display: flex;
		flex-direction: column;
		gap: var(--space-16);
		margin: 0;
	}

	.skills-list div {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
	}

	.skills-list dt {
		font-size: var(--text-caption);
		letter-spacing: 0.08em;
		text-transform: uppercase;
		color: var(--site-text-muted);
	}

	.skills-list dd {
		margin: 0;
		font-size: var(--text-body);
		line-height: 1.7;
		color: var(--site-text);
	}

	.flag {
		font-size: 2.5rem;
		line-height: 1;
		margin-bottom: 0.4rem;
	}

	.country {
		font-family: var(--font-display);
		font-size: var(--text-location);
		font-weight: 300;
		line-height: 1.1;
		margin-bottom: 0.2rem;
		transition: color 0.45s ease;
	}

	.city {
		font-size: var(--text-caption);
		color: var(--site-text-muted);
		transition: color 0.45s ease;
	}

	.home-card--languages ul {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 0.7rem;
	}

	.home-card--languages li {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		color: var(--site-text);
	}

	.home-card--languages li span {
		flex: 1;
		font-size: var(--text-body);
		transition: color 0.45s ease;
	}

	.home-card--languages li em {
		font-size: var(--text-caption);
		color: var(--site-text-muted);
		font-style: italic;
		transition: color 0.45s ease;
	}

	@media (max-width: 768px) {
		.home-hero {
			gap: var(--space-24);
			padding: var(--space-32) 0 var(--space-24);
		}

		.home-hero__title {
			line-height: 1;
		}
	}
</style>
