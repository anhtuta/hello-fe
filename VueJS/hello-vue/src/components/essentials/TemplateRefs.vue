<script setup>
import { ref, onMounted, watchEffect } from 'vue'

// declare a ref to hold the element reference
// the name must match template ref value
const inputRefDemo = ref(null)

onMounted(() => {
    // Uncomment to test focus
    // inputRefDemo.value.focus()
})

// Note that you can only access the ref after the component is mounted. If you try to access input
// in a template expression, it will be null on the first render. This is because the element doesn't
// exist until after the first render!
// If you are trying to watch the changes of a template ref, make sure to account for the case
// where the ref has null value
watchEffect(() => {
    if (inputRefDemo.value) {
        // Uncomment to test focus
        // inputRefDemo.value.focus()
    } else {
        // not mounted yet, or the element was unmounted (e.g. by v-if)
    }
})
</script>

<template>
    <h1>Template Refs</h1>
    <input ref="inputRefDemo" placeholder="This will be focused when render" style="width: 100%">
</template>