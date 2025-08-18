import { NextResponse } from "next/server"
import { getSettingsByType, updateSettings } from "../../../../lib/settings-data"

export async function GET(request, { params }) {
  try {
    const { type } = params
    const settings = getSettingsByType(type)

    if (!settings) {
      return NextResponse.json({ error: "Settings type not found" }, { status: 404 })
    }

    return NextResponse.json(settings)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const { type } = params
    const data = await request.json()

    const updatedSettings = updateSettings(type, data)

    if (!updatedSettings) {
      return NextResponse.json({ error: "Settings type not found" }, { status: 404 })
    }

    return NextResponse.json(updatedSettings)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}
