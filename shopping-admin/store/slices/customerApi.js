import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const customerApi = createApi({
  reducerPath: "customerApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/customers" }),
  tagTypes: ["Customer"],
  endpoints: (builder) => ({
    getCustomers: builder.query({
      query: ({
        page = 1,
        limit = 10,
        search = "",
        status = "",
        customerType = "",
        sortBy = "registrationDate",
        sortOrder = "desc",
      } = {}) =>
        `?page=${page}&limit=${limit}&search=${search}&status=${status}&customerType=${customerType}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
      providesTags: ["Customer"],
    }),
    getCustomerById: builder.query({
      query: (id) => `/${id}`,
      providesTags: (result, error, id) => [{ type: "Customer", id }],
    }),
    createCustomer: builder.mutation({
      query: (customerData) => ({
        url: "",
        method: "POST",
        body: customerData,
      }),
      invalidatesTags: ["Customer"],
    }),
    updateCustomer: builder.mutation({
      query: ({ id, ...customerData }) => ({
        url: `/${id}`,
        method: "PUT",
        body: customerData,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Customer", id }, "Customer"],
    }),
    deleteCustomer: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Customer"],
    }),
  }),
})

export const {
  useGetCustomersQuery,
  useGetCustomerByIdQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customerApi
