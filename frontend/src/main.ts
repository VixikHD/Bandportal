/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from "./plugins";

// Components
import App from "./App.vue";

// Composables
import { createApp } from "vue";
import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
} from "vue-router";
import EventView from "./view/EventView.vue";
import PlaceView from "./view/PlaceView.vue";
import BandView from "./view/BandView.vue";
import MainView from "./view/MainView.vue";

const app = createApp(App);

registerPlugins(app);

const routes = [
  { path: "/", component: MainView, name: "home" },
  { path: "/places/", component: PlaceView, name: "places" },
  { path: "/bands/", component: BandView, name: "bands" },
  { path: "/events/", component: EventView, name: "events" },
];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

app.use(router).mount("#app");
