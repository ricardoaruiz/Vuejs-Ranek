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
      zip_code: "",
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
        password: payload.password,
        email: payload.email,
        zip_code: payload.address.zip_code,
        street: payload.address.street,
        number: payload.address.number,
        city: payload.address.city,
        state: payload.address.state
      };
    },
    SET_USER_PRODUCTS(state, payload) {
      state.user_products = payload;
    },
    ADD_USER_PRODUCT(state, payload) {
      state.user_products.unshift(payload);
    },
    DELETE_USER_PRODUCT(state, payload) {
      const position = state.user_products.findIndex(
        product => product.id === payload.id
      );
      state.user_products.splice(position, 1);
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
    },
    addUserProducts(context, payload) {
      context.commit("ADD_USER_PRODUCT", payload);
    },
    removeUserProduct(context, payload) {
      context.commit("DELETE_USER_PRODUCT", payload);
    }
  },
  getters: {
    isLogged: state => state.login,
    loggedUser: state => state.user,
    userProducts: state => state.user_products
  }
});
