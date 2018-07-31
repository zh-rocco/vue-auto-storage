import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import ELEMENT from "element-ui";
import AutoStorage from "../src/index";
// import "element-ui/lib/theme-chalk/index.css";
// import AutoStorage from "../dist/vue-auto-storage";

Vue.config.productionTip = false;

Vue.use(ELEMENT);
Vue.use(AutoStorage);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
