import Cookies from "js-cookie";
import client from "./client";

export const getUsers = () => {
  return client.get("users", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};
export const getUser = (id) => {
  return client.get(`users/${id}`);
};

export const updateUser = (id, data) => {
  return client.put(`users/${id}`, data);
};
