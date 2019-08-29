'<template>
  <section>
    <h2>Compras</h2>
    <ul v-if="purchases">
      <li v-for="(purchase, index) in purchases" :key="index">
        <RnkProductItem :product="purchase.product">{{purchase.email_seller}}</RnkProductItem>
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
  name: "UserPurchases",
  components: { RnkProductItem },
  data() {
    return {
      purchases: undefined
    };
  },
  computed: {
    ...mapGetters(["isLogged", "loggedUser"])
  },
  methods: {
    async load() {
      try {
        const purchases = await CheckoutService.getInstance().listByBuyer(
          this.loggedUser.id
        );

        if (purchases && purchases.length) {
          let sellers = new Map();
          this.purchases = [];

          for (let i = 0; i < purchases.length; i++) {
            const purchase = purchases[i];
            const sellerCached = sellers.get(purchase.seller_id);

            if (sellerCached) {
              this.purchases.push({
                ...purchase,
                email_seller: sellerCached.email
              });
            } else {
              let seller = await UserService.getInstance().load(
                purchase.seller_id
              );
              sellers.set(seller.id, seller);

              this.purchases.push({
                ...purchase,
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