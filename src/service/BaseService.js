import axios from "axios";

export default class BaseService {
  static _http = null;

  constructor() {
    if (!this._http) {
      this._http = axios.create({
        baseURL: "http://localhost:3000"
      });
    }
  }

  /**
   * Return axios object
   */
  http() {
    return this._http;
  }

  /**
   * Handle errors
   * @param {*} msgError
   * @param {*} error
   */
  error(msgError, error) {
    console.error(msgError, error);
    throw error;
  }
}
