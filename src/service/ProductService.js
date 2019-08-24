import BaseService from "./BaseService";

const BASE_PRODUCT_URL = "/product";

export default class ProductService extends BaseService {
  static _instance = null;

  constructor() {
    super();
  }

  static getInstance() {
    if (!this._instance) {
      this._instance = new ProductService();
    }
    return this._instance;
  }

  query(query = "") {
    return this.http()
      .get(`${BASE_PRODUCT_URL}${query}`)
      .then(result => {
        return {
          totalProducts: result.headers["x-total-count"],
          products: result.data
        };
      })
      .catch(error => this.error("Erro ao carregar os produtos", error));
  }

  load(productId) {
    return this.http()
      .get(`${BASE_PRODUCT_URL}?id=${productId}`)
      .then(result => result.data[0])
      .catch(error => this.error("Erro ao carregar os produtos", error));
  }

  listByUser(userId) {
    return this.http()
      .get(`${BASE_PRODUCT_URL}?user_id=${userId}`)
      .then(result => result.data)
      .catch(error =>
        this.error(`Erro ao listar os produtos do usuário ${userId}`, error)
      );
  }

  create(product) {
    return this.http()
      .post(`${BASE_PRODUCT_URL}`, { ...product })
      .then(result => result.data)
      .catch(error => this.error("Erro ao criar um produto", error));
  }

  delete(productId) {
    return this.http()
      .delete(`${BASE_PRODUCT_URL}/${productId}`)
      .then(result => result.data)
      .catch(error => this.error("Erro ao remover um produto", error));
  }
}
