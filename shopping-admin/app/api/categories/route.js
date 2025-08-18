import { NextResponse } from "next/server"
import { getCategories, createCategory } from "../../../lib/categories-data"

export async function GET() {
  return NextResponse.json(getCategories())
}

export async function POST(request) {
  try {
    const body = await request.json()
    const newCategory = createCategory(body)
    return NextResponse.json(newCategory, { status: 201 })
  } catch (error) {
    console.error("POST Error:", error)
    return NextResponse.json({ error: "Lỗi khi tạo danh mục" }, { status: 500 })
  }
}
