import { NextResponse } from "next/server"
import { getOrders, createOrder } from "../../../lib/orders-data"

export async function GET() {
  return NextResponse.json(getOrders())
}

export async function POST(request) {
  try {
    const body = await request.json()
    const newOrder = createOrder(body)
    return NextResponse.json(newOrder, { status: 201 })
  } catch (error) {
    console.error("POST Error:", error)
    return NextResponse.json({ error: "Lỗi khi tạo đơn hàng" }, { status: 500 })
  }
}
