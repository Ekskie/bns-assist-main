import { api } from "../reduxapi";

export const bnsWorkerApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getuserAccountData: builder.query({
      query: ({ id, user_type }) => ({
        url: `beneficiaryPortal/${user_type}/${id}`,
      }),
    }),

    updateBeneficiaryData: builder.mutation({
      query: (data) => ({
        url: "/beneficiaryPortal",
        method: "PUT",
        body: {
          ...data,
        },
      }),
    }),
  }),
});

export const { useGetuserAccountDataQuery, useUpdateBeneficiaryDataMutation } =
  bnsWorkerApiSlice;
