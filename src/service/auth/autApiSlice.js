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

        // 🔹 Added Logout Mutation
        sendLogout: builder.mutation({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    // Force redirect or clear state here if needed
                    setTimeout(() => {
                        window.location.href = "/login"; 
                    }, 100);
                } catch (err) {
                    console.log(err);
                }
            },
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
    useApproveAndRejectBnsUserMutation,
    useSendLogoutMutation, // 🔹 Export the hook
} = authtApiSlice;