<script setup>
import { ref } from 'vue';
import Child from './Child.vue';
import Child1 from './Child1.vue';

const count = ref(0);

const handleAnEventEmittedFromChild = () => {
    console.log('An event emitted from child');
}
const handleIncreaseBy = (value) => {
    console.log('Increase by', value);
    count.value += value;
}
const handleSubmitForm = ({ email, password }) => {
    console.log('Submit form', email, password);
}
</script>

<template>
    <h1>Component Events</h1>
    <p>
        In Vue.js, the emit function is used to trigger an event from a child component to its parent component. This allows
        the parent component to listen for and respond to events emitted by the child component - Copilot
    </p>
    <p>
        Bên component con sẽ dùng hàm emit để phát event, sau đó bên component cha sẽ dùng v-on để nghe event đó. Có thể
        dùng v-on hoặc @ (shorthand) để nghe event. Tên event có thể dùng camelCase hoặc kebab-case
    </p>
    <div>
        Event names provide an automatic case transformation. As with props casing, we recommend using kebab-cased event
        listeners in templates.
    </div>
    <div>Note:
        <ul>
            <li>Component cha chỉ lắng nghe được event được emit từ con ngay dưới nó</li>
            <li>KHÔNG thể communicate giữa ông-cháu (deeply nested components), hoặc các component sibling. Nếu muốn phải
                dùng use an external event bus or a global state management solution.</li>
        </ul>
    </div>
    <Child v-on:anEventEmittedFromChild="handleAnEventEmittedFromChild" @increase-by="handleIncreaseBy" />
    <p>Count: {{ count }}</p>

    <h2>Event Validation</h2>
    <Child1 @anotherEvent="() => console.log('anotherEvent')" @submit="handleSubmitForm" />
</template>