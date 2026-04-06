<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { m } from '../paraglide/messages.js';
	import { extractLocaleFromUrl, locales, localizeHref } from '../paraglide/runtime.js';

	const localeMarks: Record<string, string> = {
		en: 'EN',
		sv: 'SV',
		jp: 'JP',
		es: 'ES'
	};

	let root: HTMLDivElement | undefined;
	let open = $state(false);
	let currentLocale = $derived(extractLocaleFromUrl(page.url) ?? locales[0] ?? 'en');
	let currentPath = $derived(page.url.pathname);
	let selectedMark = $derived(localeMarks[currentLocale] ?? currentLocale.toUpperCase());

	function close() {
		open = false;
	}

	function toggle() {
		open = !open;
	}

	function handleDocumentClick(event: MouseEvent) {
		if (!root) return;

		const target = event.target;

		if (target instanceof Node && !root.contains(target)) {
			close();
		}
	}

	function handleDocumentKeydown(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			close();
		}
	}

	onMount(() => {
		document.addEventListener('click', handleDocumentClick, true);
		document.addEventListener('keydown', handleDocumentKeydown);

		return () => {
			document.removeEventListener('click', handleDocumentClick, true);
			document.removeEventListener('keydown', handleDocumentKeydown);
		};
	});

	$effect(() => {
		currentPath;
		close();
	});
</script>

<div class="language-selector" class:is-open={open} bind:this={root}>
	<button
		type="button"
		class="language-selector__trigger"
		aria-haspopup="menu"
		aria-expanded={open}
		aria-label={m.language_selector_aria()}
		onclick={toggle}
	>
		<span class="language-selector__code">{selectedMark}</span>
		<span class="language-selector__chevron" aria-hidden="true"></span>
	</button>

	<div class="language-selector__menu" class:open>
		<div class="language-selector__panel" role="menu" aria-label={m.language_selector_menu_aria()}>
			{#each locales as locale (locale)}
				<a
					href={localizeHref(currentPath, { locale })}
					class="language-selector__option"
					class:active={currentLocale === locale}
					role="menuitem"
					aria-current={currentLocale === locale ? 'page' : undefined}
					onclick={close}
				>
					<span>{localeMarks[locale] ?? locale.toUpperCase()}</span>
				</a>
			{/each}
		</div>
	</div>
</div>
