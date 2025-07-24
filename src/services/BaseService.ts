import { AxiosRequestConfig } from "axios";
import { AxiosResponse } from "axios";
import axios from "axios";
import CookieHelper from "@/lib/CookieHelper";
import UploadResult from "@/models/UploadResult";

export const isProduction = () => {
  if (process.env.NODE_ENV === "development") return false;
  return true;
};

const customUrl = "";

const getAPIUrl = () => {
  if (isProduction()) return "https://api.digging.pl/";
  if (customUrl) return customUrl;
  return "http://localhost:3000/";
};

const getDashboardUrl = () => {
  if (isProduction()) return "https://pigeon-map.digging.pl/";
  return "http://localhost:3001/";
};

export const API = getAPIUrl();
export const DASHBOARD = getDashboardUrl();

// export const API = "https://api.digging.pl/";

export const get = async <T = unknown, R = AxiosResponse<T>, D = unknown>(
  url: string,
  config?: AxiosRequestConfig<D>,
  isAuth = false
) => {
  const conf = await addConfiguration(config, isAuth);
  return axios.get<T, R, D>(`${API}${url}`, conf);
};

export const authGet = <T = unknown, R = AxiosResponse<T>, D = unknown>(
  url: string,
  config?: AxiosRequestConfig<D>
) => {
  return get<T, R, D>(url, config, true);
};

export const post = async <T = unknown, R = AxiosResponse<T>, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>,
  isAuth = false
) => {
  const conf = await addConfiguration(config, isAuth);
  return axios.post<T, R, D>(`${API}${url}`, data, conf);
};

export const authPost = async <T = unknown, R = AxiosResponse<T>, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>
) => {
  return post<T, R, D>(url, data, config, true);
};

export const put = async <T = unknown, R = AxiosResponse<T>, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>,
  isAuth = false
) => {
  const conf = await addConfiguration(config, isAuth);
  return axios.put<T, R, D>(`${API}${url}`, data, conf);
};

export const authPut = async <T = unknown, R = AxiosResponse<T>, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>
) => {
  return put<T, R, D>(url, data, config, true);
};

export const patch = async <T = unknown, R = AxiosResponse<T>, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>,
  isAuth = false
) => {
  const conf = await addConfiguration(config, isAuth);
  return axios.patch<T, R, D>(`${API}${url}`, data, conf);
};

export const authPatch = async <T = unknown, R = AxiosResponse<T>, D = unknown>(
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>
) => {
  return patch<T, R, D>(url, data, config, true);
};

export const Delete = async <T = unknown, R = AxiosResponse<T>, D = unknown>(
  url: string,
  config?: AxiosRequestConfig<D>,
  isAuth = false
) => {
  const conf = await addConfiguration(config, isAuth);
  return axios.delete<T, R, D>(`${API}${url}`, conf);
};

export const authDelete = async <
  T = unknown,
  R = AxiosResponse<T>,
  D = unknown
>(
  url: string,
  config?: AxiosRequestConfig<D>
) => {
  const conf = await addConfiguration(config, true);
  return axios.delete<T, R, D>(`${API}${url}`, conf);
};

export const authUpload = async (
  url: string,
  data: File,
  config?: AxiosRequestConfig<File>
) => {
  const conf = await addConfiguration(config, true);
  conf.headers = {
    ...conf.headers,
    "Content-Type": "multipart/form-data",
  };
  const formData = new FormData();
  formData.append("file", data);
  const result = await axios.post<object, AxiosResponse<object>, FormData>(
    `${API}${url}`,
    formData,
    conf
  );
  return UploadResult.create(result.data);
};

const addConfiguration = async (
  config?: AxiosRequestConfig,
  isAuth = false
) => {
  const token = CookieHelper.token.get();
  const conf: AxiosRequestConfig = {
    ...config,
    headers: {
      "Content-Type": "application/json",
      ...config?.headers,
    },
  };
  if (isAuth) {
    conf.headers = {
      ...conf.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return conf;
};
