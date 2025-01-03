<script setup>
import { ref, reactive } from 'vue'

const BASE_URL = "https://www.w3schools.com/vue/";
const manyFoods = ref([
    { name: "Burrito", url: BASE_URL + "img_burrito.svg" },
    { name: "Salad", url: BASE_URL + "img_salad.svg" },
    { name: "Cake", url: BASE_URL + "img_cake.svg" },
    { name: "Soup", url: BASE_URL + "img_soup.svg" },
    { name: "Fish", url: BASE_URL + "img_fish.svg" },
    { name: "Pizza", url: BASE_URL + "img_pizza.svg" },
    { name: "Rice", url: BASE_URL + "img_rice.svg" },
]);

const myObject = reactive({
    title: 'How to do lists in Vue',
    author: 'Jane Doe',
    publishedAt: '2016-04-10'
})

const clickedFood = ref("");
function onFoodClick(e) {
    // console.log("target", e.target); // this is the img tag above
    console.log("You clicked to " + e.target.alt);

    // We need to write this. as prefix to refer to a data property from inside a method
    clickedFood.value = e.target.alt;
}
</script>

<template>
    <h1>List Rendering</h1>

    <h2 class="item-header">v-for demo (from w3schools)</h2>
    <div class="v-for-demo">
        <figure v-for="(food, index) in manyFoods">
            <img v-bind:src="food.url" v-bind:alt="food.name" v-on:click="onFoodClick" />
            <figcaption>{{ index }}. {{ food.name }}</figcaption>
        </figure>
    </div>
    <div v-if="clickedFood">You've just clicked to {{ clickedFood }}</div>

    <h2>v-for with an Object</h2>
    <ul>
        <li v-for="value in myObject">
            {{ value }}
        </li>
    </ul>
    <ul>
        <li v-for="(value, key, index) in myObject" :key="key" :id="key">
            {{ index }}. {{ key }}: {{ value }}
        </li>
    </ul>

    <h2>v-for with a Range. Note here n starts with an initial value of 1 instead of 0.</h2>
    <span v-for="n in 10">{{ n }}</span>
</template>

<style scoped>
.v-for-demo {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.v-for-demo figure {
    width: 80px;
    padding: 10px;
    margin: 10px;
    background-color: #2199F9;
    border-radius: 5px;
}

.v-for-demo figcaption {
    text-align: center;
}

.v-for-demo img {
    width: 100%;
    cursor: pointer;
}
</style>