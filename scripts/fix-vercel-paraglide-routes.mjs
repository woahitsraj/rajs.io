import fs from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const configPath = path.join(root, '.vercel/output/config.json');
const inlangSettingsPath = path.join(root, 'project.inlang/settings.json');

async function readJson(filePath) {
	const contents = await fs.readFile(filePath, 'utf8');
	return JSON.parse(contents);
}

function escapeRegex(value) {
	return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function withPathname(dest, pathname) {
	const [target] = dest.split('?');
	return `${target}?__pathname=${pathname}`;
}

function insertBeforeCatchall(routes, extraRoutes) {
	const catchallIndex = routes.findIndex(
		(route) => route.src === '/.*' && route.dest === '/![-]/catchall'
	);

	if (catchallIndex === -1) {
		return false;
	}

	routes.splice(catchallIndex, 0, ...extraRoutes);
	return true;
}

function hasLocalizedRoute(routes, src) {
	return routes.some((route) => route.src === src);
}

function getLegacyLocaleAliases(locales) {
	if (locales.includes('ja')) {
		return { jp: 'ja' };
	}

	return {};
}

try {
	const [config, inlangSettings] = await Promise.all([
		readJson(configPath),
		readJson(inlangSettingsPath)
	]);

	const locales = inlangSettings.locales.filter((locale) => locale !== inlangSettings.baseLocale);
	const legacyLocaleAliases = getLegacyLocaleAliases(locales);

	if (locales.length === 0) process.exit(0);

	const localeGroup = locales.map(escapeRegex).join('|');
	const extraRoutes = [];

	const rootPageRoute = config.routes.find((route) => route.src === '^/?$');
	const rootDataRoute = config.routes.find((route) => route.src === '^/?/__data.json$');

	if (rootPageRoute) {
		const src = `^/(${localeGroup})/?$`;
		if (!hasLocalizedRoute(config.routes, src)) {
			extraRoutes.push({
				src,
				dest: withPathname(rootPageRoute.dest, '/$1')
			});
		}
	}

	if (rootDataRoute) {
		const src = `^/(${localeGroup})/__data.json$`;
		if (!hasLocalizedRoute(config.routes, src)) {
			extraRoutes.push({
				src,
				dest: withPathname(rootDataRoute.dest, '/$1')
			});
		}
	}

	for (const segment of ['experience', 'work']) {
		const baseRoute = config.routes.find(
			(route) => route.src === `^/${segment}/?(?:/__data.json)?$`
		);
		if (!baseRoute) continue;

		const src = `^/(${localeGroup})/${segment}/?(?:/__data.json)?$`;
		if (hasLocalizedRoute(config.routes, src)) continue;

		extraRoutes.push({
			src,
			dest: withPathname(baseRoute.dest, `/$1/${segment}`)
		});
	}

	for (const legacyLocale of Object.keys(legacyLocaleAliases)) {
		const rootSrc = `^/${escapeRegex(legacyLocale)}/?$`;
		if (rootPageRoute && !hasLocalizedRoute(config.routes, rootSrc)) {
			extraRoutes.push({
				src: rootSrc,
				dest: withPathname(rootPageRoute.dest, `/${legacyLocale}`)
			});
		}

		const dataSrc = `^/${escapeRegex(legacyLocale)}/__data.json$`;
		if (rootDataRoute && !hasLocalizedRoute(config.routes, dataSrc)) {
			extraRoutes.push({
				src: dataSrc,
				dest: withPathname(rootDataRoute.dest, `/${legacyLocale}`)
			});
		}

		for (const segment of ['experience', 'work']) {
			const baseRoute = config.routes.find(
				(route) => route.src === `^/${segment}/?(?:/__data.json)?$`
			);
			if (!baseRoute) continue;

			const src = `^/${escapeRegex(legacyLocale)}/${segment}/?(?:/__data.json)?$`;
			if (hasLocalizedRoute(config.routes, src)) continue;

			extraRoutes.push({
				src,
				dest: withPathname(baseRoute.dest, `/${legacyLocale}/${segment}`)
			});
		}
	}

	if (extraRoutes.length === 0) process.exit(0);

	const inserted = insertBeforeCatchall(config.routes, extraRoutes);
	if (!inserted) {
		throw new Error('Could not find Vercel catch-all route to insert localized rewrites before.');
	}

	await fs.writeFile(configPath, `${JSON.stringify(config, null, '\t')}\n`);
	console.log(
		`Patched Vercel routes for localized paths: ${locales.join(', ')}${
			Object.keys(legacyLocaleAliases).length > 0
				? `; legacy aliases: ${Object.entries(legacyLocaleAliases)
						.map(([from, to]) => `${from}->${to}`)
						.join(', ')}`
				: ''
		}`
	);
} catch (error) {
	if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
		process.exit(0);
	}

	throw error;
}
