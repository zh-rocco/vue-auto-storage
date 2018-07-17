import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import AutoStorage from "./lib/index";
import App from "./App.vue";

Vue.config.productionTip = false;

Vue.use(ElementUI);
Vue.use(AutoStorage);

new Vue({
  render: h => h(App)
}).$mount("#app");
