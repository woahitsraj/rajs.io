const LEGACY_LOCALE_ALIASES: Record<string, string> = {
	jp: 'ja'
};

export function rewriteLegacyLocalePathname(pathname: string) {
	for (const [from, to] of Object.entries(LEGACY_LOCALE_ALIASES)) {
		if (pathname === `/${from}` || pathname.startsWith(`/${from}/`)) {
			return pathname.replace(`/${from}`, `/${to}`);
		}
	}

	return pathname;
}
