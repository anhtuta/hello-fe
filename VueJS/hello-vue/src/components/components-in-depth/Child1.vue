<script setup>
import { defineEmits, ref } from 'vue';

// Similar to prop type validation, an emitted event can be validated if it is defined
// with the object syntax instead of the array syntax
const emit = defineEmits({
    // No validation
    anotherEvent: null,

    // Validate submit event
    submit: ({ email, password }) => {
        if (email && password) {
            return true
        } else {
            console.warn('Invalid submit event payload!')
            return false
        }
    }
});

const email = ref('');
const password = ref('');

function submitForm(email, password) {
    emit('submit', { email, password })
}
</script>

<template>
    <button @click="$emit('anotherEvent')">Emit anotherEvent</button>

    <h3>A sample form</h3>
    <input type="text" v-model="email" placeholder="Email" />
    <input type="password" v-model="password" placeholder="Password" />
    <button @click="submitForm(email, password)">Submit</button>
</template>