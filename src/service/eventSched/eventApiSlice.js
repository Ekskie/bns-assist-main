import { api } from "../reduxapi";

export const eventApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getEvent: builder.query({
      query: () => ({
        url: "/event",
      }),
    }),
    addEventSchedule: builder.mutation({
      query: (data) => ({
        url: "/event",
        method: "POST",
        body: {
          ...data,
        },
      }),
    }),

    deleteEventSchedule: builder.mutation({
      query: (data) => ({
        url: "/event",
        method: "DELETE",
        body: {
          ...data,
        },
      }),
    }),

    setReminders: builder.mutation({
      query: (data) => ({
        url: "/event",
        method: "PUT",
        body: {
          ...data,
        },
      }),
    }),
  }),
});

export const {
  useGetEventQuery,
  useAddEventScheduleMutation,
  useDeleteEventScheduleMutation,
  useSetRemindersMutation,
} = eventApiSlice;
