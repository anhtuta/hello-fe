import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/essentials",
      name: "essentials",
      component: () => import("../views/EssentialsView.vue"),
    },
    {
      path: "/Components-in-depth",
      name: "Components-in-depth",
      component: () => import("../views/ComponentsInDepthView.vue"),
    },
    {
      path: "/reusability",
      name: "reusability",
      component: () => import("../views/ReusabilityView.vue"),
    },
    {
      path: "/hello-pinia",
      name: "hello-pinia",
      component: () => import("../views/HelloPiniaView.vue"),
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
