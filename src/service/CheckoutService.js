import BaseService from "@/service/BaseService.js";

const BASE_CHECKOUT_URL = "/checkout";

export default class CheckoutService extends BaseService {
  static _instance = null;

  constructor() {
    super();
  }

  static getInstance() {
    if (!this._instance) {
      this._instance = new CheckoutService();
    }
    return this._instance;
  }

  /**
   * Do checkout
   * @param {*} checkout
   */
  create(checkout) {
    return this.http()
      .post(BASE_CHECKOUT_URL, { ...checkout })
      .then(result => result.data)
      .catch(error => this.error("Error on checkout", error));
  }

  listByBuyer(buyerId) {
    return this.http()
      .get(`${BASE_CHECKOUT_URL}?buyer_id=${buyerId}`)
      .then(result => result.data)
      .catch(error => this.error("Erro ao listar as compras de por comprador"));
  }

  listBySeller(sellerId) {
    return this.http()
      .get(`${BASE_CHECKOUT_URL}?seller_id=${sellerId}`)
      .then(result => result.data)
      .catch(error => this.error("Erro ao listar as compras por vendedor"));
  }
}
