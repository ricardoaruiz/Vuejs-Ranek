<template>
  <section>
    <transition>
      <div class="product" v-if="product">
        <!-- Product Info  -->
        <div class="product__info">
          <h2 class="product__info_name">{{product.name}}</h2>
          <div class="product__info_price">{{product.price | currency-format}}</div>
          <p class="product__info_description">{{product.description}}</p>

          <button class="btn" v-if="!product.sold">Comprar</button>
          <button class="btn" v-else>Esgotado</button>
        </div>
        <!-- Product Images -->
        <ul class="product__images" v-if="product.images">
          <li class="product__image" v-for="(image, index) in product.images" :key="index">
            <img :src="image.content" :alt="image.title" />
          </li>
        </ul>
      </div>
    </transition>
  </section>
</template>

<script>
import ProductService from "@/service/ProductService.js";

export default {
  name: "RnkProduto",
  props: ["id"],
  data() {
    return {
      product: null
    };
  },
  methods: {
    load() {
      ProductService.getInstance()
        .load(this.id)
        .then(product => {
          this.product = product;
        })
        .catch(error => alert(error));
    }
  },
  created() {
    this.load();
  }
};
</script>

<style scoped>
.product {
  max-width: 900px;
  margin: 0 auto;
  padding: 60px 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 30px;
}
.product__info {
  padding: 20px;
}
.product__info_price {
  color: #cf5b0e;
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 20px;
}
.product__info_name {
  font-size: 1.2rem;
  margin-bottom: 20px;
}
.product__info_description {
  font-size: 0.9rem;
  margin-bottom: 20px;
}
.product__images {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
  padding: 20px;
}
.product__image img {
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(30, 60, 90, 0.1);
  transition: all 0.5s;
}
.product__image img:hover {
  transform: scale(1.02);
  box-shadow: 0 6px 12px rgba(30, 60, 90, 0.2);
}
</style>