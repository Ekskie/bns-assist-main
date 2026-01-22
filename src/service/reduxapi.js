import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({}),
  prepareHeaders: (headers, { getState }) => {
    headers.set("Content-Type", "multipart/form-data");
    return headers;
  },
});
