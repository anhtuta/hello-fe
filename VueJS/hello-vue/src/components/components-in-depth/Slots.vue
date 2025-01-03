<script setup>
import FancyButton1 from './FancyButton1.vue'
import FancyButton2 from './FancyButton2.vue'
import FancyButton3 from './FancyButton3.vue'
</script>

<template>
    <h1>Slots</h1>

    <h2>Slot Content and Outlet</h2>
    <FancyButton1>
        <!-- Tất cả content bên trong thẻ FancyButton1 sẽ được inject vào thẻ slot của component FancyButton1 -->
        <h2 style="color: purple">Click me!</h2>
    </FancyButton1>
    <FancyButton1>
        <h2 style="color: blue">Click me, too!</h2>
    </FancyButton1>

    <h2>Fallback content</h2>
    <!-- Thẻ FancyButton1 không có content, do đó content của slot của FancyButton2 sẽ = giá trị fallback do nó tự define -->
    <FancyButton2 />

    <h2>Named Slots</h2>
    <div>Note: v-slot:slotName could be used in shorthand as #slotName</div>

    <FancyButton3 />

    <FancyButton3>
        <div>Implicit default slot</div>
        <p>
            Tất cả content mà không thuộc slot nào, sẽ được inject vào default slot (slot không có tên) của component
            con FancyButton3
        </p>
        <template v-slot:btnName>
            <h2 style="color: orange">Click me!</h2>
        </template>
        <template #btnDesc>
            <p>Click me to do something</p>
        </template>
    </FancyButton3>

    <FancyButton3>
        <template #default>Hoặc cũng có thể dùng v-slot:default để insert content cho default slot</template>
        <template v-slot:btnName>
            <h2 style="color: orange">Click me!</h2>
        </template>
        <template #btnDesc>
            <p>Click me to do something</p>
        </template>
    </FancyButton3>

    <h2>Conditional Slots, Dynamic Slot Names, Scoped Slots</h2>
    <p>Update later...</p>
</template>