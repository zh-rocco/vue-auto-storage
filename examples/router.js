import Vue from "vue";
import Router from "vue-router";
import Demo1 from "./components/Demo1";
import Demo2 from "./components/Demo2";

Vue.use(Router);

export default new Router({
  routes: [
    { path: "/", redirect: "/demo-1" },
    { path: "/demo-1", component: Demo1 },
    { path: "/demo-2", component: Demo2 }
  ]
});
