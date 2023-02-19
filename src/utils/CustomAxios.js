import axios from "axios";
import store from "../redux/store";
import { signOut } from '../redux/auth/reducer'

const customAxios = axios.create({
  baseURL: "http://localhost:4000/admin",
  timeout: process.env.REACT_APP_ENV == "development" ? 2000*60 : 1000*60,
});

customAxios.interceptors.request.use((config) => {
  config.withCredentials = false;
  config.headers.platform = "android";
  config.headers.version = "1";
  config.headers["device-id"] = "123456";
  config.headers.Authorization = `Bearer ${store.getState()?.auth?.currentUser}`;
  config.headers["Content-Type"] = "application/json";

  return config;
});

customAxios.interceptors.response.use(
  (res) => {
    return res;
  },
  (err) => {
    if (err.code == "ECONNABORTED") {
      alert(err.message);
    }else if(err.response.status === 403) {
      store.dispatch(signOut())
    }
    return Promise.reject(err);
  }
);

export default customAxios;
