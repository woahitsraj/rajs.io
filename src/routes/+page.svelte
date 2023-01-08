<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	$: ({ city, country } = data);
</script>

Hello.
{#if city && country}
	I am currently in {city}, {country}.
{/if}
