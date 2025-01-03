<script setup>
import { ref, reactive, computed } from 'vue'

const author = reactive({
    name: 'John Doe',
    books: [
        'Vue 2 - Advanced Guide',
        'Vue 3 - Basic Guide',
        'Vue 4 - The Mystery'
    ]
})

// for complex logic that includes reactive data, it is recommended to use a computed property.
// A computed property automatically tracks its reactive dependencies.
// Vue is aware that the computation of hasPublishedBooks depends on author.books,
// so it will update any bindings that depend on hasPublishedBooks when author.books changes.
// Note: computed properties are cached based on their reactive dependencies
// The computed() method return a computed ref.
const hasPublishedBooks = computed(function () {
    return author.books.length > 0;
})
console.log('hasPublishedBooks: ', hasPublishedBooks.value) // access a computed ref with .value

// This also means the following computed property will never update,
// because Date.now() is not a reactive dependency
const now = computed(() => Date.now())

const firstName = ref('John')
const lastName = ref('Doe')

//======== writable computed ========
const fullName1 = computed({
    // getter
    get() {
        return firstName.value + ' ' + lastName.value
    },
    // setter
    set(newValue) {
        // Note: we are using destructuring assignment syntax here.
        [firstName.value, lastName.value] = newValue.split(' ')
    }
})
//======== read-only computed ========
// Best practice: a computed return value should be treated as read-only and never be mutated
const fullName2 = computed(() => firstName.value + ' ' + lastName.value)
</script>

<template>
    <h1>Computed Properties, now is: {{ now }}</h1>

    <h2>Without Computed Properties</h2>
    <p>Has published books: <span>{{ author.books.length > 0 ? 'Yes' : 'No' }}</span></p>
    <p>His published books are: {{ author.books.length > 0 ? author.books.join(', ') : '[Empty]' }}</p>
    <p>Nhược điểm: phải tốn 1 chút thời gian để hiểu được ta đã phải kiểm tra biến author.book.
        Hơn nữa, việc tính toán này lại còn lặp lại</p>

    <h2>With Computed Properties</h2>
    <p>Has published books: <span>{{ hasPublishedBooks ? 'Yes' : 'No' }}</span></p>
    <p>His published books are: {{ hasPublishedBooks ? author.books.join(', ') : '[Empty]' }}</p>

    <h2>Writable Computed</h2>
    <div>Your name1 is: {{ fullName1 }}</div>
    <div>Your name2 is: {{ fullName2 }}</div>
    <button @click="firstName = 'Adam'">Change first name</button>
    <div>
        <button @click="fullName1 = 'Taylor Swift'">Change fullName1</button>
        <div>This works (firstName and lastName will be updated), because fullName1 is a Writable Computed</div>
    </div>
    <div>
        <button @click="fullName2 = 'Andy Smith'">Change fullName2</button>
        <div>This NOT works, because fullName2 is a normal Computed: computed value is readonly</div>
    </div>
</template>