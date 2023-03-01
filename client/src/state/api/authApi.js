import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query';

export const authApi = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.BASE_URL }),
    endpoints: (builder) => ({
        userLogin: builder.mutation({
            query: (body) => ({
                url: '/auth/login',
                method: "POST",
                body
            })
        })
    })
})

export const { useUserLoginMutation } = authApi;