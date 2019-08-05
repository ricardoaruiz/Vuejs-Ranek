<template>
  <form>
    <input type="text" name="find" id="find" v-model="searchTerm" />
    <input type="submit" id="findButton" value="Buscar" @click.prevent="findProduct" />
  </form>
</template>

<script>
export default {
  name: "RnkFindProduct",
  data() {
    return {
      searchTerm: ""
    };
  },
  methods: {
    findProduct() {
      this.$emit("onFind", this.searchTerm);
    }
  },
  watch: {
    searchTerm(newValue) {
      if (!newValue) {
        this.findProduct();
      }
    }
  }
};
</script>

<style>
</style>
