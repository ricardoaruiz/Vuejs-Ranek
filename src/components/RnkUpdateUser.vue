<template>
  <RnkUserForm :user="user" @onTypedValue="typedValue">
    <div slot="action">
      <button class="btn btn_form" @click.prevent="update">Alterar</button>
    </div>
  </RnkUserForm>
</template>

<script>
import { mapGetters } from "vuex";
import RnkUserMixin from "@/components/RnkUserMixin.js";
import RnkUserForm from "@/components/RnkUserForm.vue";
import UserService from "@/service/UserService.js";

export default {
  name: "RnkUpdateUser",
  components: { RnkUserForm },
  mixins: [RnkUserMixin],
  computed: {
    ...mapGetters(["loggedUser"])
  },
  methods: {
    update() {
      UserService.getInstance()
        .update({
          id: this.user.id,
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
        .then(updatedUser => {
          alert("Usuário alterado com sucesso");
          this.$emit("onUpdateUser", updatedUser);
        })
        .catch(error => alert(error));
    }
  },
  created() {
    this.user = this.loggedUser;
  }
};
</script>

<style>
.btn_form {
  width: 100%;
}
</style>