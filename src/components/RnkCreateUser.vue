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
import RnkUserForm from "@/components/RnkUserForm.vue";
import UserService from "@/service/UserService.js";
import { findZipCode } from "@/service/ExternalUtilsService.js";

export default {
  name: "RnkCreateUser",
  components: { RnkUserForm },
  data() {
    return {
      create: false,
      user: {}
    };
  },
  methods: {
    toggleUserForm() {
      this.create = !this.create;
      if (!this.create) {
        this.newUser();
      }
    },
    typedValue(objValue) {
      if (Object.keys(objValue).indexOf("zipCode") > -1) {
        if (objValue.zipCode.trim().length == 0) {
          this.user.city = "";
          this.user.street = "";
          this.user.state = "";
          this.user.zipCode = "";
        } else {
          objValue.zipCode = objValue.zipCode.replace(/\D/g, "");
          if (objValue.zipCode.length === 8) {
            findZipCode(objValue.zipCode).then(zipData => {
              this.user.city = zipData.localidade;
              this.user.street = zipData.logradouro;
              this.user.state = zipData.uf;
              this.user.zipCode = zipData.cep;
            });
          }
        }
        return;
      }
      Object.assign(this.user, objValue);
    },
    newUser() {
      this.user = {
        name: "",
        email: "",
        zipCode: "",
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
          password: "123456",
          email: this.user.email,
          address: {
            street: this.user.street,
            zip_code: this.user.zipCode,
            number: this.user.number,
            state: this.user.state,
            city: this.user.city
          }
        })
        .then(result => {
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