import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./views/Login.vue";
import User from "./views/user/User.vue";
import UserProducts from "./views/user/UserProducts.vue";
import UserData from "./views/user/UserData.vue";
import UserSales from "./views/user/UserSales.vue";
import UserPurchases from "./views/user/UserPurchases.vue";
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
      component: User,
      children: [
        {
          path: "products",
          name: "user_products",
          component: UserProducts
        },
        {
          path: "purchases",
          name: "user_purchases",
          component: UserPurchases
        },
        {
          path: "sales",
          name: "user_sales",
          component: UserSales
        },
        {
          path: "data",
          name: "user_data",
          component: UserData
        }
      ]
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
