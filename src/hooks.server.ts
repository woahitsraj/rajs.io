import type { Handle } from '@sveltejs/kit';
import { paraglideMiddleware } from './paraglide/server.js';
import { getTextDirection } from './paraglide/runtime.js';

export const handle: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ request, locale }) => {
		event.request = request;

		return resolve(event, {
			transformPageChunk: ({ html }) =>
				html.replace('%lang%', locale).replace('%dir%', getTextDirection(locale))
		});
	});
