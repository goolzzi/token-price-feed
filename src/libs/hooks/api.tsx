import React, { createContext, useContext } from 'react';
import axios, { AxiosPromise } from 'axios';

const api = axios.create({
  baseURL: process.env.React_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

interface ApiClient {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
  get: <T extends unknown>(url: string) => AxiosPromise<T>;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
  post: <T extends unknown>(url: string, data: any) => AxiosPromise<T>;
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
  delete: <T extends unknown>(url: string) => AxiosPromise<T>;
}

const ApiContext = createContext<ApiClient>({} as ApiClient);

export const ApiContextProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
  const get = <T extends unknown>(url: string): AxiosPromise<T> => api.get(url);
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
  const post = <T extends unknown>(url: string, data: any): AxiosPromise<T> => api.post(url, data);
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
  const _delete = <T extends unknown>(url: string): AxiosPromise<T> => api.delete(url);
  const apiClient = { get, post, delete: _delete };
  return <ApiContext.Provider value={apiClient}>{children}</ApiContext.Provider>;
};

export const useApi = (): ApiClient => useContext(ApiContext);
