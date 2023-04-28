import axios from "axios";
import { Config } from "../config";

axios.defaults.baseURL = Config.base_url;
axios.defaults.headers.post["Content-Type"] = "application/json";

const Token = localStorage.getItem("token") ?? null;

if (Token) {
  axios.defaults.headers.common["Authorization"] = Token;
}

class ApiClient {
  get = (url, data) => {
    return axios.get(url, data);
  };
  create = (url, data) => {
    return axios.post(url, data);
  };
  patch = (url, data) => {
    return axios.patch(url, data);
  };
  put = (url, data) => {
    return axios.put(url, data);
  };
  delete = (url, data) => {
    return axios.delete(url, data);
  };
}
export { ApiClient };
