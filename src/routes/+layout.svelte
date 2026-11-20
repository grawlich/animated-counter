<script>
	// Global CSS
	import '../app.css';

	// Props
	let {
		children
	} = $props();
</script>

<!-- Wrapper -->
<main class="wrapper w-screen h-screen grid place-items-center">
	{@render children()}
</main>
