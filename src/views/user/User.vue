<template>
  <section class="user_container">
    <nav class="user_menu_container">
      <ul>
        <router-link :to="{ name : 'user_products' }" tag="li">Produtos</router-link>
        <router-link :to="{ name : 'user_purchases' }" tag="li">Compras</router-link>
        <router-link :to="{ name : 'user_sales' }" tag="li">Vendas</router-link>
        <router-link :to="{ name : 'user_data' }" tag="li">Editar Usuário</router-link>
        <li @click.prevent="logoff">Sair</li>
      </ul>
    </nav>

    <transition>
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "User",
  computed: {
    ...mapGetters(["loggedUser"])
  },
  methods: {
    ...mapActions(["setUnloggedUser"]),
    logoff() {
      this.setUnloggedUser();
      this.$router.push({ name: "login" });
    }
  }
};
</script>

<style scoped>
.user_menu_container {
  width: 100%;
  max-width: 800px;
  margin: 20px auto 0 auto;
}
.user_menu_container ul {
  display: flex;
  justify-content: center;
  align-items: center;
}
.user_menu_container li {
  padding: 10px;
  margin-right: 10px;
}
.user_menu_container li.router-link-exact-active {
  background: #87f;
  color: #fff;
  border-radius: 4px;
}
.user_menu_container li:hover {
  background: #87f;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}
</style>