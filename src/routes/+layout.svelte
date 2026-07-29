<script>
	import '../app.css';

	let {
		children
	} = $props();
</script>

<main class="wrapper w-screen h-screen grid place-items-center">
	{@render children()}
</main>