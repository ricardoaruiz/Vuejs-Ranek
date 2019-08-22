import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    login: false,
    user: {
      id: "",
      name: "",
      email: "",
      zipcode: "",
      street: "",
      number: "",
      city: "",
      state: ""
    },
    user_products: undefined
  },
  mutations: {
    UPDATE_LOGIN(state, payload) {
      state.login = payload;
    },
    UPDATE_USER(state, payload) {
      state.user = {
        id: payload.id,
        name: payload.name,
        email: payload.email,
        zipcode: payload.address.zipcode,
        street: payload.address.street,
        number: payload.address.number,
        city: payload.address.city,
        state: payload.address.state
      };
    },
    SET_USER_PRODUCTS(state, payload) {
      state.user_products = payload;
    }
  },
  actions: {
    setLoggedUser(context, payload) {
      context.commit("UPDATE_LOGIN", true);
      context.commit("UPDATE_USER", payload);
    },
    setUnloggedUser(context) {
      context.commit("UPDATE_LOGIN", false);
      context.commit("UPDATE_USER", {
        id: "",
        name: "",
        email: "",
        address: {
          zipcode: "",
          street: "",
          number: "",
          city: "",
          state: ""
        }
      });
      context.commit("SET_USER_PRODUCTS", undefined);
    },
    setUserProducts(context, payload) {
      context.commit("SET_USER_PRODUCTS", payload);
    }
  },
  getters: {
    isLogged: state => state.login,
    loggedUser: state => state.user,
    userProducts: state => state.user_products
  }
});
