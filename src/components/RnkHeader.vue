<template>
  <header>
    <nav>
      <router-link to="/" class="logo">
        <img src="@/assets/ranek.svg" alt="Ranek" />
      </router-link>

      <router-link to="/login" class="btn" v-if="!isLogged">Vender / Login</router-link>
      <router-link to="/login" class="btn" v-else>{{userName}}</router-link>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "RnkHeader",
  computed: {
    ...mapGetters(["isLogged", "loggedUser"]),
    userName() {
      return this.loggedUser.name.replace(/ .*/, "");
    }
  }
};
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  box-shadow: 0 2px 4px rgba(30, 60, 90, 0.1);
}
.logo {
  padding: 10px 0;
}
.logo img {
  width: 90px;
}
</style>
