import { api } from "../reduxapi";

export const eventApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getFeedBack: builder.query({
      query: () => ({
        url: "/feedback",
      }),
    }),
    addFeedback: builder.mutation({
      query: (data) => ({
        url: "/feedback",
        method: "POST",
        body: {
          ...data,
        },
      }),
    }),
  }),
});

export const { useAddFeedbackMutation, useGetFeedBackQuery } = eventApiSlice;
