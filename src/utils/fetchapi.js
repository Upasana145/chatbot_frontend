import axios from "axios";

export const postAPI = async (url, payload, token) => {
  let path = `${process.env.REACT_APP_API_URI}/${url}`;
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: path,
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
    data: payload,
  };

  return axios
    .request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};

export const getAPI = async (slug, token) => {
  const path = `${process.env.REACT_APP_API_URI}/${slug}`;
  let config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: path,
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  };

  return axios
    .request(config)
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      return error;
    });
};
