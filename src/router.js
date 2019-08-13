import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import RnkProduct from "@/components/RnkProduct.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/product/:id",
      name: "product",
      component: RnkProduct,
      props: true
    }
  ],
  scrollBehavior() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});
