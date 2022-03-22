import client from "./client";
export const getProducts = () => {
  return client.get("/products");
};

export const getDetail = (id) => {
  return client.get(`/products/${id}`);
};

export const createProducts = (params) => {
  return client.post("/products", params);
};
export const editProducts = (id, params) => {
  return client.patch(`/products/${id}`, params);
};
export const deleteProducts = (id) => {
  return client.delete(`products/${id}`);
};
