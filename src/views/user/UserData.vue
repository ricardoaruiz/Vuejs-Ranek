<template>
  <section>
    <RnkUpdateUser @onUpdateUser="update" />
  </section>
</template>

<script>
import { mapActions } from "vuex";
import RnkUpdateUser from "@/components/RnkUpdateUser.vue";

export default {
  name: "UserData",
  components: { RnkUpdateUser },
  methods: {
    ...mapActions(["setLoggedUser"]),
    update(user) {
      this.setLoggedUser(user);
    }
  }
};
</script>

<style>
</style>