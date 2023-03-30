import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }),
    endpoints: (builder) => ({
        getAllUser: builder.query({
            query: (token) => ({
                url: "/allusers",
                method: "GET",
                headers: {
                    Authorization: token
                },
            })
        }),
        getAllFriends: builder.query({
            query: (body) => ({
                url: `/allFriends/${body[1]}`,
                method: "GET",
                headers: {
                    Authorization: body[0]
                },
            }),
            providesTags: ["getAllFriends"]
        }),
        getUser: builder.query({
            query: (body) => ({
                url: `/user/${body[1]}`,
                method: "GET",
                headers: {
                    Authorization: body[0]
                },
            }),
        }),
        getSearchedUsers: builder.query({
            query: (body) => ({
                url: `/search/${body[1]}`,
                method: "GET",
                headers: {
                    Authorization: body[0]
                },
            })
        }),
        addFriend: builder.mutation({
            query: (body) => ({
                url: '/addFriend',
                method: "POST",
                headers: {
                    Authorization: body[0]
                },
                body: body[1]
            }),
            invalidatesTags: ["getAllFriends"]
        }),
        removeFriend: builder.mutation({
            query: (body) => ({
                url: '/removeFriend',
                method: "DELETE",
                headers: {
                    Authorization: body[0]
                },
                body: body[1]
            }),
            invalidatesTags: ["getAllFriends"]
        }),
        acceptRequest: builder.mutation({
            query: (body) => ({
                url: '/acceptRequest',
                method: "PATCH",
                headers: {
                    Authorization: body[0]
                },
                body: body[1]
            }),
            invalidatesTags: ["getAllFriends"]
        }),
      
    })
})


export const { useGetAllUserQuery, useGetUserQuery, useGetSearchedUsersQuery, useAddFriendMutation, useRemoveFriendMutation, useGetAllFriendsQuery, useAcceptRequestMutation } = userApi