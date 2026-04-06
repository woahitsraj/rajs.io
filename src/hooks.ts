import type { Reroute } from '@sveltejs/kit';
import { deLocalizeUrl } from './paraglide/runtime.js';

export const reroute: Reroute = ({ url }) => deLocalizeUrl(url).pathname;
