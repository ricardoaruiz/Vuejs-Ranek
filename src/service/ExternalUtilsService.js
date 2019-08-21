import axios from "axios";

export const findZipCode = zipCode => {
  return axios
    .get(`https://viacep.com.br/ws/${zipCode}/json/`)
    .then(result => result.data);
};
