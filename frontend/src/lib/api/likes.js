import Cookies from "js-cookie";
import client from "./client";
export const getLikes = () => {
  return client.get("likes", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

export const createLike = (data) => {
  return client.post("likes", data);
};

export const deleteLike = (id) => {
  return client.delete("likes", id);
};
