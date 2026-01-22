import { api } from "../reduxapi";

export const bnsWorkerApiSlice = api.injectEndpoints({
	endpoints: (builder) => ({
		addBnsWorkerTask: builder.mutation({
			query: (data) => ({
				url: "/superAdmin/task",
				method: "POST",
				body: {
					...data,
				},
			}),
		}),
		updateBnsWorkerTask: builder.mutation({
			query: (data) => ({
				url: "/superAdmin/task",
				method: "PUT",
				body: {
					...data,
				},
			}),
		}),
		updateNewBnsWorkerTask: builder.mutation({
			query: (data) => ({
				url: "/bnsUsers/task",
				method: "PUT",
				body: {
					...data,
				},
			}),
		}),
	}),
});

export const {
	useAddBnsWorkerTaskMutation,
	useUpdateBnsWorkerTaskMutation,
	useUpdateNewBnsWorkerTaskMutation,
} = bnsWorkerApiSlice;
