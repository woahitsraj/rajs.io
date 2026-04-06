<script lang="ts">
	import { page } from '$app/state';
	import SiteShell from '$lib/SiteShell.svelte';
	import { m } from '../paraglide/messages.js';
	import { localizeHref } from '../paraglide/runtime.js';

	let status = $derived(page.status);
	let message = $derived(
		status === 404
			? m.error_not_found_description()
			: (page.error?.message ?? m.error_generic_description())
	);
</script>

<svelte:head>
	<title
		>{status === 404 ? m.error_not_found_title() : m.error_generic_title()} | {m.profile_name()}</title
	>
</svelte:head>

<SiteShell footerText={m.profile_name()}>
	<main class="error-page reveal reveal-1">
		<section class="error-card">
			<p class="error-code">{status}</p>
			<h1 data-baffle>
				{status === 404 ? m.error_not_found_heading() : m.error_generic_description()}
			</h1>
			<p class="error-message" data-baffle>{message}</p>
			<div class="error-actions">
				<a href={localizeHref('/')} data-baffle>{m.error_back_home()}</a>
			</div>
		</section>
	</main>
</SiteShell>
