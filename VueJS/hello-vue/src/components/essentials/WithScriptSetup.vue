<script setup>
// Ref: https://vuejs.org/guide/essentials/reactivity-fundamentals
// This file is cloned from WithoutScriptSetup, but use script setup instead of setup() method.
// As you can see, we can reduce lots of boilerplate code by using <script setup> syntax
import { ref } from 'vue'

// export default {
// `setup` is a special hook dedicated for the Composition API.
// setup() {
// ref() takes the argument and returns it wrapped within a ref object with a .value property
// To access refs in a component's template, declare and return them from a component's setup() function
const count = ref(0)

function increment() {
    // .value is needed in JavaScript
    count.value++
}

// expose the ref to the template
// don't forget to expose the function as well.
// return {
//     count,
//     increment
// }
// }
// }
</script>

<template>
    <h1>This file is cloned from WithoutScriptSetup, but use script setup instead of setup() method</h1>
    <button @click="increment">
        <!-- Notice that we did not need to append .value when using the ref in the template.
            For convenience, refs are automatically unwrapped when used inside templates  -->
        Another way to increase count: {{ count }}
    </button>
</template>