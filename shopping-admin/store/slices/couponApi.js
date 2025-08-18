import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const couponApi = createApi({
  reducerPath: "couponApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/coupons",
  }),
  tagTypes: ["Coupon"],
  endpoints: (builder) => ({
    getCoupons: builder.query({
      query: ({ search = "", status = "all", type = "all" } = {}) => {
        const params = new URLSearchParams()
        if (search) params.append("search", search)
        if (status !== "all") params.append("status", status)
        if (type !== "all") params.append("type", type)
        return `?${params.toString()}`
      },
      providesTags: ["Coupon"],
    }),
    getCouponById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Coupon", id }],
    }),
    createCoupon: builder.mutation({
      query: (newCoupon) => ({
        url: "",
        method: "POST",
        body: newCoupon,
      }),
      invalidatesTags: ["Coupon"],
    }),
    updateCoupon: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/${id}`,
        method: "PUT",
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Coupon", id }],
    }),
    deleteCoupon: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Coupon"],
    }),
    validateCoupon: builder.mutation({
      query: (data) => ({
        url: "/validate",
        method: "POST",
        body: data,
      }),
    }),
  }),
})

export const {
  useGetCouponsQuery,
  useGetCouponByIdQuery,
  useCreateCouponMutation,
  useUpdateCouponMutation,
  useDeleteCouponMutation,
  useValidateCouponMutation,
} = couponApi
