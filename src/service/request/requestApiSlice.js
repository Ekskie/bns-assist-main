import { api } from "../reduxapi";

export const authtApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    addRequest: builder.mutation({
      query: (data) => ({
        url: "/request",
        method: "POST",
        body: {
          ...data,
        },
      }),
    }),
    updateRequest: builder.mutation({
      query: (data) => ({
        url: "/request",
        method: "PUT",
        body: {
          ...data,
        },
      }),
    }),

    getAllRequest: builder.query({
      query: (data) => ({
        url: "/request",
      }),
    }),
  }),
});

export const {
  useAddRequestMutation,
  useGetAllRequestQuery,
  useUpdateRequestMutation,
} = authtApiSlice;
