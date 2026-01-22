import { api } from "../reduxapi";

export const dailyDiaryApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    addDailyDiary: builder.mutation({
      query: (data) => ({
        url: "/bnsUsers/diary",
        method: "POST",
        body: {
          ...data,
        },
      }),
    }),
    addDailySpecialTaskDiary: builder.mutation({
      query: (data) => ({
        url: "/bnsUsers/specialTask",
        method: "POST",
        body: {
          ...data,
        },
      }),
    }),
    updateDailyDiary: builder.mutation({
      query: (data) => ({
        url: "/bnsUsers/diary",
        method: "PATCH",
        body: {
          ...data,
        },
      }),
    }),
    getAllDailyDiary: builder.query({
      query: (data) => {
        // data can be { userId: "123", date: "2025-11-17" } or any other filters
        const params = new URLSearchParams(data).toString();
        return `/bnsUsers/diary?${params}`;
      },
    }),
    getHeatmapReport: builder.query({
      query: (data) => ({
        url: `/bnsUsers/admin`,
      }),
    }),
  }),
});

export const {
  useAddDailyDiaryMutation,
  useAddDailySpecialTaskDiaryMutation,
  useUpdateDailyDiaryMutation,
  useLazyGetAllDailyDiaryQuery,
  useGetHeatmapReportQuery,
} = dailyDiaryApiSlice;
