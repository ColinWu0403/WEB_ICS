import { createRouter, createWebHistory } from "vue-router";
import Home from "..//views/Home.vue";
import Data from "..//views/Data.vue";
import Folder from "..//views/Folder.vue";
import File from "../views/File.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/data", component: Data },
  { path: "/data/:folder", component: Folder },
  { path: "/data/:folder/:file", component: File },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
