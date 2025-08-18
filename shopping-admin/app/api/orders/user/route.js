import { NextResponse } from "next/server"
import { getOrders } from "@/lib/orders-data"

export async function GET() {
  try {
    // In real app, get user ID from session/token
    // For now, return all orders as mock data
    const orders = getOrders()

    return NextResponse.json(orders)
  } catch (error) {
    console.error("Error fetching user orders:", error)
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}
