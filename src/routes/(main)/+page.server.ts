import type { PageServerLoad } from './$types';

export interface NomadListData {
	success: string;
	legal: string;
	photo: string;
	username: string;
	location: Location;
	stats: Stats;
	map: string;
	trips: Trip[];
	frequent_visits: FrequentVisits;
	longest_stays: LongestStays;
}

export interface Location {
	now?: LocationInstance;
	next?: LocationInstance;
	previous?: LocationInstance;
}

export interface LocationInstance {
	city: string;
	country: string;
	country_code: string;
	latitude: number;
	longitude: number;
	epoch_start: number;
	epoch_end: number;
	date_start: string;
	date_end: string;
	place_photo: string;
}

export interface Stats {
	cities: number;
	countries: number;
	followers: number;
	following: number;
	distance_traveled_km: number;
	distance_traveled_miles: number;
	countries_visited_percentage: number;
	cities_visited_percentage: number;
}

export interface Trip {
	epoch_start: number;
	epoch_end: number;
	date_start: string;
	date_end: string;
	length: string;
	epoch_duration: number;
	place: string;
	place_slug?: string;
	place_long_slug?: string;
	place_url?: string;
	place_photo: string;
	country: string;
	country_code: string;
	country_slug: string;
	latitude: number;
	longitude: number;
	trip_id: string;
}

export interface FrequentVisits {
	'gothenburg-sweden': number;
	'los-angeles-ca-united-states': number;
	'toronto-canada': number;
	'berlin-germany': number;
	'san-francisco-ca-united-states': number;
	'tokyo-japan': number;
	'budapest-hungary': number;
	'stockholm-sweden': number;
	'kyoto-japan': number;
	'port-of-spain-trinidad-and-tobago': number;
	'copenhagen-denmark': number;
	'jakarta-indonesia': number;
	'bandung-indonesia': number;
	'yogyakarta-indonesia': number;
	'surabaya-indonesia': number;
	'canggu-bali-indonesia': number;
	'split-croatia': number;
	'rome-italy': number;
	'munich-germany': number;
	'warsaw-poland': number;
	'medellin-colombia': number;
	'saint-petersburg-russia': number;
	'valencia-spain': number;
	'london-united-kingdom': number;
	'reykjavik-iceland': number;
	'new-york-city-ny-united-states': number;
	'playa-del-carmen-mexico': number;
	'seattle-wa-united-states': number;
	'hanoi-vietnam': number;
	'kolkata-india': number;
	'da-nang-vietnam': number;
	'nha-trang-vietnam': number;
	'ho-chi-minh-city-vietnam': number;
	'sapporo-japan': number;
}

export interface LongestStays {
	'toronto-canada': number;
	'gothenburg-sweden': number;
	'san-francisco-ca-united-states': number;
	'los-angeles-ca-united-states': number;
	'berlin-germany': number;
	'tokyo-japan': number;
	'kyoto-japan': number;
	'warsaw-poland': number;
	'reykjavik-iceland': number;
	'munich-germany': number;
	'rome-italy': number;
	'medellin-colombia': number;
	'budapest-hungary': number;
	'playa-del-carmen-mexico': number;
	'port-of-spain-trinidad-and-tobago': number;
	'stockholm-sweden': number;
	'saint-petersburg-russia': number;
	'valencia-spain': number;
	'canggu-bali-indonesia': number;
	'split-croatia': number;
	'sapporo-japan': number;
	'yogyakarta-indonesia': number;
	'new-york-city-ny-united-states': number;
	'seattle-wa-united-states': number;
	'hanoi-vietnam': number;
	'ho-chi-minh-city-vietnam': number;
	'copenhagen-denmark': number;
	'jakarta-indonesia': number;
	'bandung-indonesia': number;
	'surabaya-indonesia': number;
	'nha-trang-vietnam': number;
	'london-united-kingdom': number;
	'kolkata-india': number;
	'da-nang-vietnam': number;
}

interface CachedLocation {
	city?: string;
	country?: string;
	countryCode?: string;
}

const NOMADLIST_FRESH_MS = 5 * 60_000;
const NOMADLIST_RETRY_MS = 60_000;

let cachedLocation: CachedLocation | undefined;
let cachedAt = 0;
let lastAttemptAt = 0;
let refreshPromise: Promise<CachedLocation> | undefined;

export const config = {
	isr: {
		expiration: 300
	}
};

async function fetchNomadLocation(fetch: PageServerLoadEvent['fetch']): Promise<CachedLocation> {
	const res = await fetch('https://nomadlist.com/@woahitsraj.json');
	if (!res.ok) {
		throw new Error(`Nomad List request failed: ${res.status}`);
	}

	const data: NomadListData = await res.json();
	const location = data?.location?.now || data?.location?.next;

	return {
		city: location?.city,
		country: location?.country,
		countryCode: location?.country_code
	};
}

function startRefresh(fetch: PageServerLoadEvent['fetch']) {
	const now = Date.now();
	if (refreshPromise) return refreshPromise;
	if (now - lastAttemptAt < NOMADLIST_RETRY_MS) {
		return Promise.resolve(cachedLocation ?? {});
	}

	lastAttemptAt = now;
	refreshPromise = fetchNomadLocation(fetch)
		.then((location) => {
			cachedLocation = location;
			cachedAt = Date.now();
			return location;
		})
		.catch(() => cachedLocation ?? {})
		.finally(() => {
			refreshPromise = undefined;
		});

	return refreshPromise;
}

type PageServerLoadEvent = Parameters<PageServerLoad>[0];

export const load = (async ({ fetch, setHeaders }) => {
	setHeaders({
		'cache-control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=86400'
	});

	const now = Date.now();
	if (cachedLocation && now - cachedAt < NOMADLIST_FRESH_MS) {
		return cachedLocation;
	}

	if (cachedLocation) {
		void startRefresh(fetch);
		return cachedLocation;
	}

	try {
		return await startRefresh(fetch);
	} catch {
		return {};
	}
}) satisfies PageServerLoad;
