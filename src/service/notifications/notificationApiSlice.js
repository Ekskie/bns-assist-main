import { api } from "../reduxapi";

export const eventApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: () => ({
        url: "/notifications",
      }),
    }),
    addNotifications: builder.mutation({
      query: (data) => ({
        url: "/notifications",
        method: "POST",
        body: {
          ...data,
        },
      }),
    }),
  }),
});

export const { useAddNotificationsMutation, useGetNotificationsQuery } =
  eventApiSlice;
