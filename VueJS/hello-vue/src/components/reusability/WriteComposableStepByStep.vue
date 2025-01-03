<script setup>
// Ref: https://vueschool.io/articles/vuejs-tutorials/how-to-write-a-vue-composable-step-by-step/

import { ref } from 'vue';
import { useCycleList1 } from './useCycleList1';
import { useCycleList2 } from './useCycleList2';
import { useCycleList3 } from './useCycleList3';


const { state1, prev1, next1 } = useCycleList1(['Conan', 'Luffy', 'Naruto', 'Goku', 'Vegeta', 'Yugi']);

const favoriteAnimals = ref(['Dog', 'Cat', 'Lizard']);
const { state2, prev2, next2 } = useCycleList2(favoriteAnimals);
console.log('favoriteAnimals: ', favoriteAnimals.value.join(', '));

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

const { state3, prev3, next3 } = useCycleList3(['Dog', 'Cat', 'Lizard']);

</script>

<template>
    <h1>How to Write a Vue Composable Step-by-Step</h1>
    <h2>What is Vue.js Composable?</h2>
    <p>
        A Vue composable is like a utility or helper function except with one important difference: it’s stateful. That is,
        it includes data defined with Vue’s reactive or ref function
    </p>
    <p>
        The beauty of composables, is that we can benefit from defining reactive data (just like within a component) but
        without having to render anything at all! This means we can abstract stateful logic outside of a component and
        re-use it within the context of a variety of different components (or even without any component).
    </p>
    <p>
        Vue Composable là 1 function chứa state (reactive data), nhưng không render gì cả! Nó giúp chúng ta tách logic ra
        khỏi component và tái sử dụng logic đó trong nhiều component khác nhau.
    </p>
    <p>
        Composable conventions:
    </p>
    <ul>
        <li>Nên đặt chúng trong thư mục composables</li>
        <li>Tên function bắt đầu bằng use, dùng camelCase</li>
    </ul>

    <h2>A composable accepts a normal list</h2>
    <div>Favorite manga character: {{ state1 }}</div>
    <button @click="prev1">Previous character</button>
    <button @click="next1">Next character</button>

    <h2>A composable accepts a reactive list</h2>
    <div>Favorite animal: {{ state2 }}</div>
    <button @click="prev2">Previous animal</button>
    <button @click="next2">Next animal</button>
    <div>Add more animal:</div>
    <input @keyup.enter="favoriteAnimals.push(capitalize($event.target.value)); $event.target.value = ''"
        placeholder="Enter animal then press Enter" />
    <div>All animals: {{ favoriteAnimals.join(', ') }}</div>

    <h2>A composable accepts a Non-Reactive AND Reactive Argument</h2>
    <div>Favorite pet: {{ state3 }}</div>
    <button @click="prev3">Previous pet</button>
    <button @click="next3">Next pet</button>
</template>