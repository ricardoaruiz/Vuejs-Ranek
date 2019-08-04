import BaseService from "./BaseService";

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

  loadAll() {
    return this.http()
      .get("/product")
      .then(result => result.data)
      .catch(error => this.error("Erro ao carregar os produtos", error));
  }
}