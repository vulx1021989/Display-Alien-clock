import Api from "./Api";
import Csrf from "./Csrf";

export default {
  async register(form) {
   // await Csrf.getCookie();
    return Api.post("/v1/register", form);
  },

  async login(form) {
  //  await Csrf.getCookie();
    return Api.post("/v1/login", form);
  },

  async logout() {
   // await Csrf.getCookie();
    return Api.post("/v1/logout");
  },

  async auth() {
   // await Csrf.getCookie();
     return Api.get("/v1/user");
  }
};
