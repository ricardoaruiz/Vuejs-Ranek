<template>
  <section class="product_container">
    <transition mode="out-in">
      <div class="products" v-if="products && products.length" key="produtos">
        <div class="product" v-for="product in products" :key="product.id">
          <router-link :to="{name: 'product', params: {id: product.id} }">
            <img
              class="product_image"
              :src="product.images[0].content"
              :alt="product.images[0].title"
            />
            <p class="product_price">{{ product.price | currency-format }}</p>
            <h2 class="product_title">{{ product.name }}</h2>
            <p class="product_description">{{ product.description }}</p>
          </router-link>
        </div>
      </div>
      <div class="products_notfound" v-if="products && products.length === 0" key="no-result">
        <p>Produto não encontrado</p>
      </div>
    </transition>
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

<style scoped>
.product_container {
  max-width: 1000px;
  margin: 40px auto 0 auto;
}
.products {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 30px;
}
.product {
  padding: 10px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  border-radius: 4px;
  transition: all 0.3s;
  cursor: pointer;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.product:hover {
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  transform: scale(1.02);
  position: relative;
  z-index: 1;
}
.product_image {
  margin-bottom: 20px;
  border-radius: 4px;
}
.product_price {
  color: #e80;
  font-weight: bold;
  margin-bottom: 10px;
}
.product_title {
  margin-bottom: 10px;
}
.products_notfound p {
  text-align: center;
}
@media screen and (max-width: 800px) {
  .products {
    display: flex;
    flex-flow: column;
    align-items: center;
  }
}
</style>