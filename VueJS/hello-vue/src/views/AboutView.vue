<template>
  <div class="about">
    <h1>About</h1>
    <p>This is a VueJS tutorial, by Tuzaku</p>
    <Counter />
    <div class="buttons">
      <button @click="storeCounter.doubleCount">Double count</button>
    </div>
  </div>
</template>

<script setup>
import { useCounterStore } from "@/stores/counter";
import Counter from "@/components/Counter.vue";

const storeCounter = useCounterStore();
</script>

<style scoped>
.count {
  font-size: 60px;
}
.buttons button {
  font-size: 40px;
}
</style>
