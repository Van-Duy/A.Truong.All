import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const sliderApi = createApi({
  reducerPath: "sliderApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/",
  }),
  tagTypes: ["Slider"],
  endpoints: (builder) => ({
    getSliders: builder.query({
      query: () => "sliders",
      providesTags: ["Slider"],
    }),
    getSlider: builder.query({
      query: (id) => `sliders/${id}`,
      providesTags: (result, error, id) => [{ type: "Slider", id }],
    }),
    createSlider: builder.mutation({
      query: (newSlider) => ({
        url: "sliders",
        method: "POST",
        body: newSlider,
      }),
      invalidatesTags: ["Slider"],
    }),
    updateSlider: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `sliders/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Slider", id }],
    }),
    deleteSlider: builder.mutation({
      query: (id) => ({
        url: `sliders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Slider"],
    }),
  }),
})

export const {
  useGetSlidersQuery,
  useGetSliderQuery,
  useCreateSliderMutation,
  useUpdateSliderMutation,
  useDeleteSliderMutation,
} = sliderApi
