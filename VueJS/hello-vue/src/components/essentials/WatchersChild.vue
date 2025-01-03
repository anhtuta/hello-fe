<script setup>
import { watch } from 'vue';

const props = defineProps({
    message: {
        type: String,
        default: 'Unknown message'
    }
});
watch(
    () => props.message,
    (newMessage, oldMessage) => {
        console.log(`Message changed from ${oldMessage} to ${newMessage}`);
        console.log('Message length:', newMessage.length);
    },
    { immediate: true }
);
</script>

<template>
    <div>
        <h3>Watchers Child</h3>
        <p>Message from parent: {{ message }}</p>
    </div>
</template>