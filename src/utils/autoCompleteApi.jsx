import axios from "axios";

const BASE_URL = "https://corsproxy.io/?https://clients1.google.com/complete/search?client=firefox";
// const fullUrl = proxyUrl+BASE_URL;

export const fetchAutoComplete = async (url) => {
  const { data } = await axios.get(`${BASE_URL}${url}&hl=en&gl=in`);

  return data;
};
