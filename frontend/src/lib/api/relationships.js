import Cookies from "js-cookie";
import client from "./client";

export const getFollows = () => {
  return client.get("relationships", {
    headers: {
      "access-token": Cookies.get("_access_token"),
      client: Cookies.get("_client"),
      uid: Cookies.get("_uid"),
    },
  });
};

export const createFollow = (data) => {
  return client.post("relationships", data);
};
