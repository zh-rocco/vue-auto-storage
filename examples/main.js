import Vue from "vue";
import App from "./App.vue";
import ELEMENT from "element-ui";
// import AutoStorage from "../src/index";
import AutoStorage from "../dist/vue-auto-storage";

Vue.config.productionTip = false;

Vue.use(ELEMENT);
Vue.use(AutoStorage);

new Vue({
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
