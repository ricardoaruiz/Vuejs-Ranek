<template>
  <section>
    <h1>Compre ou venda</h1>
    <RnkFindProduct />
    <RnkListProduct />
  </section>
</template>

<script>
import RnkFindProduct from "@/components/RnkFindProduct.vue";
import RnkListProduct from "@/components/RnkListProduct.vue";

export default {
  name: "Home",
  components: { RnkFindProduct, RnkListProduct }
};
</script>

<style scoped>
h1 {
  font-size: 2rem;
  color: #87f;
  margin-top: 40px;
  text-align: center;
}
</style>

