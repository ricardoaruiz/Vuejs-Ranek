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

    <div>
      <transition>
        <router-view></router-view>
      </transition>
    </div>
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
.user_container {
  display: grid;
  grid-template-columns: minmax(140px, 200px) 1fr;
  max-width: 900px;
  margin: 40px auto;
  grid-gap: 80px;
  padding: 20px;
}
@media screen and (max-width: 500px) {
  .user_container {
    grid-template-columns: 1fr;
  }
}
.user_menu_container li {
  padding: 10px;
  margin-bottom: 5px;
  background: #f4f7fc;
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