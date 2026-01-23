import { api } from "../reduxapi";

export const formsApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getForms: builder.query({
      query: () => ({
        url: "/forms",
      }),
    }),
    getFormsById: builder.query({
      query: (id) => ({
        url: `/forms/${id}`,
      }),
    }),
    addForm: builder.mutation({
      query: (data) => ({
        url: "/forms",
        method: "POST",
        body: {
          ...data,
        },
      }),
    }),
  }),
});

export const { useGetFormsQuery, useAddFormMutation, useGetFormsByIdQuery } =
  formsApiSlice;