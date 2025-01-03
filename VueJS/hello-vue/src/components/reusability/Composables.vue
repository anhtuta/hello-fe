<script setup>
// Ref: https://play.vuejs.org/#eNp9Vdtu20YQ/ZUpUUA0qpAOjL4YktCbC7Rom8BN8sSHrMihtfZql9iLZEHgv2dml6SpxMiDIWkuZ+acmR2fs1+7rjgEzG6zlaut7Dw49KHbVFruO2M9nMFiu4Ta7LvgsYEeWmv2sKCkxSwoOPwTfb2b/EU5mopHR5GVro12HrbC4UerYA2Lnfeduy3LR2d0p0SNO6MatIU/dbI2DRZUtPSmMa4kgJQuG8qkjvLF28XVaAwRb2wxz69gvZkK/UQ5xUGogBQ/ZpyhEV4sAa01lnpeTwRyApsFWvT2RO6Eea40THBMgfq6NLwlS1/pVZnUJB3ph8c98fNIvwD+MaKBzkQut2xYbYP3RsPhTWvsusokSA0/Vxn8UitZP7GFSX/+8Sz7z1W2OZ9BQt+vypQXS1R+1cgDQciW4iMrimR0wu8270znfoC7SBaJWdAeLTa3QFgxuNijc+IBIy5PPyYOjU19RDEI954/Z/UptKTy6VvqA5XD1AwLTTl/0Aco4s5lV51F5sG+VJJ+v4qxYbmkfiiKYvSvyknPbJnNtoyW+HJpj4Icd22LtV+CN5/ikC4XuNL4HFPaoGsvie3FIqSJp1WIzabl00HxkoyetEVfufhv1kAu3EnX8z0CKEtKofcGzhMb2CItAELL1SPlFMV1pwVj+GROc/vWPoc26oDgdxhfSArlLnbWaBOcOoEzIP3CgbeifqLXLRyICaDBDnVD+3KC7emCSyQ4sifspOx61Hh4Qy/d8BsaOEdkYb1sZS2FoiJKnIC6FbqhsaTVZfk8gDgK6cHLPZowFGUzAQTNWl/BUSrFbzRYHXmSdeAp28RMsI0fyFDaUJg9Spd0SbERZcvZDBRleCPdQMCPh8ARwdRRnBCTjGz5WkT0i0GlSMqixTR6VKyHmmWEHIfV+naSOETyRx8vEYwMv7pa8dJU+hU9Kz2t86ReqjcgaTzCe3oGpEOeD4uyJOcjTXe+obScHwaAi82lo9dC/q/wuyINjrwbuC5uZrS4WAQeyTN9ftOXIVwy537iecoX92kR4q/F1UvqIMsSbq6vo5XF6ekCeEcTauVDFJpuQESvMv53IBXadx3r4KqMrt0w0kwoZY5/R5u3AZejvd5h/fSK/dE9s63K3vN7tQesssnnhX1An9x3//+Hz/R9cu5NExRFf8d5zyIF7jGF/RZ0Q23P4mK3f8XLRmfhg7t79qjdSIobjXLE+Cqju/b7d6i/tHtT3MQ8VrH/Ahstp5A=
import { computed, ref, watch, watchEffect } from 'vue'
import { useMouse } from './mouse.js'
import { useMouse1 } from './mouse1.js'
import { useFetch } from './fetch.js'
import { useFetch1 } from './fetch1.js'

const isSticky = ref(true);
const { x, y } = useMouse();
const { x1, y1 } = useMouse1();

const baseUrl = 'https://jsonplaceholder.typicode.com/todos/'
const id = ref('1');
const url = computed(() => baseUrl + id.value);

// Input is a String, cannot be reactive, only fetch once
// const { data, error } = useFetch('https://jsonplaceholder.typicode.com/todos/' + id.value);
// Input is a Ref, can be reactive, fetch whenever id changes
const { data, error } = useFetch(url);
const retry = () => {
    id.value = '';
    id.value = '1';
}
const retry1 = () => {
    // Cannot do this, it will trigger 2 times: when id1 = '' and when id1 = prev
    // const prev = id1.value;
    // id1.value = '';
    // // Cannot use id1.value = prev; here, because it will not trigger the watcher
    // // id1.value = prev;
    // setTimeout(() => {
    //     id1.value = prev;
    // }, 100);

    // But if using this: cannot retry when id1 = 1, because the below logic doesn't change id1, so not trigger watcher
    id1.value = '';
    id1.value = '1';
}

// Demo delay using random
const id1 = ref('1');
const url1 = computed(() => baseUrl + id1.value);
const { data1, error1 } = useFetch1(url1);

watch(id, (newId, oldId) => {
    console.log('id changed', oldId, ' => ', newId);
})
watch(id1, (newId, oldId) => {
    console.log('id1 changed', oldId, ' => ', newId);
})
watch(url1, (newId, oldId) => {
    console.log('url1 changed', oldId, ' => ', newId);
})



// Why use watchEffect does NOT work?
// watchEffect(() => {
//     console.log('id', id);
// })
// watchEffect(() => {
//     console.log('id1', id1);
// })
</script>

<template>
    <h1>Composable</h1>
    <h2>What is a "Composable"?</h2>
    <p>
        Ta thường có các util function để thực thi common task, chẳng hạn như format date, generate random string, etc. Các
        function này là <b>stateless</b>: chỉ nhận input và cho ra output. Thư viện phổ biến cho các util function này là
        lodash, date-fns...
    </p>
    <p>
        Trong Vue, Composable là <b>stateful</b> function, vì nó manage state. One composable function can call one or more
        other composable functions. This enables us to compose complex logic using small, isolated units, similar to how we
        compose an entire application using components
    </p>
    <p>Note: data return từ composable function là reactive data, khi nó thay đổi thì UI cũng thay đổi theo</p>
    <p :class="isSticky ? 'sticky' : ''">
        Mouse position is at: {{ x }}, {{ y }}; {{ x1 }}, {{ y1 }}.
        Sticky: <input type="checkbox" v-model="isSticky" />
    </p>

    <h2>Async State Example</h2>
    Load post id:
    <button v-for="i in 5" @click="id = `${i}`">{{ i }}</button>
    <div v-if="error">
        <p>Oops! Error encountered: {{ error.message }}</p>
        <button @click="retry">Retry</button>
    </div>
    <div v-else-if="data">Data loaded:
        <pre>{{ data }}</pre>
    </div>
    <div v-else>Loading...</div>

    <h2>Artificial delay</h2>
    Load post id1:
    <button v-for="i in 5" @click="id1 = `${i}`" :class="parseInt(id1) === i ? 'active' : ''">{{ i }}</button>
    <div v-if="error1">
        <p>Oops! Error encountered: {{ error1.message }}</p>
        <button @click="retry1">Retry</button>
    </div>
    <div v-else-if="data1">Data loaded:
        <pre>{{ data1 }}</pre>
    </div>
    <div v-else>Loading...</div>
</template>

<style scoped>
button.active {
    background-color: #40b883;
}
</style>