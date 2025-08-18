import { NextResponse } from "next/server"
import { validateCouponCode } from "@/lib/coupons-data"

export async function POST(request) {
  try {
    const { code, orderAmount, customerId, isFirstOrder } = await request.json()

    if (!code) {
      return NextResponse.json({ error: "Mã coupon không được để trống" }, { status: 400 })
    }

    const validation = validateCouponCode(code)

    if (!validation.valid) {
      return NextResponse.json({ error: validation.message }, { status: 400 })
    }

    const coupon = validation.coupon

    // Check minimum order amount
    if (orderAmount < coupon.minOrderAmount) {
      return NextResponse.json(
        { error: `Đơn hàng tối thiểu ${coupon.minOrderAmount.toLocaleString("vi-VN")}đ` },
        { status: 400 },
      )
    }

    // Check first order only
    if (coupon.isFirstOrderOnly && !isFirstOrder) {
      return NextResponse.json({ error: "Mã coupon chỉ áp dụng cho đơn hàng đầu tiên" }, { status: 400 })
    }

    // Calculate discount amount
    let discountAmount = 0

    switch (coupon.type) {
      case "percentage":
        discountAmount = (orderAmount * coupon.value) / 100
        if (coupon.maxDiscountAmount > 0) {
          discountAmount = Math.min(discountAmount, coupon.maxDiscountAmount)
        }
        break
      case "fixed_amount":
        discountAmount = coupon.value
        break
      case "free_shipping":
        discountAmount = Math.min(30000, coupon.maxDiscountAmount) // Assume shipping cost
        break
    }

    return NextResponse.json({
      valid: true,
      coupon,
      discountAmount,
      finalAmount: orderAmount - discountAmount,
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to validate coupon" }, { status: 500 })
  }
}
