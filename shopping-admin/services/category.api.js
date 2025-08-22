import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const CategoryApi = createApi({
    reducerPath: "CategoryApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/",
    }),
    tagTypes: ["Category"],
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => "category",
            transformResponse: (response) => {
                return response.items
            },
            providesTags: ["Category"],
        }),
    }),
})


//rtk query
export const {
    useGetCategoriesQuery,
} = CategoryApi