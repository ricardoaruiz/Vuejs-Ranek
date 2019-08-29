'<template>
  <section>
    <h2>Vendas</h2>
    <ul v-if="sales">
      <li v-for="(sale, index) in sales" :key="index">
        <RnkProductItem :product="sale.product">{{sale.email_seller}}</RnkProductItem>
      </li>
    </ul>
  </section>
</template>

<script>
import { mapGetters } from "vuex";
import RnkProductItem from "@/components/RnkProductItem.vue";
import CheckoutService from "@/service/CheckoutService.js";
import UserService from "@/service/UserService.js";

export default {
  name: "UserSales",
  components: { RnkProductItem },
  data() {
    return {
      sales: undefined
    };
  },
  computed: {
    ...mapGetters(["isLogged", "loggedUser"])
  },
  methods: {
    async load() {
      try {
        const sales = await CheckoutService.getInstance().listBySeller(
          this.loggedUser.id
        );

        if (sales && sales.length) {
          let buyers = new Map();
          this.sales = [];

          for (let i = 0; i < sales.length; i++) {
            const sale = sales[i];
            const sellerCached = buyers.get(sale.buyer_id);

            if (sellerCached) {
              this.sales.push({
                ...sale,
                email_seller: sellerCached.email
              });
            } else {
              let seller = await UserService.getInstance().load(sale.buyer_id);
              buyers.set(seller.id, seller);

              this.sales.push({
                ...sale,
                email_seller: seller.email
              });
            }
          }
        }
      } catch (error) {
        alert(error);
      }
    }
  },
  watch: {
    isLogged(newValue) {
      if (newValue) {
        this.load();
      }
    }
  },
  created() {
    if (this.isLogged) {
      this.load();
    }
  }
};
</script>

<style>
</style>'