<template>
  <section>
    <RnkUserForm :user="user" :showLoginInfo="!isLogged" @onTypedValue="typedValue">
      <div slot="header">
        <h2 class="checkout_title">Finalizar compra</h2>
      </div>
      <div slot="action">
        <button class="btn" @click.prevent="checkout">Finalizar</button>
      </div>
    </RnkUserForm>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import RnkUserForm from "@/components/RnkUserForm.vue";
import RnkUserMixin from "@/components/RnkUserMixin.js";
import UserService from "@/service/UserService.js";
import ProductService from "@/service/ProductService.js";
import CheckoutService from "@/service/CheckoutService.js";

export default {
  name: "RnkCheckout",
  components: { RnkUserForm },
  mixins: [RnkUserMixin],
  props: ["product"],
  computed: {
    ...mapGetters(["isLogged", "loggedUser"])
  },
  methods: {
    ...mapActions(["setLoggedUser"]),
    async checkout() {
      try {
        // Criar usuário novo
        if (!this.isLogged) {
          const newUser = {
            name: this.user.name,
            password: this.user.password,
            email: this.user.email,
            address: {
              street: this.user.street,
              zip_code: this.user.zip_code,
              number: this.user.number,
              state: this.user.state,
              city: this.user.city
            }
          };
          const createdUser = await UserService.getInstance().create(newUser);
          this.setLoggedUser(createdUser);
        }

        // Criar transacao
        await CheckoutService.getInstance().create(this.getCheckoutObject());

        //TODO marcar o produto em questão como vendido
        const newProduct = { ...this.product };
        newProduct.sold = true;
        await ProductService.getInstance().update(newProduct);

        // Ir para a pagina de compras
        this.$router.push({ name: "user_purchases" });
      } catch (error) {
        alert(error);
      }
    },
    getCheckoutObject() {
      const selectedProduct = { ...this.product };
      delete selectedProduct.images;
      delete selectedProduct.user_id;
      delete selectedProduct.sold;

      return {
        buyer_id: this.loggedUser.id,
        seller_id: this.product.user_id,
        product: selectedProduct,
        address: {
          zip_code: this.user.zip_code,
          street: this.user.street,
          number: this.user.number,
          city: this.user.city,
          state: this.user.state
        }
      };
    }
  },
  created() {
    this.user = { ...this.loggedUser };
  }
};
</script>

<style scoped>
.checkout_title {
  text-align: center;
  margin-top: 50px;
}
.btn {
  width: 100%;
}
</style>