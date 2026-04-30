<script lang="ts">
	import { page } from '$app/state';
	import { onMount } from 'svelte';
	import { m } from '$lib/paraglide/messages.js';
	import { extractLocaleFromUrl, locales, localizeHref } from '$lib/paraglide/runtime.js';

	const localeMarks: Record<string, string> = {
		en: 'EN',
		sv: 'SV',
		ja: 'JA',
		es: 'ES'
	};

	let root: HTMLDivElement | undefined;
	let open = $state(false);
	let currentLocale = $derived(extractLocaleFromUrl(page.url) ?? locales[0] ?? 'en');
	let currentPath = $derived(`${page.url.pathname}${page.url.search}`);
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
	<form class="language-selector__fallback" method="GET" action="/locale">
		<label class="language-selector__sr-only" for="language-selector-native">
			{m.language_selector_aria()}
		</label>
		<input type="hidden" name="path" value={currentPath} />
		<select
			id="language-selector-native"
			name="locale"
			class="language-selector__native"
			aria-label={m.language_selector_aria()}
			value={currentLocale}
		>
			{#each locales as locale (locale)}
				<option value={locale}>
					{localeMarks[locale] ?? locale.toUpperCase()}
				</option>
			{/each}
		</select>
		<button type="submit" class="language-selector__submit">Go</button>
	</form>

	<div class="language-selector__enhanced">
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
			<div
				class="language-selector__panel"
				role="menu"
				aria-label={m.language_selector_menu_aria()}
			>
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
</div>

<style>
	.language-selector {
		position: relative;
	}

	.language-selector__enhanced {
		display: none;
	}

	:global(html.js) .language-selector__enhanced {
		display: block;
	}

	:global(html.js) .language-selector__fallback {
		display: none;
	}

	.language-selector__fallback {
		display: inline-flex;
		align-items: center;
		gap: 0.45rem;
		margin: 0;
	}

	.language-selector__sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		white-space: nowrap;
		border: 0;
	}

	.language-selector__native,
	.language-selector__submit,
	.language-selector__trigger {
		width: auto;
		min-width: 0;
		height: 2rem;
		border: 1px solid var(--site-rule);
		border-radius: var(--radius-pill);
		background: color-mix(in srgb, var(--site-surface) 82%, var(--site-bg) 18%);
		box-shadow: inset 0 1px 0 var(--site-ring);
		color: var(--site-text-muted);
		font-family: var(--font-body);
		font-size: 1rem;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	.language-selector__native,
	.language-selector__submit {
		cursor: pointer;
		transition:
			border-color 0.45s ease,
			color 0.45s ease,
			background-color 0.45s ease;
	}

	.language-selector__trigger {
		padding: 0 0.55rem 0 0.65rem;
		cursor: pointer;
		gap: 0.4rem;
		transition:
			border-color 0.45s ease,
			color 0.45s ease,
			background-color 0.45s ease;
	}

	.language-selector__native {
		padding: 0 0.8rem;
		appearance: auto;
	}

	.language-selector__submit {
		padding: 0 0.8rem;
	}

	.language-selector__native:hover,
	.language-selector__native:focus-visible,
	.language-selector__submit:hover,
	.language-selector__submit:focus-visible,
	.language-selector__trigger:hover,
	.language-selector.is-open .language-selector__trigger {
		border-color: var(--site-accent);
		color: var(--site-accent);
		background: color-mix(in srgb, var(--site-surface) 92%, var(--site-bg) 8%);
	}

	.language-selector__native:focus-visible,
	.language-selector__submit:focus-visible,
	.language-selector__trigger:focus-visible {
		outline: 2px solid var(--site-accent);
		outline-offset: 3px;
	}

	.language-selector__code,
	.language-selector__option {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		font-size: 0.68rem;
		line-height: 1;
		letter-spacing: 0.16em;
		text-transform: uppercase;
	}

	.language-selector__chevron {
		width: 0.42rem;
		height: 0.42rem;
		margin-top: -0.12rem;
		border-right: 1px solid currentColor;
		border-bottom: 1px solid currentColor;
		transform: rotate(45deg);
		transition:
			transform 0.24s ease,
			color 0.24s ease;
	}

	.language-selector.is-open .language-selector__chevron {
		transform: rotate(-135deg) translateY(-0.04rem);
	}

	.language-selector__menu {
		position: absolute;
		top: calc(100% + 0.45rem);
		right: 0;
		z-index: 21;
		width: 4rem;
		opacity: 0;
		visibility: hidden;
		transform: translateY(-0.2rem);
		transform-origin: top right;
		pointer-events: none;
		transition:
			opacity 0.2s ease,
			visibility 0.2s ease,
			transform 0.2s ease;
	}

	.language-selector__menu.open {
		opacity: 1;
		visibility: visible;
		transform: translateY(0);
		pointer-events: auto;
	}

	.language-selector__panel {
		padding: 0.25rem;
		border: 1px solid var(--site-rule);
		border-radius: 12px;
		background: color-mix(in srgb, var(--site-surface) 94%, var(--site-bg) 6%);
		box-shadow:
			0 12px 28px -20px var(--site-shadow),
			inset 0 1px 0 var(--site-ring);
		backdrop-filter: blur(12px);
	}

	.language-selector__option {
		width: 100%;
		padding: 0.5rem 0;
		border-radius: 9px;
		color: var(--site-text-muted);
		text-decoration: none;
		box-sizing: border-box;
	}

	.language-selector__option:hover,
	.language-selector__option.active {
		background: var(--site-accent-soft);
		color: var(--site-accent);
	}

	@media (max-width: 768px) {
		.language-selector__trigger {
			padding-inline: 0.6rem 0.5rem;
		}

		.language-selector__fallback {
			gap: 0.35rem;
		}
	}
</style>
