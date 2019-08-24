<template>
  <section>
    <h2>Criar Produto</h2>
    <RnkCreateProduct />

    <h2>Produtos</h2>
    <transition-group v-if="userProducts" name="product-list" tag="ul">
      <li v-for="product in userProducts" :key="product.id">
        <RnkProductItem :product="product">
          <p>{{product.description}}</p>
          <button class="btn-remove-product" @click="remove(product)">Remover</button>
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
    ...mapActions(["setUserProducts", "removeUserProduct"]),
    loadProducts() {
      if (!this.userProducts) {
        ProductService.getInstance()
          .listByUser(this.loggedUser.id)
          .then(products => this.setUserProducts(products))
          .catch(error => console.log(error));
      }
    },
    remove(product) {
      const confirm = window.confirm("Deseja remover o produto");
      if (confirm) {
        ProductService.getInstance()
          .delete(product.id)
          .then(result => this.removeUserProduct(product))
          .catch(error => alert(error));
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

.btn-remove-product {
  position: absolute;
  top: 0;
  right: 0;
  background: url("../../assets/remove.svg") no-repeat center center;
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  cursor: pointer;
  text-indent: 140px;
  overflow: hidden;
}
.btn-remove-product:hover {
  background-color: #87f;
}
</style>