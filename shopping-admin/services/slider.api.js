import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const sliderApi = createApi({
    reducerPath: "sliderApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8000/",
    }),
    tagTypes: ["Slider"],
    endpoints: (builder) => ({
        getSliders: builder.query({
            query: () => "slider",
            transformResponse: (response) => {
                return response.items
            },
            providesTags: ["Slider"],
        }),
        createSlider: builder.mutation({
            query: (newSlider) => ({
                url: "slider",
                method: "POST",
                body: newSlider,
            }),
        }),
        updateSlider: builder.mutation({
            query: ({ id, ...patch }) => ({
                url: `slider/${id}`,
                method: "PUT",
                body: patch,
            }),
        }),
        deleteSlider: builder.mutation({
            query: (id) => ({
                url: `slider/${id}`,
                method: "DELETE",
            }),
        }),
        getSlider: builder.query({
            query: (id) => `slider/${id}`,
            providesTags: (result, error, id) => [{ type: "Slider", id }],
        }),
    }),
})


//rtk query
export const {
    useGetSlidersQuery,
    useCreateSliderMutation,
    useUpdateSliderMutation,
    useDeleteSliderMutation,
    useGetSliderQuery,
} = sliderApi
