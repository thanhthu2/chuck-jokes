import { createRouter, createWebHistory } from "vue-router";
import { ScreenLayout } from "./model/screenLayout";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("../views/HomeView.vue"),
      meta: { layout: ScreenLayout.DEFAULT_LAYOUT },
    },
    {
      path: "/dashboard",
      name: "test",
      meta: { layout: ScreenLayout.DEFAULT_LAYOUT },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/about",
      name: "about",
      meta: { layout: ScreenLayout.DEFAULT_LAYOUT },
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
  ],
});

export default router;
