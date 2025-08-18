import { NextResponse } from "next/server"
import { getOrderById, updateOrder, deleteOrder } from "../../../../lib/orders-data"

export async function GET(request, { params }) {
  const id = Number.parseInt(params.id)
  const order = getOrderById(id)

  if (!order) {
    return NextResponse.json({ error: "Không tìm thấy đơn hàng" }, { status: 404 })
  }

  return NextResponse.json(order)
}

export async function PUT(request, { params }) {
  try {
    const id = Number.parseInt(params.id)
    const body = await request.json()

    const updatedOrder = updateOrder(id, body)

    if (!updatedOrder) {
      return NextResponse.json({ error: "Không tìm thấy đơn hàng" }, { status: 404 })
    }

    return NextResponse.json(updatedOrder)
  } catch (error) {
    console.error("PUT Error:", error)
    return NextResponse.json({ error: "Lỗi khi cập nhật đơn hàng" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = Number.parseInt(params.id)
    const success = deleteOrder(id)

    if (!success) {
      return NextResponse.json({ error: "Không tìm thấy đơn hàng" }, { status: 404 })
    }

    return NextResponse.json({ message: "Xóa đơn hàng thành công" })
  } catch (error) {
    console.error("DELETE Error:", error)
    return NextResponse.json({ error: "Lỗi khi xóa đơn hàng" }, { status: 500 })
  }
}
