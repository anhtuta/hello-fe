<template>
    <button class="fancy-btn">
        <!-- A slot outlet without name implicitly has the name "default". -->
        <slot>Fallback content for default slot</slot>
        <slot name="btnName">Untitled</slot>
        <slot name="btnDesc">No description</slot>
    </button>
</template>
  
<style scoped>
.fancy-btn {
    color: #fff;
    background: linear-gradient(315deg, #42d392 25%, #647eff);
    border: none;
    padding: 5px 10px;
    margin: 5px;
    border-radius: 8px;
    cursor: pointer;
}
</style>