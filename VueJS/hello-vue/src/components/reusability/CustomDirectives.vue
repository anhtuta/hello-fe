<script setup>
import { ref } from 'vue';

// enables v-focus in templates
const vFocus = {
    mounted: (el) => el.focus()
}

// If not using <script setup>, custom directives can be registered using the directives option
// export default {
//   directives: {
//     focus: {
//       /* ... */
//     }
//   }
// }

const greenColor = ref('green');

const vMyDirective = {
    // called before bound element's attributes
    // or event listeners are applied
    created(el, binding, vnode, prevVnode) {
        console.log('created', el, binding, vnode, prevVnode);
        // see below for details on arguments
    },
    // called right before the element is inserted into the DOM.
    beforeMount(el, binding, vnode, prevVnode) {
        console.log('beforeMount', el, binding, vnode, prevVnode);
    },
    // called when the bound element's parent component
    // and all its children are mounted.
    mounted(el, binding, vnode, prevVnode) {
        console.log('mounted', el, binding, vnode, prevVnode);
    },
    // called before the parent component is updated
    beforeUpdate(el, binding, vnode, prevVnode) {

    },
    // called after the parent component and
    // all of its children have updated
    updated(el, binding, vnode, prevVnode) {
        console.log('updated', el, binding, vnode, prevVnode);
    },
    // called before the parent component is unmounted
    beforeUnmount(el, binding, vnode, prevVnode) {
        console.log('beforeUnmount', el, binding, vnode, prevVnode);
    },
    // called when the parent component is unmounted
    unmounted(el, binding, vnode, prevVnode) {
        console.log('unmounted', el, binding, vnode, prevVnode);
    }
}
</script>

<template>
    <h1>Custom Directive</h1>
    <p>
        In addition to the default set of directives shipped in core (like v-model or v-show), Vue also allows you to
        register your own custom directives
    </p>
    <!-- <input v-focus placeholder="This should be focused when render" style="width: 100%;" /> -->
    <input placeholder="This should be focused when render if add v-focus props" style="width: 100%;" />

    <h2>Directive Hooks</h2>
    <div v-my-directive v-liliana>Custom directive hooks</div>

    <h2 v-color="green">Function Shorthand. Why this does NOT work???</h2>
    <h2 v-color="greenColor">Updated: for this to work, the value inside v-color MUST be a reactive data</h2>
</template>