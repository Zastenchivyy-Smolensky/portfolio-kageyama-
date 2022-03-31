import Cookies from "js-cookie";
import client from "./client";
export const getProducts = () => {
  return client.get("/products");
};

export const getDetail = (id) => {
  return client.get(`/products/${id}`);
};

export const createProduct = (params) => {
  return client.post("/products", params, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_cleint"),
      uid: Cookies.get("_uid"),
    },
  });
};
export const editProduct = (id, params) => {
  return client.patch(`/products/${id}`, params, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_cleint"),
      uid: Cookies.get("_uid"),
    },
  });
};
export const deleteProduct = (id) => {
  return client.delete(`products/${id}`, {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_cleint"),
      uid: Cookies.get("_uid"),
    },
  });
};
