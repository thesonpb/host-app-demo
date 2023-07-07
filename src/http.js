import axios from "axios";

export default function getHttp(token) {
  return axios.create({
    baseURL: "https://staging.onesme.vn",
    headers: token
      ? {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      : {
          "Content-type": "application/json",
        },
  });
}
