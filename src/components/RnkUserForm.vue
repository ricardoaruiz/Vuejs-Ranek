<template>
  <section>
    <div class="user_form__header">
      <slot name="header"></slot>
    </div>

    <form class="user_form">
      <label for="name">Nome</label>
      <input type="text" id="name" name="name" />

      <label for="email">E-mail</label>
      <input type="email" id="email" name="email" />

      <label for="street">Rua</label>
      <input type="text" id="street" name="street" />

      <label for="number">Número</label>
      <input type="text" id="number" name="number" />

      <label for="city">Nome</label>
      <input type="text" id="city" name="city" />

      <label for="state">Nome</label>
      <input type="text" id="state" name="state" />

      <label for="zipCode">Cep</label>
      <input type="text" id="zipCode" name="zipCode" />

      <div class="user_form__action">
        <slot name="action"></slot>
      </div>
    </form>
  </section>
</template>

<script>
export default {
  name: "RnkUserForm"
};
</script>

<style scoped>
.user_form {
  display: grid;
  align-items: center;
  padding: 0 20px;
}
</style>