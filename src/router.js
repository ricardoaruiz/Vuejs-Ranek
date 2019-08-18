import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import User from "./views/user/User.vue";
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
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/user",
      name: "user",
      component: User
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
