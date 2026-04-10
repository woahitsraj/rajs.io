import { redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { locales, localizeHref } from '$lib/paraglide/runtime';

export const GET: RequestHandler = ({ url }) => {
	const path = url.searchParams.get('path') ?? '/';
	const requestedLocale = url.searchParams.get('locale');
	const locale = locales.find((entry) => entry === requestedLocale) ?? locales[0];
	const destination = localizeHref(path, { locale });

	throw redirect(303, destination);
};
