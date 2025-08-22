import { updateCategory } from "@/lib/categories-data"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const sliderApi = createApi({
    reducerPath: "sliderApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/",
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
            invalidatesTags: ["Slider"],
            providesTags: (result, error, id) => [{ type: "Slider", id }],
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
            invalidatesTags: ["Slider"],
        }),
        getSlider: builder.query({
            query: (id) => `slider/${id}`,
            providesTags: (result, error, id) => [{ type: "Slider", id }],
        }),
        uploadSliderImage: builder.mutation({
            //header multipart/form-data
            query: (id, formData) => ({
                url: `slider/upload-image/${id}`,
                method: "POST",
                body: formData,
            }),
            invalidatesTags: ["Slider"],
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
    useUploadSliderImageMutation,
} = sliderApi
