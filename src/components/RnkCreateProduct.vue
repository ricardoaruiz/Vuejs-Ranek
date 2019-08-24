<template>
  <form class="product_form">
    <label for="name">Nome</label>
    <input type="text" id="name" name="name" v-model="product.name" />

    <label for="price">Preço</label>
    <input type="number" id="price" name="price" v-model="product.price" />

    <label for="description">Descrição</label>
    <textarea id="description" name="description" v-model="product.description"></textarea>

    <label for="images">Imagens</label>
    <input type="file" id="images" name="images" ref="images" multiple />

    <button class="btn" @click.prevent="createProduct">Criar Produto</button>
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ProductService from "@/service/ProductService.js";

export default {
  name: "RnkCreateProduct",
  data() {
    return {
      product: {
        name: "",
        description: "",
        price: "",
        images: []
      }
    };
  },
  computed: {
    ...mapGetters(["loggedUser"])
  },
  methods: {
    ...mapActions(["addUserProducts"]),
    completeProduct() {
      this.product.user_id = this.loggedUser.id;
      this.product.sold = false;
      return this.fillImages();
    },
    fillImages() {
      const files = this.$refs.images.files;
      const promisses = [];

      if (files && files.length) {
        for (let i = 0; i < files.length; i++) {
          promisses.push(
            this.getImageContent(files[i]).then(content => {
              this.product.images.push({
                title: this.product.name,
                content
              });
            })
          );
        }
      }
      return Promise.all(promisses);
    },
    getImageContent(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();

        reader.onload = content => {
          resolve(content.target.result);
        };

        reader.onerror = error => {
          reject(error);
        };

        reader.readAsDataURL(file);
      });
    },
    async createProduct() {
      try {
        await this.completeProduct();
        const product = await ProductService.getInstance().create(this.product);
        this.addUserProducts(product);
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style scoped>
.product_form {
  display: grid;
  margin-bottom: 60px;
}
</style>