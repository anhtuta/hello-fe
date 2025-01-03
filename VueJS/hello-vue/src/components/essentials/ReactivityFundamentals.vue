<!-- Manually exposing state and methods via setup() can be verbose.
    Luckily, it can be avoided when using Single-File Components (SFCs).
    We can simplify the usage with <script setup> -->
<!-- Note: Vue3 có 2 API Style là Options API and Composition API. Mọi component trong project này
    sẽ dùng style Composition API. Hơn nữa sẽ đều dùng script setup thay vì dùng method setup() -->
<script setup>
import { ref, nextTick, reactive } from 'vue'

// We're using SFC + <script setup> syntax in Composition API, so don't need to return anything???
const count = ref(0)

console.log(count) // { value: 0 }
console.log(count.value) // 0

count.value++
console.log(count.value) // 1

function increment() {
    count.value++;
}

//======== Deep Reactivity ========
const obj = ref({
    nested: { count: 0 },
    arr: ['foo', 'bar']
})

async function mutateDeeply() {
    // these will work as expected.
    obj.value.nested.count++
    obj.value.arr.push('baz')
    // To wait for the DOM update to complete after a state change, you can use the nextTick() global API
    await nextTick()
    // Now the DOM is updated
}

//========= Reactive State with reactive() =========
const state = reactive({ count: 0 })

</script>

<template>
    <h1>Reactivity Fundamentals</h1>

    <h2>Declaring Reactive State</h2>
    <p>
        Note: when you define a reactive reference using ref, you need to use .value to access its value in the script tag.
        However, in the template tag, Vue automatically unwraps the .value for you, so you don't need to use .value there
        (Copilot)
    </p>
    <button @click="count++">
        Increase count: {{ count }}
    </button>
    <button @click="increment">
        Another way to increase count: {{ count }}
    </button>

    <h2>Deep Reactivity (It is also possible to opt-out of deep reactivity with shallow refs)</h2>
    <button @click="mutateDeeply">
        Mutate deeply
    </button>
    <pre>{{ obj }}</pre>

    <h2>There is another way to declare reactive state, with the reactive()</h2>
    <button @click="state.count++">
        Count: {{ state.count }}
    </button>
    <p>Limitations of reactive</p>
    <ul>
        <li>Limited value types: it only works for object types (objects, arrays, and collection types such as Map and
            Set). It cannot hold primitive types such as string, number or boolean</li>
        <li>Since reactive() works for objects and ref() calls reactive(), objects work for both</li>
        <li>BUT, ref() has a .value property for reassigning, reactive() does not have this and therefore CANNOT be
            reassigned (https://stackoverflow.com/a/65262638)</li>
        <li>Cannot replace entire object</li>
        <li>Not destructure-friendly</li>
    </ul>
</template>