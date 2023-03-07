import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_BASE_URL

export const authApi = createApi({
    reducerPath: "auth",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL}),
    endpoints: (builder) => ({
        userLogin: builder.mutation({
            query: (body) => ({
                url: '/auth/login',
                method: "POST",
                body: body
            })
        }),
        userRegister: builder.mutation({
            query: (body) => ({
                url: '/auth/register',
                method: "POST",
                body: body,
            }),
        }),
    })
})

export const { useUserLoginMutation, useUserRegisterMutation } = authApi;