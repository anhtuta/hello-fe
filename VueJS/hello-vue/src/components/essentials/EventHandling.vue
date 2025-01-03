<script setup>
import { ref } from 'vue'

const count = ref(0)
const name = ref('Vue.js')
const txtClear = ref('')

function increment() {
    count.value++;
}
function greet(event) {
    alert(`Hello ${name.value}!`)
    // `event` is the native DOM event
    // if (event) {
    //     alert(event.target.tagName)
    // }
}

function warn(message, event) {
    // now we have access to the native event
    if (event) {
        event.preventDefault()
    }
    alert(message)
}

function doThis() {
    alert('doThis')
}
function onSubmit() {
    alert('onSubmit')
}
function doThat() {
    alert('doThat')
}
function onScroll() {
    alert('onScroll')
}
function submit(e) {
    alert('Submitted: ', e.target.value)
}
function clear() {
    txtClear.value = ''
}
function doSomething() {
    alert('doSomething')
}
</script>

<template>
    <h1>Event Handling</h1>
    <h1>Inline Handlers (used in simple cases)</h1>
    <button @click="count++">
        Increase count: {{ count }}
    </button>

    <h2>Method Handlers</h2>
    <button @click="increment">
        Another way to increase count: {{ count }}
    </button>
    <button @click="greet">Greet</button>

    <h2>Accessing Event Argument in Inline Handlers</h2>
    <!-- using $event special variable -->
    <button @click="warn('Form cannot be submitted yet.', $event)">
        Using $event special variable
    </button>
    <!-- using inline arrow function -->
    <button @click="(event) => warn('Form cannot be submitted yet.', event)">
        Using inline arrow function
    </button>

    <h2>Event Modifiers</h2>
    <p>It is a very common need to call event.preventDefault() or event.stopPropagation() inside event handlers.
        We can use .prevent to do that</p>
    <!-- the click event's propagation will be stopped -->
    <a @click.stop="doThis">the click event's propagation will be stopped</a>

    <!-- the submit event will no longer reload the page -->
    <form @submit.prevent="onSubmit">the submit event will no longer reload the page
        <button type="submit">Submit</button>
    </form>

    <!-- modifiers can be chained -->
    <a @click.stop.prevent="doThat">modifiers can be chained</a>

    <!-- just the modifier -->
    <form @submit.prevent>just the modifier</form>

    <!-- only trigger handler if event.target is the element itself -->
    <!-- i.e. not from a child element -->
    <div @click.self="doThat">...</div>

    <!-- use capture mode when adding the event listener     -->
    <!-- i.e. an event targeting an inner element is handled -->
    <!-- here before being handled by that element           -->
    <div @click.capture="doThis">...</div>

    <!-- the click event will be triggered at most once -->
    <a @click.once="doThis">the click event will be triggered at most once</a>

    <!-- the scroll event's default behavior (scrolling) will happen -->
    <!-- immediately, instead of waiting for `onScroll` to complete  -->
    <!-- in case it contains `event.preventDefault()`                -->
    <div @scroll.passive="onScroll">...</div>

    <h2>Key Modifiers</h2>
    <p>When listening for keyboard events, we often need to check for specific keys.
        Vue allows adding key modifiers for v-on or @ when listening for key events</p>
    <!-- only call `submit` when the `key` is `Enter` -->
    <input @keyup.enter="submit" />

    <h2>System Modifier Keys</h2>
    <!-- Alt + Enter -->
    <input @keyup.alt.enter="clear" v-model="txtClear" placeholder="Press Alt + Enter to clear" style="width: 200px;" />

    <!-- Ctrl + Click -->
    <div @click.ctrl="doSomething">Do something</div>
</template>