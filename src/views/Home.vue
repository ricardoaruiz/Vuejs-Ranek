<template>
  <section>
    <h1>Compre ou venda</h1>

    <!-- Campo de busca de produtos -->
    <RnkFindProduct @onFind="searchTerm => this.searchTerm = searchTerm" />

    <!-- Componente de paginação -->
    <RnkPagination
      :totalRecords="totalProducts"
      :recordsPerPage="productsPerPage"
      :currentPage="currentPage"
      :showFirstLastButton="true"
      :showNextPreviewsButton="true"
      @onSelectPage="pageSelected"
    />

    <!-- Componente de listagem de produtos -->
    <RnkListProduct :products="products" />

    <!-- Componente de paginação -->
    <RnkPagination
      :totalRecords="totalProducts"
      :recordsPerPage="productsPerPage"
      :currentPage="currentPage"
      :showFirstLastButton="true"
      :showNextPreviewsButton="true"
      @onSelectPage="pageSelected"
    />
  </section>
</template>

<script>
import RnkFindProduct from "@/components/RnkFindProduct.vue";
import RnkListProduct from "@/components/RnkListProduct.vue";
import RnkPagination from "@/components/RnkPagination.vue";
import ProductService from "../service/ProductService.js";

export default {
  name: "Home",
  components: { RnkFindProduct, RnkListProduct, RnkPagination },
  data() {
    return {
      totalProducts: 0,
      products: [],
      searchTerm: "",
      currentPage: 1,
      productsPerPage: 6
    };
  },
  methods: {
    findProducts() {
      this.products = [];
      ProductService.getInstance()
        .query(this.queryString())
        .then(data => {
          this.products = data.products;
          this.totalProducts = Number(data.totalProducts);
          window.scrollTo({ top: 0, behavior: "smooth" });
        })
        .catch(error => alert(error.message));
    },
    queryString() {
      return this.searchTerm
        ? `?_limit=${this.productsPerPage}&_page=${this.currentPage}&name_like=${this.searchTerm}`
        : `?_limit=${this.productsPerPage}&_page=${this.currentPage}`;
    },
    pageSelected(page) {
      this.currentPage = page;
      this.findProducts(page);
    },
    init() {
      this.currentPage = 1;
      this.findProducts();
    }
  },
  watch: {
    searchTerm() {
      this.init();
    }
  },
  created() {
    this.init();
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

