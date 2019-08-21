<template>
  <section class="login">
    <h1>Login</h1>

    <form>
      <label for="email">E-mail</label>
      <input type="email" name="email" id="email" v-model="login.email" />

      <label for="password">Senha</label>
      <input type="password" name="password" id="password" v-model="login.password" />

      <button class="btn" @click.prevent="doLogin">Ok</button>
      <a href="#">Esqueci minha senha</a>
    </form>

    <RnkCreateUser @onCreateUser="doLoginAfterSignup" />
  </section>
</template>

<script>
import { mapActions } from "vuex";
import RnkCreateUser from "@/components/RnkCreateUser.vue";
import UserService from "../service/UserService.js";

export default {
  name: "Login",
  components: {
    RnkCreateUser
  },
  data() {
    return {
      login: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions(["setLoggedUser"]),
    doLogin() {
      UserService.getInstance()
        .login({ ...this.login })
        .then(user => {
          this.setLoggedUser(user);
          this.$router.push({ name: "user" });
        })
        .catch(error => alert(error));
    },
    doLoginAfterSignup(user) {
      Object.assign(this.login, user);
      this.doLogin();
    }
  }
};
</script>

<style scoped>
.login {
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}
.login h1 {
  text-align: center;
  font-size: 2rem;
  margin: 40px 0;
  color: #87f;
}
.login form {
  display: grid;
  padding: 0 20px;
}
.btn {
  width: 100%;
  max-width: 300px;
  margin: 20px auto;
}
a {
  text-align: center;
}
a:hover {
  color: #87f;
  text-decoration: underline;
}
</style>