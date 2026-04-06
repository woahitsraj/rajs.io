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
	import { m } from '../../paraglide/messages.js';
	import { extractLocaleFromUrl } from '../../paraglide/runtime.js';
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

	const localeTags: Record<string, string> = {
		en: 'en',
		sv: 'sv',
		jp: 'ja',
		es: 'es'
	};

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
	] satisfies SocialLink[]);
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

<header class="hero reveal reveal-1">
	<figure class="portrait">
		<img src={me} alt={m.profile_name()} />
	</figure>
	<div>
		<p class="eyebrow" data-baffle>{m.home_eyebrow()}</p>
		<h1>
			<span data-baffle>{m.profile_name_first()}</span><br /><em data-baffle
				>{m.profile_name_last()}</em
			>
		</h1>
		<p class="subtitle" data-baffle>{m.home_subtitle()}</p>
	</div>
</header>

<main class="grid">
	<section class="span-2 reveal reveal-2">
		<h2 data-baffle>{m.home_about_heading()}</h2>
		<p>
			<span data-baffle>{m.home_about_p1_before()}</span><a href="https://withglide.com/">Glide</a
			><span data-baffle>{m.home_about_p1_after()}</span>
		</p>
		<p data-baffle>{m.home_about_p2()}</p>
		<p data-baffle>{m.home_about_p3()}</p>
		<p data-baffle>{m.home_about_p4()}</p>
	</section>

	<section class="reveal reveal-3">
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

	<section class="location reveal reveal-4">
		<h2 data-baffle>{m.home_location_heading()}</h2>
		<p class="flag" aria-hidden="true">{locationFlag}</p>
		<p class="country" data-baffle>{locationCountry}</p>
		<p class="city" data-baffle>{locationCity}</p>
	</section>

	<section class="languages reveal reveal-5">
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

	<section class="reveal reveal-5">
		<h2 data-baffle>{m.home_connect_heading()}</h2>
		<div class="links">
			{#each socialLinks as link (link.href)}
				<a href={link.href} target="_blank" rel="noopener noreferrer" class:text-only={!link.icon}>
					{#if link.icon}
						<span class="link-icon" aria-hidden="true">
							{#if isCustomIcon(link.icon)}
								<svg class="stroke-icon" viewBox="0 0 24 24" focusable="false">
									<path
										d="M8 3.5h6.25l4.25 4.25V19A1.5 1.5 0 0 1 17 20.5H8A1.5 1.5 0 0 1 6.5 19V5A1.5 1.5 0 0 1 8 3.5Z"
									/>
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
					<span class="link-label" data-baffle>{link.label}</span>
				</a>
			{/each}
		</div>
	</section>
</main>
