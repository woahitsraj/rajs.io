import type { Reroute } from '@sveltejs/kit';
import { deLocalizeUrl } from '$lib/paraglide/runtime';
import { rewriteLegacyLocalePathname } from '$lib/locale-routing';

export const reroute: Reroute = (request) => {
	const url = new URL(request.url);
	url.pathname = rewriteLegacyLocalePathname(url.pathname);
	return deLocalizeUrl(url).pathname;
};
