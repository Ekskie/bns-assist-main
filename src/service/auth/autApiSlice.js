import { api } from "../reduxapi";

export const authtApiSlice = api.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data) => ({
				url: "/auth/login",
				method: "POST",
				body: {
					...data,
				},
			}),
		}),

		registerBnsWorker: builder.mutation({
			query: (data) => ({
				url: "/auth",
				method: "POST",
				body: {
					...data,
				},
			}),
		}),

		updateBnsWorker: builder.mutation({
			query: (data) => ({
				url: "/auth",
				method: "PUT",
				body: {
					...data,
				},
			}),
		}),

		getPost: builder.query({
			query: () => ({
				url: "/auth",
			}),
		}),

		getOneBnsWorker: builder.query({
			query: (data) => ({
				url: `/auth/${data}`,
			}),
		}),

		/* ADMIN FUNCTION */

		registerBnsAdmin: builder.mutation({
			query: (data) => ({
				url: "/auth/admin",
				method: "POST",
				body: {
					...data,
				},
			}),
		}),

		loginAdmin: builder.mutation({
			query: (data) => ({
				url: "/auth/admin/login",
				method: "POST",
				body: {
					...data,
				},
			}),
		}),

		/* BENEFICIARY LOGIN */

		loginBeneciary: builder.mutation({
			query: (data) => ({
				url: "/auth/beneficiary_user",
				method: "POST",
				body: {
					...data,
				},
			}),
		}),

		// approved and reject bns user
		approveAndRejectBnsUser: builder.mutation({
			query: (data) => ({
				url: "/bnsUsers",
				method: "PUT",
				body: { ...data },
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useGetPostQuery,
	useRegisterBnsWorkerMutation,
	useUpdateBnsWorkerMutation,
	useGetOneBnsWorkerQuery,
	useRegisterBnsAdminMutation,
	useLoginAdminMutation,
	useLoginBeneciaryMutation,
  useApproveAndRejectBnsUserMutation
} = authtApiSlice;
