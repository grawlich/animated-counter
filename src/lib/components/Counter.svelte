<script>
  // Utilities
  import { createAnimatedStore } from '$lib/animatedStore';
  

  // Components
  import Overlay from '$lib/components/Overlay.svelte';
  
  // App state
  const count = createAnimatedStore(0);
  let overlays = $state([]);
  let stats = $state({
    heal: 10,
    damage: 10,
  });
  

  // Updates the value of the counter and displays a value indicator
  function updateCount(amount) {
    const currentTarget = count.getTargetValue();
    const newValue = currentTarget + amount;
    if (newValue >= 0) {
      count.set(newValue);
      overlays = [...overlays, { id: Date.now(), value: amount }];
    }
  }
  

  // Increase the current count by the "heal" value
  function increaseCount() {
    updateCount(stats?.heal);
  }
  

  // Decrease the current count by the "damage" value
  function decreaseCount() {
    updateCount(-stats?.damage);
  }


  // Reset counter to 0
  function resetCount() {
    const currentValue = count.getTargetValue();

    count.set(0);
    overlays = [...overlays, { id: Date.now(), value: -currentValue }];
  }
</script>


<!-- Counter container -->
<div class="w-full max-w-md flex flex-col items-center gap-2">
  <!-- Current count container -->
  <div class="relative w-full max-w-150 flex justify-center p-4 card bg-surface-950-50">
    <!-- Counter value -->
    <h1 class="h1 {$count > 999 ? 'text-7xl' : 'text-9xl'} font-black leading-none font-mono text-surface-50-950">{$count}</h1>
    <!-- Indicator overlays -->
    {#each overlays as overlay (overlay.id)}
      <Overlay value={overlay.value} />
    {/each}
  </div>


  <!-- Controls container -->
  <div class="w-full flex gap-2">
    <!-- Increase button -->
    <button class="w-full btn preset-tonal-success hover:preset-filled-success-500 hover:scale-105 active:scale-95 transition-all" onclick={increaseCount}>+{stats?.heal}</button>
    <!-- Decrease button -->
    <button class="w-full btn preset-tonal-error hover:preset-filled-error-500 hover:scale-105 active:scale-95 transition-all" onclick={decreaseCount} disabled={$count === 0}>-{stats?.damage}</button>
    <!-- Reset button -->
    <button class="w-full btn preset-filled-surface-200-800 hover:preset-filled-surface-500 hover:scale-105 active:scale-95 transition-all" onclick={resetCount} disabled={$count === 0}>Reset</button>
  </div>
</div>