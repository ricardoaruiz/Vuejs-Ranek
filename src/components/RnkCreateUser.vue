<template>
  <section>
    <button class="btn" v-if="!create" @click="toggleUserForm">Crie a sua conta</button>

    <transition mode="out-in">
      <RnkUserForm v-if="create" @onTypedValue="typedValue" :user="user">
        <div slot="header">
          <h2 class="title_form">Criar usuário</h2>
        </div>

        <div slot="action">
          <button class="btn btn_form" @click.prevent="createUser">Criar usuário</button>
          <button class="btn btn_form" @click.prevent="toggleUserForm">Cancelar</button>
        </div>
      </RnkUserForm>
    </transition>
  </section>
</template>

<script>
import RnkUserMixin from "@/components/RnkUserMixin.js";
import RnkUserForm from "@/components/RnkUserForm.vue";
import UserService from "@/service/UserService.js";

export default {
  name: "RnkCreateUser",
  components: { RnkUserForm },
  mixins: [RnkUserMixin],
  data() {
    return {
      create: false
    };
  },
  methods: {
    toggleUserForm() {
      this.create = !this.create;
      if (!this.create) {
        this.newUser();
      }
    },
    newUser() {
      this.user = {
        name: "",
        email: "",
        password: "",
        zip_code: "",
        street: "",
        number: "",
        city: "",
        state: ""
      };
    },
    createUser() {
      UserService.getInstance()
        .create({
          name: this.user.name,
          password: this.user.password,
          email: this.user.email,
          address: {
            street: this.user.street,
            zip_code: this.user.zip_code,
            number: this.user.number,
            state: this.user.state,
            city: this.user.city
          }
        })
        .then(result => {
          this.$emit("onCreateUser", this.user);
          this.newUser();
          this.create = false;
        })
        .catch(error => alert(error));
    }
  },
  created() {
    this.newUser();
  }
};
</script>

<style scoped>
section {
  margin-top: 20px;
}
.btn {
  width: 100%;
  max-width: 300px;
  margin: 20px auto;
}
.title_form {
  text-align: center;
  margin: 30px 0;
}
.btn_form {
  max-width: 100%;
}
</style>