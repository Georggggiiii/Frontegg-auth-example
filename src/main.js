import { createApp } from "vue";
import App from "./App.vue";
import { Frontegg } from "@frontegg/vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory("/"),
  routes: [
    { name: "HomePage", path: "/", component: App },
  ],
});

const app = createApp(App).use(router);


app.use(Frontegg, {
  contextOptions: {
    baseUrl: "https://app-tsqevekl9ulw.frontegg.com",
    clientId: 'a91befc1-ff2b-4536-b8ba-dde6083ef9b1'
  },
   authOptions: {
    // keepSessionAlive: true // Uncomment this in order to maintain the session alive
  },
  hostedLoginBox: true,
  router,
});
app.mount("#app");