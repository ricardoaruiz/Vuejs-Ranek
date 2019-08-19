<template>
  <section>
    <button class="btn" v-if="!create" @click="toggleUserForm">Crie a sua conta</button>

    <transition mode="out-in">
      <RnkUserForm v-if="create">
        <div slot="header">
          <h2 class="title_form">Criar usuário</h2>
        </div>

        <div slot="action">
          <button class="btn btn_form">Criar usuário</button>
          <button class="btn btn_form" @click.prevent="toggleUserForm">Cancelar</button>
        </div>
      </RnkUserForm>
    </transition>
  </section>
</template>

<script>
import RnkUserForm from "@/components/RnkUserForm.vue";

export default {
  name: "RnkCreateUser",
  components: { RnkUserForm },
  data() {
    return {
      create: false
    };
  },
  methods: {
    toggleUserForm() {
      this.create = !this.create;
    }
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