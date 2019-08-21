import BaseService from "./BaseService";

const BASE_USER_URL = "/user";

export default class UserService extends BaseService {
  static _instance = null;

  constructor() {
    super();
  }

  static getInstance() {
    if (!this._instance) {
      this._instance = new UserService();
    }
    return this._instance;
  }

  login(authData) {
    return this.http()
      .get(`${BASE_USER_URL}?email=${authData.email}`)
      .then(response => {
        const user = response.data[0];
        //TODO a verificação de senha está aqui, pois o json server
        // que é a nossa API fake não permite algo mais elaborado
        if (user && user.password === authData.password) {
          return user;
        } else {
          throw new Error("Invalid user/password");
        }
      })
      .catch(error => this.error("Error on login", error));
  }

  create(user) {
    return this.http()
      .post(`${BASE_USER_URL}`, { ...user })
      .then(response => console.log(response))
      .catch(error => this.error("Error on create user", error));
  }
}
