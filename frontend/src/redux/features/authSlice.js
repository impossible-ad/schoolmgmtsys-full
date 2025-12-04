import { indexSlice } from "./indexSlice";

export const authAPIs = indexSlice.injectEndpoints({

    endpoints: (builder) => ({

        signout: builder.mutation({
            query: () => ({
                url: "/auth/signout",
                method: "POST",
            }),
            invalidatesTags: ["auth"],
        }),


        login: builder.mutation({
            query: (data) => ({
                url: "/auth/login",
                method: "POST",
                body: data,
            }), invalidatesTags: ["auth"],
        }),
    }),

});

export const { useSignoutMutation, useLoginMutation } = authAPIs;