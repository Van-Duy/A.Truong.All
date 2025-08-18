import { NextResponse } from "next/server"
import { getAllSettings, updateSettings } from "../../../lib/settings-data"

export async function GET() {
  try {
    const settings = getAllSettings()
    return NextResponse.json(settings)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    const { type, data } = await request.json()

    if (!type || !data) {
      return NextResponse.json({ error: "Type and data are required" }, { status: 400 })
    }

    const updatedSettings = updateSettings(type, data)

    if (!updatedSettings) {
      return NextResponse.json({ error: "Settings type not found" }, { status: 404 })
    }

    return NextResponse.json(updatedSettings)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}
