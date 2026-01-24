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

    // New mutations for Delete and Update Profile
    deleteChildrenNutritionData: builder.mutation({
      query: ({ id }) => ({
        url: `/childrenNutritionData/${id}`, // Dynamic ID route
        method: "DELETE",
      }),
    }),

    updateChildrenNutritionData: builder.mutation({
      query: (data) => ({
        url: `/childrenNutritionData/${data._id}`, // Dynamic ID route
        method: "PUT",
        body: data,
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
  useDeleteChildrenNutritionDataMutation,
  useUpdateChildrenNutritionDataMutation,
} = authtApiSlice;