import { findZipCode } from "@/service/ExternalUtilsService.js";

export default {
  data() {
    return {
      user: {}
    };
  },
  methods: {
    typedValue(objValue) {
      if (Object.keys(objValue).indexOf("zipCode") > -1) {
        if (objValue.zipCode.trim().length == 0) {
          this.user.city = "";
          this.user.street = "";
          this.user.state = "";
          this.user.zip_code = "";
        } else {
          objValue.zipCode = objValue.zipCode.replace(/\D/g, "");
          if (objValue.zipCode.length === 8) {
            findZipCode(objValue.zipCode).then(zipData => {
              this.user.city = zipData.localidade;
              this.user.street = zipData.logradouro;
              this.user.state = zipData.uf;
              this.user.zip_code = zipData.cep;
            });
          }
        }
        return;
      }
      Object.assign(this.user, objValue);
    }
  }
};
