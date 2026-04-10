declare module 'baffle' {
	export interface BaffleOptions {
		characters?: string | string[];
		exclude?: string[];
		speed?: number;
	}

	export interface BaffleInstance {
		once(): BaffleInstance;
		start(): BaffleInstance;
		stop(): BaffleInstance;
		reveal(duration?: number, delay?: number): BaffleInstance;
		set(options: BaffleOptions): BaffleInstance;
		text(fn: (text: string) => string): BaffleInstance;
	}

	export default function baffle(
		targets: string | Node | NodeList | HTMLCollection | Element[] | Element,
		options?: BaffleOptions
	): BaffleInstance;
}
