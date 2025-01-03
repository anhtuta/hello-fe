<script setup>
import { ref, reactive, watch, watchEffect } from 'vue'
import WatchersChild from './WatchersChild.vue'

const question = ref('')
const answer = ref('Questions usually contain a question mark. ;-)')
const loading = ref(false)

// Bản chất của watch là thực thi side effects khi một reactive source thay đổi (state changes)

// watch works directly on a ref
watch(question, async (newQuestion, oldQuestion) => {
    if (newQuestion.includes('?')) {
        loading.value = true
        answer.value = 'Thinking...'
        try {
            const res = await fetch('https://yesno.wtf/api')
            answer.value = (await res.json()).answer
        } catch (error) {
            answer.value = 'Error! Could not reach the API. ' + error
        } finally {
            loading.value = false
        }
    }
})

//========== Watch Source Types ==========
const x = ref(0)
const y = ref(0)

// single ref
watch(x, (newX) => {
    console.log(`x is ${newX}`)
})

// getter
watch(
    // Chỉ run watch này khi tổng x+y thay đổi, do đó event x++, y-- ở dưới sẽ không trigger watch này
    () => x.value + y.value,
    (sum) => {
        console.log(`sum of x + y is: ${sum}`)
    }
)

// array of multiple sources
watch([x, () => y.value], ([newX, newY]) => {
    console.log(`x is ${newX} and y is ${newY}`)
})

//======== can't watch a property of a reactive object like this =========
const obj = reactive({ count: 0, name: 'Vue' })
// this won't work because we are passing a number to watch()
// watch(obj.count, (count) => {
//     console.log(`count is: ${count}`)
// })
// instead, use a getter:
// Note: Chỉ khi nào field `count` của obj thay đổi mới run watch này
watch(
    () => obj.count,
    (count) => {
        console.log(`count is: ${count}`)
    }
)

//======= Deep Watchers =========
// When you call watch() directly on a reactive object,
// it will implicitly create a deep watcher
// -> the callback will be triggered on ALL nested mutations
// Note: bất kể field nào của obj thay đổi, watch này đều được run
// Note2: Deep watch requires traversing all nested properties in the watched object, and can be expensive
// when used on large data structures. Use it only when necessary and beware of the performance implications
watch(obj, (newObj, oldObj) => {
    // fires on nested property mutations
    // Note: `newObj` will be equal to `oldObj` here
    // because they both point to the same object!
    console.log('obj changed', newObj, newObj === oldObj) // true
})

//======= Eager Watchers =========
// watch is lazy by default: the callback won't be called until the watched source has changed
// But in some cases we may want the same callback logic to be run eagerly - for example, we may want to
// fetch some initial data, and then re-fetch the data whenever relevant state changes.
// => Use immediate: true option to run the callback immediately:
// watch(
//     source,
//     (newValue, oldValue) => {
//         // executed immediately, then again when `source` changes
//     },
//     { immediate: true }
// )

//======= Once Watchers =========
// Watcher's callback will execute whenever the watched source changes.
// If you want the callback to trigger only once when the source changes, use the once: true option.
// watch(
//     source,
//     (newValue, oldValue) => {
//         // when `source` changes, triggers only once
//     },
//     { once: true }
// )

//======= watchEffect =========
const todoId = ref(1)
const data = ref(null)
// Thường thì watcher callback sẽ chỉ sử dụng chính xác reactive state mà nó đang theo dõi (dependencies), ex:
// watch(
//     todoId,
//     async () => {
//         const response = await fetch(
//             `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
//         )
//         data.value = await response.json()
//     },
//     { immediate: true }
// )
// Như ở trên, chỉ khi state todoId thay đổi thì watcher mới được run, và trong hàm callback cũng chỉ sử dụng mỗi todoId.
// Do đó có thể dùng watchEffect() để viết ngắn gọn hơn:
// watchEffect() allows us to track the callback's reactive dependencies automatically:
watchEffect(async () => {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${todoId.value}`
    )
    data.value = await response.json()
})
// Note: the callback will run immediately, there's no need to specify immediate: true.
// During its execution, it will automatically track todoId.value as a dependency (similar to computed properties).
// Whenever todoId.value changes, the callback will be run again. With watchEffect(), we no longer need to pass todoId
// explicitly as the source value
// => watchEffect, on the other hand, combines dependency tracking and side effect into one phase. It automatically
// tracks every reactive property accessed during its synchronous execution. This is more convenient and typically
// results in terser code, but makes its reactive dependencies less explicit

//======= Stop Watching =========
// To stop watching, call the function returned by watch():
// const stop = watch(source, callback)
// stop()

const message = ref('Hello from parent');
</script>

<template>
    <h1>Watchers</h1>
    <p>
        Ask a yes/no question:
        <input v-model="question" :disabled="loading" />
    </p>
    <p>{{ answer }}</p>

    <h2>Watch Source Types</h2>
    <p>Open the console to see the output.</p>
    <p>
        <input v-model="x" type="number" />
        <input v-model="y" type="number" />
    </p>
    <button @click="x++; y--">x++, y--</button>

    <h2>Watch a property of a reactive object</h2>
    <button @click="obj.count++">Increment obj.count: {{ obj.count }}</button>
    <button @click="obj.name = 'Vue' + Date.now()">Change obj.name: {{ obj.name }}</button>

    <h2>watchEffect</h2>
    <p>
        <button @click="todoId++">Fetch todo with ID {{ todoId }}</button>
    </p>
    <pre>{{ data }}</pre>

    <h2>Watchers Child</h2>
    <p>
        Có vẻ như nếu component child watch prop từ parent truyền vào, thì callback sẽ không được thực thi ở lần render đầu
        tiên, mà chỉ được thực thi khi prop thay đổi. Nếu muốn nó thực thi ngay trong lần render đầu tiên, thì dùng option
        immediate: true (xem bên WatchersChild.vue)
    </p>
    <input v-model="message" />
    <WatchersChild :message="message" />
</template>