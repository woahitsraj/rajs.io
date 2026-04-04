<script lang="ts">
	import type { PageData } from './$types';
	import me from '$lib/assets/me.jpg';

	interface Props {
		data: PageData;
	}

	const socialLinks = [
		{ label: 'GitHub', href: 'https://github.com/woahitsraj' },
		{ label: 'LinkedIn', href: 'https://www.linkedin.com/in/woahitsraj/' },
		{ label: 'Instagram', href: 'https://instagram.com/woahitsraj' },
		{ label: 'Twitter', href: 'https://twitter.com/woahitsraj' }
	];

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
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link
		href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,700;1,9..144,300;1,9..144,400&family=Lora:ital,wght@0,400;0,500;1,400&display=swap"
		rel="stylesheet"
	/>
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
	</section>

	<section class="reveal reveal-3">
		<h2>Approach</h2>
		<p>
			I'm a strong believer in long periods of undistracted "deep work" as popularized by Cal
			Newport to perform at a high level. I speak English natively and I speak Japanese 🇯🇵 and
			Swedish 🇸🇪 at conversational fluency.
		</p>
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
				<a href={link.href} target="_blank" rel="noopener noreferrer">
					<span>⌥</span>
					{link.label}
				</a>
			{/each}
		</div>
	</section>
</main>
