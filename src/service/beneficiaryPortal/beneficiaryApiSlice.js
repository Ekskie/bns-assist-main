import { api } from "../reduxapi";

export const beneficiaryApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getuserAccountData: builder.query({
      query: ({ id, user_type }) => ({
        url: `/beneficiaryPortal/${user_type}/${id}`,
      }),
    }),

    updateBeneficiaryData: builder.mutation({
      query: (data) => ({
        url: `/beneficiaryPortal/${data.user_type}/${data.id}`, // Fixed URL to match dynamic route
        method: "PUT",
        body: { ...data },
      }),
    }),

    // New endpoint to get children by mother's name
    getChildrenByMother: builder.mutation({
      query: (motherName) => ({
        url: "/beneficiaryPortal/children/byGuardian",
        method: "POST",
        body: { motherName },
      }),
    }),
  }),
});

export const {
  useGetuserAccountDataQuery,
  useUpdateBeneficiaryDataMutation,
  useGetChildrenByMotherMutation,
} = beneficiaryApiSlice;