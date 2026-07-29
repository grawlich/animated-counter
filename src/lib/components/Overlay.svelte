<script>
  // Svelte utilities
  import { onMount } from 'svelte';


  // Utilities
  import { animate } from 'animejs';
  

  // Props
  let {
    value
  } = $props();
  

  // Element reference
  let overlayElement;
  

  // On component load
  onMount(() => {
    // Start animation
    animate(overlayElement, {
      translateY: -50,
      opacity: 0,
      ease: 'outSine',
      duration: 2000,
      
      // Remove element from DOM after animation completes
      onComplete: () => {
        overlayElement.remove();
      }
    });
  });
</script>


<!-- Overlay text -->
<span 
  bind:this={overlayElement} 
  class="absolute top-[50%] left-full translate-x-full pl-4 text-3xl font-bold opacity-100 pointer-events-none"
  style="color: var(--color-{value > 0 ? 'success' : 'error'}-500);"
>
  {value > 0 ? '+' : ''}{value}
</span>