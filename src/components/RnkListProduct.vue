<template>
  <section class="product_container">
    <div v-for="product in products" :key="product.id">
      <img :src="product.images[0].content" :alt="product.images[0].title" />
      <p class="product_price">{{ product.price }}</p>
      <h2 class="product_title">{{ product.name }}</h2>
      <p class="product_description">{{ product.description }}</p>
    </div>
  </section>
</template>

<script>
import ProductService from "../service/ProductService.js";
export default {
  name: "RnkListProduct",
  data() {
    return {
      products: null
    };
  },
  methods: {
    getProducts() {
      ProductService.getInstance()
        .loadAll()
        .then(products => (this.products = products))
        .catch(error => alert(error.message));
    }
  },
  created() {
    this.getProducts();
  }
};
</script>

<style>
</style>
