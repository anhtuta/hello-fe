<template>
  <div class="app">
    <nav>
      <RouterLink to="/">Home</RouterLink> |
      <RouterLink to="/essentials">Essentials</RouterLink> |
      <RouterLink to="/components-in-depth">Components In-Depth</RouterLink> |
      <RouterLink to="/reusability">Reusability</RouterLink> |
      <RouterLink to="/hello-pinia">Hello Pinia</RouterLink> |
      <RouterLink to="/about">About</RouterLink>
    </nav>
    <RouterView />
  </div>
</template>
