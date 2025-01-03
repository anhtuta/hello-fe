import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);

// It is also common to globally register custom directives at the app level
app.directive("liliana", {
  mounted(el) {
    el.style.color = "red";
  },
});

// Function Shorthand​
// It's common for a custom directive to have the same behavior for mounted and updated,
// with no need for the other hooks. In such cases we can define the directive as a function
app.directive("color", (el, binding) => {
  console.log("Changing color:", binding);
  // this will be called for both `mounted` and `updated`
  el.style.color = binding.value;
});

app.mount("#app");
