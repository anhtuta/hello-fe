<script setup>
defineProps({
    title: String,
    author: {
        type: String,
        default: 'Anonymous'
    }
})
const emit = defineEmits(['enlarge-text', 'shrink-text'])

// If you're using an explicit setup function instead of <script setup>, events should be declared
// using the emits option, and the emit function is exposed on the setup() context:
// export default {
//     emits: ['enlarge-text', 'shrink-text'],
//     setup(props, { emit }) {
//         emit('shrink-text')...
//     }
// }

</script>

<template>
    <h3 class="post-title" data-post-wrong="cannot-use-title-prop-here-must-use-v-bind" :data-post="'post-' + title">
        {{ title }}
        - posted by <i>{{ author }}</i></h3>
    <!-- Content Distribution with Slots. This is equivalent to this.props.children in React -->
    <slot />

    <!-- $emit and emit are the same, maybe $emit is from vue2. Note: emit is the output of defineEmits -->
    <button @click="$emit('enlarge-text')">Enlarge text</button>
    <button @click="emit('shrink-text')">Shrink text</button>
</template>

<style scoped>
.post-title {
    color: yellow;
    font-size: 1.5rem;
}
</style>