import { NextResponse } from "next/server"
import { getCustomers, createCustomer, getCustomerStats } from "@/lib/customers-data"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Number.parseInt(searchParams.get("page")) || 1
    const limit = Number.parseInt(searchParams.get("limit")) || 10
    const search = searchParams.get("search") || ""
    const status = searchParams.get("status") || ""
    const customerType = searchParams.get("customerType") || ""
    const sortBy = searchParams.get("sortBy") || "registrationDate"
    const sortOrder = searchParams.get("sortOrder") || "desc"

    let customers = getCustomers()

    // Filter by search
    if (search) {
      customers = customers.filter(
        (customer) =>
          customer.fullName.toLowerCase().includes(search.toLowerCase()) ||
          customer.email.toLowerCase().includes(search.toLowerCase()) ||
          customer.phone.includes(search) ||
          customer.customerCode.toLowerCase().includes(search.toLowerCase()),
      )
    }

    // Filter by status
    if (status) {
      customers = customers.filter((customer) => customer.status === status)
    }

    // Filter by customer type
    if (customerType) {
      customers = customers.filter((customer) => customer.customerType === customerType)
    }

    // Sort customers
    customers.sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]

      if (sortBy === "totalSpent" || sortBy === "totalOrders" || sortBy === "loyaltyPoints") {
        aValue = Number(aValue)
        bValue = Number(bValue)
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    // Pagination
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedCustomers = customers.slice(startIndex, endIndex)

    const stats = getCustomerStats()

    return NextResponse.json({
      customers: paginatedCustomers,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(customers.length / limit),
        totalItems: customers.length,
        itemsPerPage: limit,
      },
      stats,
    })
  } catch (error) {
    console.error("Error fetching customers:", error)
    return NextResponse.json({ error: "Failed to fetch customers" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const customerData = await request.json()
    const newCustomer = createCustomer(customerData)
    return NextResponse.json(newCustomer, { status: 201 })
  } catch (error) {
    console.error("Error creating customer:", error)
    return NextResponse.json({ error: "Failed to create customer" }, { status: 500 })
  }
}
