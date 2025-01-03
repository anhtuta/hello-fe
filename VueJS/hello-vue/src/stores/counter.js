import { ref, computed } from "vue";
import { defineStore } from "pinia";

// Note: there're two ways to define a store:
// 1. Option Stores: defineStore("storeName", () => { ... })
// 2. Setup Stores: defineStore("storeName", { state: () => { ... }, getters: { ... }, actions: { ... } })
// What syntax should I pick?
// As with Vue's Composition API and Options API, pick the one that you feel the most comfortable with.
// Both have their strengths and weaknesses. Options stores are easier to work with while Setup stores
// are more flexible and powerful.
// This example uses the Setup Stores approach
// In Setup Stores:
// - ref()s become state properties
// - computed()s become getters
// - function()s become actions
export const useCounterStore = defineStore("counter", () => {
  //===== state =====//
  const count = ref(0);

  //===== actions: to modify the state =====//
  function increaseCount() {
    count.value++;
  }
  function decreaseCount() {
    count.value--;
  }
  function doubleCount() {
    count.value *= 2;
  }

  //===== getters: to get the state, or compute new values based on the state =====//
  const oddOrEven = computed(() => {
    if (count.value % 2 === 0) return "even";
    return "odd";
  });
  const isPrimaryNumber = computed(() => {
    const num = count.value;
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  });

  return {
    // state
    count,

    // actions
    increaseCount,
    decreaseCount,
    doubleCount,

    // getters
    oddOrEven,
    isPrimaryNumber,
  };
});
