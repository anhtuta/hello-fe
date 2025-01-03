<script setup>
import { ref } from 'vue'

const username = ref('')
const password = ref('')
const message = ref('')
const picked = ref('')
const toggle = ref(false)
const selected = ref('')
</script>

<template>
    <h1>Form Input Bindings</h1>
    <input v-model="username" placeholder="Username">
    <input v-model="password" placeholder="Password" type="password">
    <p>Username and password is: {{ username }}, {{ password }}</p>

    <span>Multiline message is:</span>
    <p style="white-space: pre-line;">{{ message }}</p>
    <textarea v-model="message" placeholder="add multiple lines"></textarea>

    <h2>Value Bindings</h2>
    <!-- `picked` is a string "a" when checked -->
    <input type="radio" v-model="picked" value="a" id="a" />
    <label for="a">a</label><br>
    <input type="radio" v-model="picked" value="b" id="b" />
    <label for="b">b</label><br>
    <div>Value of picked: {{ picked }}</div>

    <!-- `toggle` is either true or false -->
    <input type="checkbox" v-model="toggle" />
    <div>Toggle is: {{ toggle ? 'ON' : 'OFF' }}</div>

    <!-- `selected` is a string "abc" when the first option is selected -->
    <select v-model="selected">
        <option value="abc">ABC</option>
        <option value="def">DEF</option>
        <option value="xyz">XYZ</option>
    </select>
    <div>Selected: {{ selected }}</div>
</template>