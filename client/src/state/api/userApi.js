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
        getUser: builder.query({
            query: (body) => ({
                url: `/user/${body[1]}`,
                method: "GET",
                headers: {
                    Authorization: body[0]
                },
            })
        }),
        getSearchedUsers: builder.query({
            query: (body) => ({
                url: `/search/${body[1]}`,
                method: "GET",
                headers: {
                    Authorization: body[0]
                },
            })
        })
    })
})


export const { useGetAllUserQuery, useGetUserQuery, useGetSearchedUsersQuery } = userApi