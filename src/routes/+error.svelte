<script lang="ts">
	import { page } from '$app/state';
	import SiteShell from '$lib/SiteShell.svelte';

	let status = $derived(page.status);
	let message = $derived(
		status === 404
			? 'The page you requested could not be found.'
			: (page.error?.message ?? 'Something went wrong.')
	);
</script>

<svelte:head>
	<title>{status === 404 ? 'Page Not Found' : 'Something Went Wrong'} | Rajan Singh</title>
</svelte:head>

<SiteShell footerText="Rajan Singh">
	<main class="error-page reveal reveal-1">
		<section class="error-card">
			<p class="error-code">{status}</p>
			<h1>{status === 404 ? 'This page is off the map.' : 'Something went wrong.'}</h1>
			<p class="error-message">{message}</p>
			<div class="error-actions">
				<a href="/">Back home</a>
			</div>
		</section>
	</main>
</SiteShell>
