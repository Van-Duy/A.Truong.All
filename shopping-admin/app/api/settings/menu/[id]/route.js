import { NextResponse } from "next/server"
import { updateMenuItem, deleteMenuItem } from "../../../../../lib/settings-data"

export async function PUT(request, { params }) {
  try {
    const { id } = params
    const data = await request.json()

    const updatedItem = updateMenuItem(id, data)

    if (!updatedItem) {
      return NextResponse.json({ error: "Menu item not found" }, { status: 404 })
    }

    return NextResponse.json(updatedItem)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update menu item" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params
    const deleted = deleteMenuItem(id)

    if (!deleted) {
      return NextResponse.json({ error: "Menu item not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Menu item deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete menu item" }, { status: 500 })
  }
}
