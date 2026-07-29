// Svelte utilities
import { writable } from 'svelte/store';


// Utilities
import { animate, utils } from 'animejs';


// Animation store
export function createAnimatedStore(initialValue) {
  // Setup store
  const { subscribe, set } = writable(initialValue);


  // Setup state
  let currentAnimation = null;
  let targetValue = initialValue;
  let currentValue = initialValue;


  // Anime v4 requires an object to modify
  const proxy = { value: initialValue };


  // Return store methods
  return {
    subscribe,
    set: (newValue) => {
      proxy.value = currentValue;
      targetValue = newValue;

      if (currentAnimation) {
        currentAnimation.pause();
      }
      
      currentAnimation = animate(proxy, {
        value: targetValue,
        duration: 500,
        ease: 'inSine',
        onRender: () => {
          currentValue = Math.round(proxy.value);
          set(currentValue);
        },
        onComplete: () => {
          currentAnimation = null;
          currentValue = targetValue;
          set(currentValue);
        }
      });
    },
    getTargetValue: () => targetValue,
    getCurrentValue: () => currentValue
  };
}