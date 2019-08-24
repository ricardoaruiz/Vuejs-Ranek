<template>
  <section>
    <h2>Criar Produto</h2>
    <RnkCreateProduct />

    <h2>Produtos</h2>
    <transition-group v-if="userProducts" name="product-list" tag="ul">
      <li v-for="product in userProducts" :key="product.id">
        <RnkProductItem :product="product">
          <p>{{product.description}}</p>
        </RnkProductItem>
      </li>
    </transition-group>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import RnkCreateProduct from "@/components/RnkCreateProduct.vue";
import RnkProductItem from "@/components/RnkProductItem.vue";
import ProductService from "@/service/ProductService.js";

export default {
  name: "UserProducts",
  components: { RnkCreateProduct, RnkProductItem },
  computed: {
    ...mapGetters(["isLogged", "loggedUser", "userProducts"])
  },
  methods: {
    ...mapActions(["setUserProducts"]),
    loadProducts() {
      if (!this.userProducts) {
        ProductService.getInstance()
          .listByUser(this.loggedUser.id)
          .then(products => this.setUserProducts(products))
          .catch(error => console.log(error));
      }
    }
  },
  watch: {
    isLogged(newValue) {
      if (newValue) this.loadProducts();
    }
  },
  created() {
    if (this.isLogged) {
      this.loadProducts();
    }
  }
};
</script>

<style scoped>
h2 {
  margin-bottom: 20px;
}

.product-list-enter,
.product-list-leave-to {
  opacity: 0;
  transform: translate3d(20px, 0, 0);
}
.product-list-enter-active,
.product-list-leave-active {
  transition: all 0.6s;
}
</style>