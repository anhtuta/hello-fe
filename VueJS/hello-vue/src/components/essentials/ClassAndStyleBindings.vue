<script setup>
import { ref, reactive, computed } from 'vue'

const isActive = ref(true)
const hasError = ref(false)

// The bound object doesn't have to be inline:
const classObject1 = reactive({
    active: true,
    'text-danger': false
})

// We can also bind to a computed property that returns an object. This is a common and powerful pattern
const classObject2 = computed(() => ({
    active: isActive.value,
    'text-danger': hasError.value
}))

const activeClass = ref('active')
const errorClass = ref('text-danger')
</script>

<template>
    <h1>Class and Style Bindings</h1>
    <div class="static" :class="{ active: isActive, 'text-danger': hasError }">
        When isActive or hasError changes, the class list will be updated accordingly
    </div>

    <div :class="classObject1">
        This object syntax is particularly useful when you have multiple classes whose presence is determined by the
        truthiness of a set of reactive values (Copilot suggestion)
    </div>

    <div :class="classObject2">
        This object syntax is particularly useful when you have multiple classes whose presence is determined by the
        truthiness of a set of reactive values (Copilot suggestion)
    </div>

    <button @click="isActive = !isActive">Toggle active</button>
    <button @click="hasError = !hasError">Toggle error</button>

    <div :class="[activeClass, errorClass]">Binding to Arrays</div>
</template>

<style scoped>
.static {
    font-size: 20px;
    padding: 10px;
    border: 1px solid #ccc;
}

.active {
    background-color: #40b883;
}

.text-danger {
    color: red;
}
</style>