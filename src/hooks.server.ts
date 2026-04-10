import { redirect, type Handle } from '@sveltejs/kit';
import { rewriteLegacyLocalePathname } from '$lib/locale-routing';
import { paraglideMiddleware } from '$lib/paraglide/server';
import { getTextDirection } from '$lib/paraglide/runtime';

// creating a handle to use the paraglide middleware
const paraglideHandle: Handle = ({ event, resolve }) => {
	const url = new URL(event.request.url);
	const rewrittenPathname = rewriteLegacyLocalePathname(url.pathname);

	if (rewrittenPathname !== url.pathname) {
		url.pathname = rewrittenPathname;
		throw redirect(308, url.toString());
	}

	return paraglideMiddleware(event.request, ({ request: localizedRequest, locale }) => {
		event.request = localizedRequest;
		return resolve(event, {
			transformPageChunk: ({ html }) => {
				return html.replace('%lang%', locale).replace('%dir%', getTextDirection(locale));
			}
		});
	});
};

export const handle: Handle = paraglideHandle;
