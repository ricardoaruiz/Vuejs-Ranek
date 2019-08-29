<template>
  <div class="product" v-if="product">
    <router-link :to="{ name: 'product', params: { id: product.id} }">
      Ver produto
      <img
        v-if="product.images && product.images.length"
        :src="product.images[0].content"
        :alt="product.images[0].title"
        class="product_img"
      />
    </router-link>

    <div class="product_info">
      <p class="product_price">{{product.price | currency-format}}</p>
      <h2 class="product_title">{{product.name}}</h2>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "RnkProductItem",
  props: {
    product: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.product {
  display: grid;
  grid-template-columns: 100px 1fr;
  grid-gap: 20px;
  margin-bottom: 40px;
  position: relative;
}
.product_img {
  margin-top: 20px;
  border-radius: 4px;
  overflow: hidden;
  height: 100px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  transition: all 0.6s;
}
.product_img:hover {
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
  transform: scale(1.15);
}
.product_info {
  align-self: end;
}
.product_prive {
}
.product_title {
}
</style>