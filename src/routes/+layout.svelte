<script>
	import Footer from '$lib/Footer.svelte';
	import Header from '$lib/Header.svelte';
	import './style.css';
	import './normalize.css';
	import './main.css';
</script>

<Header />
<main>
	<slot />
</main>
<Footer />
