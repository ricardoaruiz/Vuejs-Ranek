<template>
  <section>
    <div class="user_form__header">
      <slot name="header"></slot>
    </div>

    <form class="user_form">
      <!-- Login data -->
      <div class="user_form__login" v-if="showLoginInfo">
        <label for="name">Nome</label>
        <input
          type="text"
          id="name"
          name="name"
          :value="user ? user.name : ''"
          @blur="sendValue($event)"
        />

        <label for="email">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          :value="user ? user.email : ''"
          @blur="sendValue($event)"
        />

        <label for="password">Senha</label>
        <input
          type="password"
          id="password"
          name="password"
          :value="user ? user.password : ''"
          @blur="sendValue($event)"
        />
      </div>

      <!-- Others user fields  -->
      <label for="zipCode">Cep</label>
      <input
        type="text"
        id="zipCode"
        name="zipCode"
        :value="user ? user.zip_code : ''"
        @blur="sendValue($event)"
      />

      <label for="street">Rua</label>
      <input
        type="text"
        id="street"
        name="street"
        :value="user ? user.street : ''"
        @blur="sendValue($event)"
      />

      <label for="number">Número</label>
      <input
        type="text"
        id="number"
        name="number"
        :value="user ? user.number  : ''"
        @blur="sendValue($event)"
      />

      <label for="city">Cidade</label>
      <input
        type="text"
        id="city"
        name="city"
        :value="user ? user.city : ''"
        @blur="sendValue($event)"
      />

      <label for="state">Estado</label>
      <input
        type="text"
        id="state"
        name="state"
        :value="user ? user.state  : ''"
        @blur="sendValue($event)"
      />

      <div class="user_form__action">
        <slot name="action"></slot>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: "RnkUserForm",
  props: {
    user: undefined,
    showLoginInfo: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  methods: {
    sendValue(event) {
      const value = {};
      value[event.target.name] = event.target.value;
      this.$emit("onTypedValue", value);
    }
  },
  created() {
    if (this.user) {
      for (let field in this.user) {
        const value = {};
        value[field] = this.user[field];
        this.$emit("onTypedValue", value);
      }
    }
  }
};
</script>

<style scoped>
.user_form {
  display: grid;
  align-items: center;
  padding: 0 20px;
}
.user_form__login {
  display: grid;
  align-items: center;
}
</style>