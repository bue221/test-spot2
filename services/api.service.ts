import {
  createApi,
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { API_URL } from "config";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = "9|nkRjBQ5K8WBo7CrAzWjkvinbJyv0ocgLdOXMQHc7";
    if (token && endpoint !== "auth/login") {
      headers.set("Authorization", "Bearer " + token);
    }
    return headers;
  },
});
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result: any = await baseQuery(args, api, extraOptions);
  if (result.error) {
    if (result.error && result.error.status === 401) {
      alert("No autorizado");
    } else {
      alert("Error del servicio");
    }
  }
  return result;
};

const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});

export default api;
