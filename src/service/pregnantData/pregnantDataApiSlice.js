import { api } from "../reduxapi";

export const authtApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    addPregnantData: builder.mutation({
      query: (data) => ({
        url: "/pregnantData",
        method: "POST",
        body: {
          ...data,
        },
      }),
    }),
    updatePregnantData: builder.mutation({
      query: (data) => ({
        url: "/pregnantData",
        method: "PUT",
        body: {
          ...data,
        },
      }),
    }),

    getAllPregnantData: builder.query({
      query: (data) => ({
        url: "/pregnantData",
      }),
    }),

    getOneDataPregnant: builder.query({
      query: (data) => ({
        url: `/pregnantData/${data}`,
      }),
    }),

    addNewDataRecords: builder.mutation({
      query: (data) => ({
        url: "/pregnantData/updateRecords",
        method: "PUT",
        body: {
          ...data,
        },
      }),
    }),
  }),
});

export const {
  useAddPregnantDataMutation,
  useGetAllPregnantDataQuery,
  useGetOneDataPregnantQuery,
  useAddNewDataRecordsMutation,
  useUpdatePregnantDataMutation,
} = authtApiSlice;
