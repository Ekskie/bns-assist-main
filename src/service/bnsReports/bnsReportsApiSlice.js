import { api } from "../reduxapi";

export const bnsReportsSlice = api.injectEndpoints({
	endpoints: (builder) => ({
		addReportType: builder.mutation({
			query: (data) => ({
				url: "/superAdmin/report/type",
				method: "POST",
				body: {
					...data,
				},
			}),
		}),
		getAllReportType: builder.query({
			query: (data) => ({
				url: `/superAdmin/report/type`,
			}),
		}),
		getAllReportGenerated: builder.query({
			query: (data) => ({
				url: `/superAdmin/report/generate`,
			}),
		}),
	}),
});

export const {
	useAddReportTypeMutation,
	useGetAllReportTypeQuery,
	useGetAllReportGeneratedQuery,
} = bnsReportsSlice;
