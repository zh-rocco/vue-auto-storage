import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import AutoStorage from "../src/index";
// import AutoStorage from "../dist/vue-auto-storage";
import router from "./router";
import App from "./App.vue";

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(AutoStorage);

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
