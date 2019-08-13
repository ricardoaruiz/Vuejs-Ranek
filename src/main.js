import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

Vue.filter("currency-format", value => {
  const newValue = Number(value);
  if (!isNaN(newValue)) {
    return newValue.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });
  }
  return "";
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
