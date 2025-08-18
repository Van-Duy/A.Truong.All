import { NextResponse } from "next/server"
import { getCouponById, updateCoupon, deleteCoupon } from "@/lib/coupons-data"

export async function GET(request, { params }) {
  try {
    const coupon = getCouponById(params.id)

    if (!coupon) {
      return NextResponse.json({ error: "Coupon not found" }, { status: 404 })
    }

    return NextResponse.json(coupon)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch coupon" }, { status: 500 })
  }
}

export async function PUT(request, { params }) {
  try {
    const body = await request.json()
    const updatedCoupon = updateCoupon(params.id, body)

    if (!updatedCoupon) {
      return NextResponse.json({ error: "Coupon not found" }, { status: 404 })
    }

    return NextResponse.json(updatedCoupon)
  } catch (error) {
    return NextResponse.json({ error: "Failed to update coupon" }, { status: 500 })
  }
}

export async function DELETE(request, { params }) {
  try {
    const deletedCoupon = deleteCoupon(params.id)

    if (!deletedCoupon) {
      return NextResponse.json({ error: "Coupon not found" }, { status: 404 })
    }

    return NextResponse.json({ message: "Coupon deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete coupon" }, { status: 500 })
  }
}
