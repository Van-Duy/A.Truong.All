import { NextResponse } from "next/server"
import { addMenuItem } from "../../../../lib/settings-data"

export async function POST(request) {
  try {
    const data = await request.json()
    const newItem = addMenuItem(data)
    return NextResponse.json(newItem)
  } catch (error) {
    return NextResponse.json({ error: "Failed to add menu item" }, { status: 500 })
  }
}
