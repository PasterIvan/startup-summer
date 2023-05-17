import axios from "axios";

import { SearchParamsType } from "./types";

const instance = axios.create({
  baseURL: "https://startup-summer-2023-proxy.onrender.com/2.0",
  headers: {
    "Content-Type": "application/json",
    "x-secret-key": "GEU4nvd3rej*jeh.eqp",
    "X-Api-App-Id":
      "v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948",
  },
});

instance.interceptors.request.use((config) => {
  const conf = { ...config };
  const state = localStorage.getItem("app-state");

  if (state) {
    const app = JSON.parse(state);

    conf.headers.Authorization = `${app.auth.login.token_type} ${app.auth.login.access_token}`;
  }

  return conf;
});

export const vacancyAPI = {
  getVacancy(params: SearchParamsType) {
    return instance.get("vacancies/", { params });
  },
  getVacancyById(id: number) {
    return instance.get(`vacancies/${id}/`);
  },
  getCatalogues() {
    return instance.get("catalogues/");
  },
};
