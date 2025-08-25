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
        createCategory: builder.mutation({
            query: (category) => ({
                url: "category",
                method: "POST",
                body: category,
            }),
        }),
        updateCategory: builder.mutation({
            query: (category) => ({
                url: `category/${category.id}`,
                method: "PUT",
                body: category,
            }),
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `category/${id}`,
                method: "DELETE",
            }),
        }),
    }),
})


//rtk query
export const {
    useGetCategoriesQuery,
} = CategoryApi