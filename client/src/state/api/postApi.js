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
            invalidatesTags: ["post", "userpost"]
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
            providesTags: ["userpost"]
        }),

        likePost: builder.mutation({
            query: (body) => ({
                url: "/user/likePost",
                method: "POST",
                headers: {
                    authorization: body[0]
                },
                body: body[1]
            }),
            invalidatesTags: ["getPostLikesComments", "getCommentLikesComments"]
        }),
        removeLikePost: builder.mutation({
            query: (body) => ({
                url: "/user/removeLikePost",
                method: "POST",
                headers: {
                    authorization: body[0]
                },
                body: body[1]
            }),
            invalidatesTags: ["getPostLikesComments", "getCommentLikesComments"]
        }),
        addComment: builder.mutation({
            query: (body) => ({
                url: "/user/addComment",
                method: "POST",
                headers: {
                    authorization: body[0]
                },
                body: body[1]
            }),
            invalidatesTags: ["getPostLikesComments", "getCommentLikesComments"]
        }),
        getPostLikeComment: builder.query({
            query: (body) => ({
                url: `user/postLikeComment/${body[1]}`,
                method: "GET",
                headers: {
                    authorization: body[0]
                }
            }),
            providesTags: ["getPostLikesComments"]
        }),
        getCommentLikeComment: builder.query({
            query: (body) => ({
                url: `user/commentLikeComment/${body[1]}`,
                method: "GET",
                headers: {
                    authorization: body[0]
                }
            }),
            providesTags: ["getCommentLikesComments"]
        }),
    })
})


export const { useUserPostMutation, useGetAllPostQuery, useGetUserPostQuery, useLikePostMutation, useGetPostLikeCommentQuery, useRemoveLikePostMutation, useAddCommentMutation, useGetCommentLikeCommentQuery } = postApi