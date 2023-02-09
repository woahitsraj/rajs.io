<script lang="ts">
	import type { PageData } from './$types';
	import me from '$lib/assets/me.jpg';
	export let data: PageData;
	$: ({ city, country } = data);
</script>

<header>
	<div class="content">
		<p>Hi! I'm</p>
		<h1>Rajan Singh</h1>
		<p>Full-stack developer</p>
	</div>
</header>

<div>
	<h2>About</h2>
	<hr />
	<img src={me} alt="Rajan Singh" />
	<p>
		I'm a developer currently at <a href="https://subskribe.com/">Subskribe</a>. I program in
		React/Svelte and Node but I'm always learning new things. For me programming isn't just a
		career, it's been a lifelong hobby.
	</p>
	<p>
		I attend development related meet-ups and conferences, listen to development podcast and I am
		always itching try new things which got me hooked onto React and Svelte early.
	</p>
	<p>
		I'm a strong believer in long periods of undistracted "deep work" as popularized by Cal Newport
		to perform at a high level. I speak English natively and I speak Japanese 🇯🇵 and Swedish 🇸🇪 at
		conversational fluency.
	</p>
	<p>I'm an American 🇺🇸 and Canadian 🇨🇦 citizen but currently I call Sweden 🇸🇪 my home</p>
	{#if city && country}
		<p>
			I tend to move around a lot but currently I am in {city}, {country}.
		</p>
	{/if}
</div>

<style>
	header {
		height: 100vh;
		max-height: 64rem;
	}
	.content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		height: 100%;
	}
	h1 {
		margin-top: 0px;
		margin-bottom: 0px;
		font-size: 5rem;
	}
	h2 {
		font-size: 3rem;
	}
	header p {
		font-size: 2.5rem;
	}
	p {
		font-size: 1.5rem;
	}
	img {
		width: 12rem;
		height: 12rem;
		float: right;
		display: inline;
		border-radius: 9999px;
		max-width: 100%;
	}
</style>
