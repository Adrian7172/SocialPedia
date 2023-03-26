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
            invalidatesTags: ["getPostsLikes", "getCommentsLikes"]
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
            invalidatesTags: ["getPostsLikes", "getCommentsLikes"]
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
            invalidatesTags: ["getPostsComments", "getCommentsComments"]
        }),
        getPostsComments: builder.query({
            query: (body) => ({
                url: `user/postsComments/${body[1]}`,
                method: "GET",
                headers: {
                    authorization: body[0]
                }
            }),
            providesTags: ["getPostsComments"]
        }),
        getPostsLikes: builder.query({
            query: (body) => ({
                url: `user/postsLikes/${body[1]}`,
                method: "GET",
                headers: {
                    authorization: body[0]
                }
            }),
            providesTags: ["getPostsLikes"]
        }),
        getCommentsComments: builder.query({
            query: (body) => ({
                url: `user/commentsComments/${body[1]}`,
                method: "GET",
                headers: {
                    authorization: body[0]
                }
            }),
            providesTags: ["getCommentsComments"]
        }),
        getCommentsLikes: builder.query({
            query: (body) => ({
                url: `user/commentsLikes/${body[1]}`,
                method: "GET",
                headers: {
                    authorization: body[0]
                }
            }),
            providesTags: ["getCommentsLikes"]
        }),
    })
})


export const { useUserPostMutation, useGetAllPostQuery, useGetUserPostQuery, useLikePostMutation, useRemoveLikePostMutation, useAddCommentMutation, useGetCommentsCommentsQuery, useGetCommentsLikesQuery, useGetPostsCommentsQuery, useGetPostsLikesQuery } = postApi