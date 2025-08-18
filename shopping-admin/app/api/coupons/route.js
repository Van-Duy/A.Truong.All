import { NextResponse } from "next/server"
import { getCoupons, createCoupon } from "@/lib/coupons-data"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const search = searchParams.get("search")
    const status = searchParams.get("status")
    const type = searchParams.get("type")

    let coupons = getCoupons()

    // Filter by search
    if (search) {
      coupons = coupons.filter(
        (coupon) =>
          coupon.code.toLowerCase().includes(search.toLowerCase()) ||
          coupon.name.toLowerCase().includes(search.toLowerCase()) ||
          coupon.description.toLowerCase().includes(search.toLowerCase()),
      )
    }

    // Filter by status
    if (status && status !== "all") {
      coupons = coupons.filter((coupon) => coupon.status === status)
    }

    // Filter by type
    if (type && type !== "all") {
      coupons = coupons.filter((coupon) => coupon.type === type)
    }

    // Check and update expired coupons
    const now = new Date()
    coupons = coupons.map((coupon) => {
      const endDate = new Date(coupon.endDate)
      if (now > endDate && coupon.status === "active") {
        return { ...coupon, status: "expired" }
      }
      return coupon
    })

    return NextResponse.json(coupons)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch coupons" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.code || !body.name || !body.type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if coupon code already exists
    const existingCoupons = getCoupons()
    const codeExists = existingCoupons.some((coupon) => coupon.code.toLowerCase() === body.code.toLowerCase())

    if (codeExists) {
      return NextResponse.json({ error: "Mã coupon đã tồn tại" }, { status: 400 })
    }

    const newCoupon = createCoupon(body)
    return NextResponse.json(newCoupon, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create coupon" }, { status: 500 })
  }
}
