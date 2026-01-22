import { api } from "../reduxapi";

export const lactatingApiSlice = api.injectEndpoints({
	endpoints: (builder) => ({
		getAllLactatingData: builder.query({
			query: (data) => ({
				url: "/lactatingMotherData",
			}),
		}),
		addLactatingData: builder.mutation({
			query: (data) => ({
				url: "/lactatingMotherData",
				method: "POST",
				body: {
					...data,
				},
			}),
		}),
		getOneLactatingData: builder.query({
			query: (data) => ({
				url: `/lactatingMotherData/${data}`,
			}),
		}),
		updateLactatingData: builder.mutation({
			query: (data) => ({
				url: "/lactatingMotherData",
				method: "PUT",
				body: {
					...data,
				},
			}),
		}),
		addNewLactatingDataRecord: builder.mutation({
			query: (data) => ({
				url: "/lactatingMotherData/updateRecords",
				method: "PUT",
				body: {
					...data,
				},
			}),
		}),
	}),
});

export const {
	useGetAllLactatingDataQuery,
	useAddLactatingDataMutation,
	useGetOneLactatingDataQuery,
	useUpdateLactatingDataMutation,
	useAddNewLactatingDataRecordMutation
} = lactatingApiSlice;
