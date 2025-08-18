import { NextResponse } from "next/server"
import { getCategoryById, updateCategory, deleteCategory } from "../../../../lib/categories-data"

export async function GET(request, { params }) {
  const id = Number.parseInt(params.id)
  const category = getCategoryById(id)

  if (!category) {
    return NextResponse.json({ error: "Không tìm thấy danh mục" }, { status: 404 })
  }

  return NextResponse.json(category)
}

export async function PUT(request, { params }) {
  try {
    const id = Number.parseInt(params.id)
    const body = await request.json()

    const updatedCategory = updateCategory(id, body)

    if (!updatedCategory) {
      return NextResponse.json({ error: "Không tìm thấy danh mục" }, { status: 404 })
    }

    return NextResponse.json(updatedCategory)
  } catch (error) {
    console.error("PUT Error:", error)
    return NextResponse.json({ error: "Lỗi khi cập nhật danh mục" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const id = Number.parseInt(params.id)
    const result = deleteCategory(id)

    if (result === false) {
      return NextResponse.json({ error: "Không tìm thấy danh mục" }, { status: 404 })
    }

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    return NextResponse.json({ message: "Xóa danh mục thành công" })
  } catch (error) {
    console.error("DELETE Error:", error)
    return NextResponse.json({ error: "Lỗi khi xóa danh mục" }, { status: 500 })
  }
}
