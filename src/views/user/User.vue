<template>
  <p>User {{loggedUser}}</p>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "User",
  computed: {
    ...mapGetters(["loggedUser"])
  }
};
</script>

<style>
</style>