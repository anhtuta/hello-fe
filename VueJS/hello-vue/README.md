# hello-vue

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

# Vue notes

## Vue slots vs React children

Slots in Vue are similar to children in React. Both concepts allow you to **pass content from a parent component to a child component**:

- **Vue Slots**:
  - Use `<template #slot_name>`
  - Can define **named slots** and **default slots** in Vue.
- **React Children**:
  - Use `props.children`
  - Can also use the `React.Children` API to manipulate the children.

Example:

- Vue Slots

```vue
<!-- ParentComponent.vue -->
<template>
  <ChildComponent>
    <template #default>
      <p>This is passed to the default slot</p>
    </template>
    <template #namedSlot>
      <p>This is passed to the named slot</p>
    </template>
  </ChildComponent>
</template>

<!-- ChildComponent.vue -->
<template>
  <div>
    <slot></slot>
    <!-- Default slot -->
    <slot name="namedSlot"></slot>
    <!-- Named slot -->
  </div>
</template>
```

- React Children

```jsx
// ParentComponent.jsx
import React from 'react';
import ChildComponent from './ChildComponent';

const ParentComponent = () => (
  <ChildComponent>
    <p>This is passed as children</p>
  </ChildComponent>
);

export default ParentComponent;

// ChildComponent.jsx
import React from 'react';

const ChildComponent = ({ children }) => (
  <div>
    {children}
  </div>
);

export default ChildComponent;
```

Ref: Copilot
