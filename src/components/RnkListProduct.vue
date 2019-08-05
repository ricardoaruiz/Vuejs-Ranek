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
export default {
  name: "RnkListProduct",
  props: {
    products: {
      type: Array,
      required: false,
      default: () => []
    }
  }
};
</script>

<style>
</style>
