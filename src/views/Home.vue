<template>
  <section>
    <h1>Compre ou venda</h1>
    <RnkFindProduct @onFind="searchTerm => this.searchTerm = searchTerm" />
    <RnkListProduct :products="products" />
  </section>
</template>

<script>
import RnkFindProduct from "@/components/RnkFindProduct.vue";
import RnkListProduct from "@/components/RnkListProduct.vue";
import ProductService from "../service/ProductService.js";

export default {
  name: "Home",
  components: { RnkFindProduct, RnkListProduct },
  data() {
    return {
      products: [],
      searchTerm: "",
      productsPerPage: 9
    };
  },
  computed: {
    querString() {
      return this.searchTerm
        ? `?_limit=${this.productsPerPage}&name_like=${this.searchTerm}`
        : `?_limit=${this.productsPerPage}`;
    }
  },
  methods: {
    findProducts() {
      this.products = [];
      ProductService.getInstance()
        .query(this.querString)
        .then(products => (this.products = products))
        .catch(error => alert(error.message));
    }
  },
  watch: {
    searchTerm() {
      this.findProducts();
    }
  },
  created() {
    this.findProducts();
  }
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

