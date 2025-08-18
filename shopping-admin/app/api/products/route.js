import { NextResponse } from "next/server"
import { getProducts, createProduct } from "../../../lib/products-data"

export async function GET() {
  return NextResponse.json(getProducts())
}

export async function POST(request) {
  try {
    const body = await request.json()
    const newProduct = createProduct(body)
    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    console.error("POST Error:", error)
    return NextResponse.json({ error: "Lỗi khi tạo sản phẩm" }, { status: 500 })
  }
}
