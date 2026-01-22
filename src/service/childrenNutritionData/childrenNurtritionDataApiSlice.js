import { api } from "../reduxapi";

export const authtApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    addChildrenNutritionData: builder.mutation({
      query: (data) => ({
        url: "/childrenNutritionData",
        method: "POST",
        body: {
          ...data,
        },
      }),
    }),

    getChildrenNutritionData: builder.query({
      query: () => ({
        url: "/childrenNutritionData",
      }),
    }),

    approveDeclineNutritioData: builder.mutation({
      query: (data) => ({
        url: "/childrenNutritionData",
        method: "PUT",
        body: {
          ...data,
        },
      }),
    }),

    addNewCndataRecord: builder.mutation({
      query: (data) => ({
        url: "/childrenNutritionData/updateRecords",
        method: "PUT",
        body: {
          ...data,
        },
      }),
    }),

    getTableNutritionData: builder.query({
      query: () => ({
        url: "/childrenNutritionData/admin",
      }),
    }),
  }),
});

export const {
  useAddChildrenNutritionDataMutation,
  useGetChildrenNutritionDataQuery,
  useAddNewCndataRecordMutation,
  useApproveDeclineNutritioDataMutation,
  useGetTableNutritionDataQuery,
} = authtApiSlice;
