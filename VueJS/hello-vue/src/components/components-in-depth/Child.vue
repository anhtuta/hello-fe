<script setup>
// `defineEmits` is a compiler macro and no longer needs to be imported:
// import { defineEmits } from 'vue';

// It's recommended to use defineEmits to explicitly define the events a component can emit,
// it is not strictly required. If you don't use defineEmits, Vue will still allow you to emit events,
// but you lose some of the benefits that come with explicit event definitions. - Copilot

// A component can explicitly declare the events it will emit using the defineEmits() macro
defineEmits(['anEventEmittedFromChild', 'increaseBy']);
</script>

<template>
    <!-- A component can emit custom events directly in template expressions
        (e.g. in a v-on handler) using the built-in $emit method -->
    <button @click="$emit('anEventEmittedFromChild')">Click Me</button>

    <!-- Có thể emit Arguments cùng với event -->
    <button @click="$emit('increaseBy', 1)">
        Increase by 1
    </button>
</template>