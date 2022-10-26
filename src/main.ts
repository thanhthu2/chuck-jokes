import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import DefaultLayout from "@/layouts/DefaultLayout.vue";

const app = createApp(App);

app.component("DefaultLayout", DefaultLayout);

app.use(createPinia());
app.use(router);

app.mount("#app");
