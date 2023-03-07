import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_BASE_URL

export const postApi = createApi({
    reducerPath: "post",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        userPost: builder.mutation({
            query: (body) => ({
                url: "/user/post",
                method: "POST",
                headers: {
                    authorization: body[1]
                },
                body: body[0],
            }),
            invalidatesTags: ["post"]
        }),
        getAllPost: builder.query({
            query: (token) => ({
                url: "/user/allposts",
                method: "GET",
                headers: {
                    authorization: token
                },
            }),
            providesTags: ["post"]
        }),
        getUserPost: builder.query({
            query: (body) => ({
                url: `/user/allposts/${body[1]}`,
                method: "GET",
                headers: {
                    authorization: body[0]
                },
            }),
        }),
    })
})


export const { useUserPostMutation, useGetAllPostQuery, useGetUserPostQuery } = postApi