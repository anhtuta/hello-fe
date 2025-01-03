import { defineStore } from "pinia";

// This example uses the Option Stores approach
// Option stores should feel intuitive and simple to get started with.
// Ref: https://pinia.vuejs.org/core-concepts/
export const useCounterStore1 = defineStore("counter1", {
  state: () => ({ count: 0, name: "Eduardo" }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
    decrement() {
      this.count--;
    },
  },
});
