import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const settingsApi = createApi({
  reducerPath: "settingsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/settings" }),
  tagTypes: ["Settings"],
  endpoints: (builder) => ({
    getAllSettings: builder.query({
      query: () => "",
      providesTags: ["Settings"],
    }),
    getSettingsByType: builder.query({
      query: (type) => `/${type}`,
      providesTags: (result, error, type) => [{ type: "Settings", id: type }],
    }),
    updateSettings: builder.mutation({
      query: ({ type, data }) => ({
        url: `/${type}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, { type }) => [{ type: "Settings", id: type }],
    }),
    addMenuItem: builder.mutation({
      query: (data) => ({
        url: "/menu",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "Settings", id: "header" }],
    }),
    updateMenuItem: builder.mutation({
      query: ({ id, data }) => ({
        url: `/menu/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [{ type: "Settings", id: "header" }],
    }),
    deleteMenuItem: builder.mutation({
      query: (id) => ({
        url: `/menu/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Settings", id: "header" }],
    }),
  }),
})

export const {
  useGetAllSettingsQuery,
  useGetSettingsByTypeQuery,
  useUpdateSettingsMutation,
  useAddMenuItemMutation,
  useUpdateMenuItemMutation,
  useDeleteMenuItemMutation,
} = settingsApi
