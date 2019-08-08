<template>
  <form>
    <input type="text" name="find" id="find" v-model="searchTerm" placeholder="Buscar..." />
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

<style scoped>
form {
  max-width: 600px;
  margin: 30px auto 60px auto;
  position: relative;
}
#find {
  width: 100%;
  padding: 20px;
  border: none;
}
#find:focus,
#find:hover {
  transform: scale(1.02);
}
#findButton {
  width: 62px;
  height: 62px;
  background: url("../assets/search.svg") no-repeat center center;
  text-indent: -150px;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  box-shadow: none;
}
</style>
